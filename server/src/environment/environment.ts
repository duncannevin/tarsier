import {v4 as uuid} from 'uuid'
import {AllowedClients} from './interface/allowed-clients.interface'

export class Environment {
  id: string
  clientId: string
  imageId: string
  allowedClients: AllowedClients = {}

  constructor(clientId: string) {
    this.clientId = clientId

    this.addAllowedClient(clientId)
    this.generateId()
  }

  addAllowedClient(clientId: string) {
    this.allowedClients[clientId] = true
  }

  createImage() {
  }

  private generateId() {
    this.id = uuid()
  }
}
