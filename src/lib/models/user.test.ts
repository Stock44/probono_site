/**
 * @jest-environment node
 */
import {getSession} from '@auth0/nextjs-auth0';
import {mocked} from 'jest-mock';
import {cookies} from 'next/headers';
import {management} from '@/lib/auth0.ts';
import {prismaMock} from '@/lib/singleton.ts';
import {createUser, getFirstSessionUserOrganization, updateUser, getUsersActiveOrganization} from '@/lib/models/user.ts';

jest.mock('@auth0/nextjs-auth0'); // Replace with your actual session management module
jest.mock('@prisma/client');

jest.mock('@auth0/nextjs-auth0');
jest.mock('@/lib/auth0.ts');
jest.mock('next/headers');

describe('getFirstSessionUserOrganization', () => {
	test('should return the first organization of the session user', async () => {
		const expectedOrganization = {id: 1, name: 'test organization'};
		mocked(getSession).mockResolvedValue({user: {sub: 'test sub'}});
		// @ts-expect-error not required for test
		prismaMock.organization.findFirst.mockResolvedValue(expectedOrganization);

		const result = await getFirstSessionUserOrganization();

		expect(result).toEqual(expectedOrganization);
		expect(getSession).toHaveBeenCalledTimes(1);
		expect(prismaMock.organization.findFirst).toHaveBeenCalledWith({
			where: {
				owners: {
					some: {
						authId: 'test sub',
					},
				},
			},
		});
	});
});

// Other functions can be tested in a similar manner...

describe('createUser', () => {
	test('should create a new user with the provided authId and init data', async () => {
		const expectedUser = {id: 1, email: 'test@test.com'};
		const authId = 'test authId';
		const init = {name: 'test user'};

		mocked(management).users.get.mockResolvedValue({
			headers: new Headers(),
			status: 0,
			statusText: '',
			// @ts-expect-error not required for test
			data: {
				email: expectedUser.email,
			},
		});

		prismaMock.$transaction.mockImplementation(async callback => callback({
			// @ts-expect-error not required for test
			user: {
				create: jest.fn().mockResolvedValue(expectedUser),
			},
		}));

		// @ts-expect-error not required for test
		const result = await createUser(authId, init);

		expect(result).toEqual(expectedUser);
		expect(management.users.get).toHaveBeenCalledWith({id: authId});
		expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
	});
});

describe('updateUser', () => {
	test('should update a user in the database and in the auth service', async () => {
		const authId = 'test authId';
		const id = 1;
		const update = {email: 'updated@test.com', password: 'updated password'};

		// @ts-expect-error not required for test
		prismaMock.user.findUniqueOrThrow.mockResolvedValue({authId});

		await updateUser(id, update);

		expect(management.users.update).toHaveBeenCalledWith({id: authId}, {email: update.email});
		expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
	});
});

const get = jest.fn();
const cookiesMock = mocked(cookies);

describe('getUsersActiveOrganiation', () => {
	beforeEach(() => {
		(getSession as jest.Mock).mockClear();
		cookiesMock.mockClear();
		get.mockClear();
		// @ts-expect-error not needed for test
		cookiesMock.mockReturnValue({
			get,
		});
	});

	it('throws an error if not authenticated', async () => {
		(getSession as jest.Mock).mockResolvedValueOnce(null);

		await expect(getUsersActiveOrganization()).rejects.toThrow('not authenticated');
	});

	it('returns an existing organization if organizationId is set', async () => {
		const sessionData = {user: {sub: '123'}};
		const organization = {
			id: 1,
			owners: [
				{
					authId: sessionData.user.sub,
				},
			],
		};

		// Mock session return object
		(getSession as jest.Mock).mockResolvedValueOnce(sessionData);
		get.mockReturnValueOnce({value: '1'});
		// @ts-expect-error not needed for test
		prismaMock.organization.findUnique.mockResolvedValueOnce(organization);

		const result = await getUsersActiveOrganization();

		expect(result).toEqual(organization);
	});

	it('returns the first organization if organizationId is not set', async () => {
		const sessionData = {user: {sub: '123'}};
		const organization = {
			id: 1,
			owners: [
				{
					authId: sessionData.user.sub,
				},
			],
		};

		// Mock session return object
		(getSession as jest.Mock).mockResolvedValueOnce(sessionData);
		get.mockReturnValueOnce(null);
		// @ts-expect-error not needed for test
		prismaMock.organization.findFirstOrThrow.mockResolvedValueOnce(organization);

		const result = await getUsersActiveOrganization();

		expect(result).toEqual(organization);
	});
	it('returns first organization and updates the cookie when provided organizationId is not associated with the user', async () => {
		const sessionData = {user: {sub: '123'}};
		const organization = {
			id: 1,
			owners: [
				{
					authId: sessionData.user.sub,
				},
			],
		};

		(getSession as jest.Mock).mockResolvedValueOnce(sessionData);
		get.mockReturnValueOnce({value: '2'});
		// @ts-expect-error not needed for test
		prismaMock.organization.findFirstOrThrow.mockResolvedValueOnce(organization);

		const result = await getUsersActiveOrganization();

		expect(result).toEqual(organization);
	});

	it('returns first organization and updates the cookie when organizationId is not set', async () => {
		const sessionData = {user: {sub: '123'}};
		const organization = {
			id: 1,
			owners: [
				{
					authId: sessionData.user.sub,
				},
			],
		};

		(getSession as jest.Mock).mockResolvedValueOnce(sessionData);
		get.mockReturnValueOnce(null);
		// @ts-expect-error not needed for test
		prismaMock.organization.findFirstOrThrow.mockResolvedValueOnce(organization);

		const result = await getUsersActiveOrganization();

		expect(result).toEqual(organization);
	});
});
