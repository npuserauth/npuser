import fs from 'fs'
import { IConfig } from './config/config'
import logger from './logger'

export interface IFileDb {

    close(param: (err: any) => void): Promise<void>;
}
class FileDb implements IFileDb {
  close(param: (err: any) => void): Promise<void> {
    return Promise.resolve(undefined)
  }
}
export const db = function (config: IConfig) {
  return new Promise((resolve, reject) => {
    const conn: IFileDb = new FileDb()
    logger.info('Created a local file db object')
    return resolve(conn)
  })
}
