// import logger from '../logger'

export class ApplicationError extends Error {
  public message: string = 'ApplicationError';

  public status: number = 500;

  constructor (message?: string, status?: number) {
    super()
    if (message != null) {
      this.message = message
    }
    if (status != null) {
      this.status = status
    }
    // logger.error(`npuser error: (${this.status}) ${this.message}`)
  }
}

export class BadRequest extends ApplicationError {
  constructor (message?: string) {
    super(message || 'Bad request', 400)
  }
}

export class InvalidRequest extends ApplicationError {
  constructor (message?: string) {
    super(message || 'Invalid request', 401)
  }
}

export class ExpiredRequest extends ApplicationError {
  constructor (message?: string) {
    super(message || 'Expired request', 403 /* forbidden, understood but will not accept */)
  }
}

export class InvalidClient extends ApplicationError {
  constructor (message?: string) {
    super(message || 'Invalid client', 404)
  }
}
