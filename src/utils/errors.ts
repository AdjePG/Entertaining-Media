export class FetchGetError extends Error {
  constructor (
    message : string,
  ) {
    super(message)
    this.name = typeof FetchGetError
  }
}

export class FetchCountError extends Error {
  constructor (
    message : string
  ) {
    super(message)
    this.name = typeof FetchCountError
  }
}