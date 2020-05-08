export class User {
  id: string
  username: string
  firstName: string
  lastName: string
  jwt?: string

  constructor({id, username, firstName, lastName}) {
    this.id = id
    this.username = username
    this.firstName = firstName
    this.lastName = lastName
  }
}
