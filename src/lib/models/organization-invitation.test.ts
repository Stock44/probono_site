/**
 * @jest-environment node
 */
import {prismaMock} from '@/lib/singleton.ts';
import {
	consumeOrganizationInvitation,
	createOrganizationInvitation,
	getOrganizationInvitation,
	isInvitationValid,
} from '@/lib/models/organization-invitation.ts';

jest.mock('@/lib/prisma.ts');

describe('OrganizationInvitation', () => {
	test('getOrganizationInvitation', async () => {
		await getOrganizationInvitation('__mockedInvitationId__');
		expect(prismaMock.organizationInvitation.findUnique).toBeCalled();
	});

	test('isInvitationValid (false case)', async () => {
		prismaMock.organizationInvitation.findUnique.mockResolvedValue(null);
		const result = await isInvitationValid('__mockedInvitationId__');
		expect(result).toBe(false);
	});

	test('isInvitationValid (true case)', async () => {
		// @ts-expect-error not needed for test
		prismaMock.organizationInvitation.findUnique.mockResolvedValue({
			timestamp: new Date(Date.now() - (1 * 60 * 60 * 1000)),
		});
		const result = await isInvitationValid('__mockedInvitationId__');
		expect(result).toBe(true);
	});

	test('createOrganizationInvitation', async () => {
		await createOrganizationInvitation(
			'__mockedRecipient__',
			2,
			4,
		);
		expect(prismaMock.organizationInvitation.create).toBeCalled();
	});

	test('consumeOrganizationInvitation (error case)', async () => {
		prismaMock.organizationInvitation.findUnique.mockResolvedValue(null);
		await expect(
			consumeOrganizationInvitation('__mockedInvitationId__', 2),
		).rejects.toThrow('Invitation not found');
	});
});
