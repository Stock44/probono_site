export interface ServerActionError {
  success: false;
  name: string;
  message: string;
}

export interface ServerActionSuccess {
  success: true;
}

export type ServerActionResult = ServerActionError | ServerActionSuccess;
