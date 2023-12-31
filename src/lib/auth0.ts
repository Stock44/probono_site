import {ManagementClient, AuthenticationClient} from 'auth0';

export const authentication = new AuthenticationClient({
	domain: process.env.AUTH0_DOMAIN!,
	clientId: process.env.AUTH0_CLIENT_ID!,
	clientSecret: process.env.AUTH0_CLIENT_SECRET!,
});

export const management = new ManagementClient({
	domain: process.env.AUTH0_DOMAIN!,
	clientId: process.env.AUTH0_CLIENT_ID!,
	clientSecret: process.env.AUTH0_CLIENT_SECRET!,
	async fetch(url, init) {
		return fetch(url, {
			...init,
			cache: 'no-cache',
		});
	},
});
