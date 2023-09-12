export class CreationError extends Error {
  constructor() {
    super();
    this.message = "could not create record";
  }
}

export class NotFoundError extends Error {
  constructor() {
    super();
    this.message = "could not find record";
  }
}
