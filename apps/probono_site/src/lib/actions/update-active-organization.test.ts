/**
 * @jest-environment node
 */

import {cookies} from 'next/headers';
import {getSession} from '@auth0/nextjs-auth0';
import {mocked} from 'jest-mock';
import updateActiveOrganization from '@/lib/actions/update-active-organization.ts';
import {prismaMock} from '@/lib/singleton.ts';
import {getUserFromSession} from '@/lib/models/user.ts';

jest.mock('@/lib/models/user.ts');
jest.mock('@auth0/nextjs-auth0');
jest.mock('next/headers');
jest.mock('next/cache');

const set = jest.fn();

/** Cypress tests for the updateActiveOrganization function. */
describe('updateActiveOrganization function', () => {
	beforeEach(() => {
		mocked(getSession).mockClear();
		prismaMock.organization.findUnique.mockClear();
		prismaMock.organization.findFirstOrThrow.mockClear();

		// @ts-expect-error not needed for test
		mocked(cookies).mockReturnValue({
			set,
		});
	});

	it('Returns null if getSession is null', async () => {
		mocked(getSession).mockResolvedValueOnce(null);

		const result = await updateActiveOrganization(23);

		expect(result).toBeNull();
	});

	it('Sets the organization id in the cookies if the organization is found', async () => {
		const mockOrganization = {id: 42};

		// @ts-expect-error not needed for test
		mocked(getUserFromSession).mockResolvedValueOnce({id: 32});
		prismaMock.organization.findUnique.mockResolvedValueOnce(
			// @ts-expect-error not needed for test
			mockOrganization,
		);

		await updateActiveOrganization(42);

		expect(getUserFromSession).toHaveBeenCalled();
		expect(prismaMock.organization.findUnique).toHaveBeenCalled();
		expect(cookies().set).toHaveBeenCalledWith('organizationId', '42');
	});

	it('Finds the first organization and sets id in cookies when provided organization was not found', async () => {
		const mockOrganization = {id: 5};

		// @ts-expect-error not needed for test
		mocked(getUserFromSession).mockResolvedValueOnce({id: 32});
		prismaMock.organization.findUnique.mockResolvedValueOnce(null);
		prismaMock.organization.findFirstOrThrow.mockResolvedValueOnce(
			// @ts-expect-error not needed for test
			mockOrganization,
		);

		await updateActiveOrganization(32);

		expect(getUserFromSession).toHaveBeenCalled();
		expect(prismaMock.organization.findUnique).toHaveBeenCalled();
		expect(prismaMock.organization.findFirstOrThrow).toHaveBeenCalled();
		expect(cookies().set).toHaveBeenCalledWith('organizationId', '5');
	});
});
