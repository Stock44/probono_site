import z from 'zod';

export const passwordUpdateSchema = z.object({
	currentPassword: z.string(),
	password: z.string(),
});

export type PasswordUpdate = z.infer<typeof passwordUpdateSchema>;
