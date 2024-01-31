/**
 * @jest-environment node
 */
import {getSession} from '@auth0/nextjs-auth0';
import {mocked} from 'jest-mock';
import {management} from '@/lib/auth0.ts';
import {prismaMock} from '@/lib/singleton.ts';
import {createUser, getFirstSessionUserOrganization, updateUser, deleteUser} from '@/lib/models/user.ts';

jest.mock('@auth0/nextjs-auth0');
jest.mock('@/lib/auth0.ts');

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

describe('deleteUser', () => {
	test('should delete a user from the database and the auth service', async () => {
		const authId = 'test authId';
		const id = 1;

		// @ts-expect-error not required for test
		prismaMock.user.findUniqueOrThrow.mockResolvedValue({authId});

		await deleteUser(id);
		expect(management.users.delete).toHaveBeenCalledWith({id: authId});
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
