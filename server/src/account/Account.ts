export interface IAccount {
  name: string;
  apiKey: string;
}

class Account implements IAccount {
  static find (query?: string) {
    throw new Error('Method not implemented.')
  }

  toJSON () {
    throw new Error('Method not implemented.')
  }

  save () {
    throw new Error('Method not implemented.')
  }

  apiKey: string;

  name: string;

  constructor (name: string, apiKey: string) {
    this.name = name
    this.apiKey = apiKey
  }
}

export default Account
