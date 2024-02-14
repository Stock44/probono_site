/**
 * @jest-environment node
 */
import {getSession} from '@auth0/nextjs-auth0';
import {mocked} from 'jest-mock';
import {cookies} from 'next/headers';
import {type User} from '@prisma/client';
import {NextResponse, NextRequest} from 'next/server';
import {management} from '@/lib/auth0.ts';
import {prismaMock} from '@/lib/singleton.ts';
import {
	createUser,
	getFirstSessionUserOrganization,
	updateUser,
	getUsersActiveOrganization,
	deleteUser, getUserFromSession, getCurrentUserOrganizations,
} from '@/lib/models/user.ts';
import {deleteOrganizations, getUsersDependantOrganizations} from '@/lib/models/organization.ts';
import prisma from '@/lib/prisma.ts';

jest.mock('@auth0/nextjs-auth0'); // Replace with your actual session management module
jest.mock('@prisma/client');

jest.mock('@auth0/nextjs-auth0');
jest.mock('@/lib/auth0.ts');
jest.mock('next/headers');

jest.mock('@/lib/models/organization.ts');

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

describe('deleteUser function', () => {
	let userId: number;

	beforeEach(() => {
		userId = 1;

		// Set up default mock implementations
		// @ts-expect-error not needed for test
		prismaMock.user.findUniqueOrThrow.mockResolvedValue({authId: 'authId'});
		mocked(getUsersDependantOrganizations).mockResolvedValue([]);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('deletes a user and all related data', async () => {
		await deleteUser(userId);

		expect(prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
			where: {
				id: userId,
			},
			select: {
				authId: true,
			},
		});
		expect(management.users.delete).toHaveBeenCalledWith({
			id: 'authId',
		});
		expect(getUsersDependantOrganizations).toHaveBeenCalledWith(userId);
		expect(deleteOrganizations).not.toHaveBeenCalled();
		expect(prisma.userReauthentication.deleteMany).toHaveBeenCalledWith({
			where: {
				userId,
			},
		});
		expect(prisma.user.delete).toHaveBeenCalledWith({
			where: {
				id: userId,
			},
		});
		expect(prisma.$transaction).toHaveBeenCalled();
	});

	it('deletes user and organizations when user is the only owner', async () => {
		// @ts-expect-error not needed for test
		mocked(getUsersDependantOrganizations).mockResolvedValue([{id: 2, _count: {owners: 1}}, {id: 3, _count: {owners: 1}}]);

		await deleteUser(userId);

		expect(prisma.user.findUniqueOrThrow).toHaveBeenCalled();
		expect(management.users.delete).toHaveBeenCalled();
		expect(getUsersDependantOrganizations).toHaveBeenCalledWith(userId);
		expect(deleteOrganizations).toHaveBeenCalledWith([2, 3]);
		expect(prisma.userReauthentication.deleteMany).toHaveBeenCalled();
		expect(prisma.user.delete).toHaveBeenCalled();
		expect(prisma.$transaction).toHaveBeenCalled();
	});

	it('does not delete organizations when user is not the only owner', async () => {
		// @ts-expect-error not needed for test
		mocked(getUsersDependantOrganizations).mockResolvedValue([{id: 2, _count: {owners: 2}}, {id: 3, _count: {owners: 1}}]);

		await deleteUser(userId);

		expect(prismaMock.user.findUniqueOrThrow).toHaveBeenCalled();
		expect(management.users.delete).toHaveBeenCalled();
		expect(getUsersDependantOrganizations).toHaveBeenCalledWith(userId);
		expect(deleteOrganizations).toHaveBeenCalledWith([3]);
		expect(prismaMock.userReauthentication.deleteMany).toHaveBeenCalled();
		expect(prismaMock.user.delete).toHaveBeenCalled();
		expect(prismaMock.$transaction).toHaveBeenCalled();
	});

	// More tests here, for example, to handle errors if the APIs throw any...
});

describe('getUserFromSession', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('returns null when no session exists', async () => {
		mocked(getSession).mockResolvedValueOnce(null);

		expect(await getUserFromSession()).toBeNull();
	});

	test('returns user when session exists', async () => {
		const sessionData = {
			user: {
				sub: 'auth0|userId123456',
			},
		};
		const userData = {
			id: 2,
			authId: 'auth0|userId123456',
			_count: {
				organizations: 5,
			},
		};
		mocked(getSession).mockResolvedValueOnce(sessionData);
		// @ts-expect-error not needed for test
		prismaMock.user.findUnique.mockResolvedValueOnce(userData);

		expect(await getUserFromSession()).toBe(userData);
		expect(getSession).toHaveBeenCalledWith();
		expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
			where: {authId: sessionData.user.sub},
			include: {
				_count: {
					select: {
						organizations: true,
					},
				},
			},
		});
	});

	test('returns user when passing NextRequest and NextResponse', async () => {
		const sessionData = {
			user: {
				sub: 'auth0|userId123456',
			},
		};
		const userData = {
			id: 921,
			authId: 'auth0|userId123456',
			_count: {
				organizations: 5,
			},
		};
		const request = new NextRequest(new URL('http://localhost'));
		const response = new NextResponse();
		mocked(getSession).mockResolvedValueOnce(sessionData);
		// @ts-expect-error not needed for test
		prismaMock.user.findUnique.mockResolvedValueOnce(userData);

		expect(await getUserFromSession(request, response)).toBe(userData);
		expect(getSession).toHaveBeenCalledWith(request, response);
		expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
			where: {authId: sessionData.user.sub},
			include: {
				_count: {
					select: {
						organizations: true,
					},
				},
			},
		});
	});
});

describe('getCurrentUserOrganizations', () => {
	// Reset all mocks before each test
	beforeEach(() => {
		jest.restoreAllMocks();
	});

	it('returns null if there is no session', async () => {
		mocked(getSession).mockResolvedValue(null);
		const result = await getCurrentUserOrganizations();
		expect(result).toBeNull();
	});

	it('throws error if user does not exist', async () => {
		(getSession as jest.Mock).mockResolvedValue({user: {sub: 'user1'}});
		prismaMock.user.findUniqueOrThrow.mockImplementation(() => {
			throw new Error('User not found');
		});
		await expect(getCurrentUserOrganizations()).rejects.toThrow('User not found');
	});

	it('returns organizations if the session and user exist', async () => {
		(getSession as jest.Mock).mockResolvedValue({user: {sub: 'user1'}});
		// @ts-expect-error correct typings not needed for test
		prismaMock.user.findUniqueOrThrow.mockReturnValue({
			organizations: jest.fn().mockResolvedValueOnce([
				{id: 'org1', name: 'Org 1', logoUrl: 'http://example.com/logo1.png'},
				{id: 'org2', name: 'Org 2', logoUrl: 'http://example.com/logo2.png'},
			]),
		});
		const orgs = await getCurrentUserOrganizations();
		expect(orgs).toEqual([
			{id: 'org1', name: 'Org 1', logoUrl: 'http://example.com/logo1.png'},
			{id: 'org2', name: 'Org 2', logoUrl: 'http://example.com/logo2.png'},
		]);
	});
});
