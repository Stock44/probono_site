/**
 * @jest-environment node
 */

import {getSession} from '@auth0/nextjs-auth0';
import {prismaMock} from '@/lib/singleton.ts';
import {getUserFromSession} from '@/lib/models/user.ts';
import {requestUserReauthentication, consumeUserReauthentication, ReauthenticationExpiredError, NoReauthenticationRequestedError} from '@/lib/models/user-reauthentication.ts';

jest.mock('@auth0/nextjs-auth0');
jest.mock('@/lib/models/user.ts');

afterEach(() => {
	jest.resetAllMocks();
});

test('requests reauthentication for authenticated user', async () => {
	(getSession as jest.Mock).mockResolvedValue('session');
	(getUserFromSession as jest.Mock).mockResolvedValue({id: 1});

	await expect(requestUserReauthentication()).resolves.toBeUndefined();

	expect(getSession).toHaveBeenCalledTimes(1);
	expect(getUserFromSession).toHaveBeenCalledTimes(1);
	expect(prismaMock.userReauthentication.create).toHaveBeenCalledWith({
		data: {
			userId: 1,
			consumed: false,
			time: expect.any(Date),
		},
	});
});

test('throws error when requesting reauthentication for unauthenticated user', async () => {
	(getSession as jest.Mock).mockResolvedValue(undefined);

	await expect(requestUserReauthentication()).rejects.toThrow('Not authenticated');
});

test('throws error when unable to find user for current session', async () => {
	(getSession as jest.Mock).mockResolvedValue('session');
	(getUserFromSession as jest.Mock).mockResolvedValue(undefined);

	await expect(requestUserReauthentication()).rejects.toThrow('Could not find user information for current session');
});

test('consumes reauthentication request for authenticated user', async () => {
	const testDate = new Date();
	const testDate2 = new Date();
	testDate2.setSeconds(testDate2.getSeconds() + 5);
	(getSession as jest.Mock).mockResolvedValue({user: {auth_time: Math.floor(testDate2.getTime() / 1000)}});
	(getUserFromSession as jest.Mock).mockResolvedValue({id: 1});
	(prismaMock.userReauthentication.findFirst as jest.Mock).mockResolvedValue({id: 2, userId: 1, time: testDate});

	await expect(consumeUserReauthentication()).resolves.toBeUndefined();

	expect(getSession).toHaveBeenCalledTimes(1);
	expect(getUserFromSession).toHaveBeenCalledTimes(1);
	expect(prismaMock.userReauthentication.findFirst).toHaveBeenCalledWith({
		where: {
			userId: 1,
			consumed: false,
		},
		orderBy: {
			time: 'desc',
		},
	});
	expect(prismaMock.userReauthentication.update).toHaveBeenCalledWith({
		where: {
			id: 2,
		},
		data: {
			consumed: true,
		},
	});
});

test('throws error when consuming reauthentication for unauthenticated user', async () => {
	(getSession as jest.Mock).mockResolvedValue(undefined);

	await expect(consumeUserReauthentication()).rejects.toThrow('Not authenticated');
});

test('throws error when unable to find user for current session', async () => {
	(getSession as jest.Mock).mockResolvedValue('session');
	(getUserFromSession as jest.Mock).mockResolvedValue(undefined);

	await expect(consumeUserReauthentication()).rejects.toThrow('Could not find user information for current session');
});

test('throws error when there is no pending reauthentication request', async () => {
	(getSession as jest.Mock).mockResolvedValue({user: {auth_time: Date.now() / 1000}});
	(getUserFromSession as jest.Mock).mockResolvedValue({id: 1});
	prismaMock.userReauthentication.findFirst.mockResolvedValue(null);

	await expect(consumeUserReauthentication()).rejects.toThrow(NoReauthenticationRequestedError);
});

test('throws error when the reauthentication request is expired', async () => {
	const oldDate = new Date();
	oldDate.setMinutes(oldDate.getMinutes() - 5); // 5 minutes in the past

	(getSession as jest.Mock).mockResolvedValue({user: {auth_time: Date.now() / 1000}});
	(getUserFromSession as jest.Mock).mockResolvedValue({id: 1});
	prismaMock.userReauthentication.findFirst.mockResolvedValue({id: 2, userId: 1, time: oldDate, consumed: false});

	await expect(consumeUserReauthentication()).rejects.toThrow(ReauthenticationExpiredError);
});
