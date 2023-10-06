export type ServerActionError = {
	success: false;
	name: string;
	message: string;
};

export type ServerActionSuccess = {
	success: true;
};

export type ServerActionResult = ServerActionError | ServerActionSuccess;
