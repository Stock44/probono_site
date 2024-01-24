import {type Beneficiary} from '@prisma/client';
import {getAllBeneficiaries} from '@/lib/models/beneficiary.ts';
import {prismaMock} from '@/lib/singleton.ts';

test('getAllBeneficiaries should return beneficiaries', async () => {
	const beneficiaries: Beneficiary[] = [
		{
			id: 2,
			name: 'Lorem',
		},
		{
			id: 5,
			name: 'Ipsum',
		},
		{
			id: 6,
			name: 'Dolor',
		},
	];

	prismaMock.beneficiary.findMany.mockResolvedValue(beneficiaries);

	await expect(getAllBeneficiaries()).resolves.toEqual(beneficiaries);
});
