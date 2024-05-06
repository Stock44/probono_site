import z from 'zod';

export const organizationOwnerAdditionSchema = z
	.object({
		email: z
			.string({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				invalid_type_error: 'Ingresa un correo válido para agregar',
			})
			.email('Ingresa un correo válido'),
	})
	.brand('organizationOwnerAdditionSchema');

export type OrganizationOwnerAddition = z.infer<
	typeof organizationOwnerAdditionSchema
>;
