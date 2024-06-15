import nodemailer from 'nodemailer';

const port = Number.parseInt(process.env.EMAIL_PORT!, 10);

const transport = nodemailer.createTransport({
	host: process.env.EMAIL_SMTP_URL,
	port,
	secure: port === 465,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

type EmailContent = {
	subject: string;
} & (
	| {
			text: string;
	  }
	| {
			html: string;
	  }
);

export default async function email(
	to: string | string[],
	content: EmailContent,
) {
	await transport.sendMail({
		...content,
		to: typeof to === 'string' ? to : to.join(', '),
		from: `"GeoStats Pro Bono" <${process.env.EMAIL}>`,
	});
}
