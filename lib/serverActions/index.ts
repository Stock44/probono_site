export interface ServerActionSuccess {
  success: true;
}

export interface ServerActionError {
  success: false;
  message: string;
}

export type ServerActionResult = ServerActionSuccess | ServerActionError;
