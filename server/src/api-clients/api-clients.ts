import { BadRequest } from '../errors/application-error'
/*
Provide a rudimentary user account system.  This is definitely a work in progress but sufficient to allow other development.
 */

export interface ClientInfo {
  clientId: string;
  clientSecret: string;
}
interface ClientDetails {
  clientId: string;
  clientSecret: string;
}
type ClientMapType = Record<string, ClientDetails>;

let baseClients:ClientMapType = {}

/**
 *  Resets the file local base client list based on the contents of the environment var NPUSER_BASE_CLIENTS.
 *
 * This will throw errors if any problem is encountered. The goal is to stop the loading of the application
 * until such errors are resolved.
 *
 * @param baseDefn e.g. 'client1=secret1,client2=secret2 , client3 = secret3'
 */
export function loadClientInfo () {
  const baseDefn = process.env.NPUSER_BASE_CLIENTS
  const ERR = 'NPUser Client Initialization. Must provide base client ids as comma separated list of key value pairs containing client ids and secrets'
  baseClients = {}
  if (!baseDefn) {
    throw new Error(ERR)
  }
  // reset baseClients
  baseDefn.split(',').forEach((kv) => {
    const kvp: string[] = kv.split('=')
    if (kvp.length !== 2) {
      throw new Error(ERR)
    }
    const id = kvp[0].trim()
    const se = kvp[1].trim()
    if (id.length === 0 || se.length === 0) {
      throw new Error(ERR)
    }
    const details: ClientDetails = {
      clientId: id,
      clientSecret: se
    }
    baseClients[details.clientId] = details
  })
}

/**
 * Returns Promise with client information
 * Rejects a BadRequest error if client id is not found
 * @param clientId
 */
export async function getClientInfo (clientId: string): Promise<ClientInfo> {
  return new Promise((resolve, reject) => {
    const record = baseClients[clientId]
    if (record) {
      const results: ClientInfo = {
        clientId: record.clientId,
        clientSecret: record.clientSecret
      }
      return resolve(results)
    }
    return reject(new BadRequest('Unknown npuser API client id.'))
  })
}
