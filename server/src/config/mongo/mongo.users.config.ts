export class MongoUsersConfig {
  NAME: string
  DATABASE: string
  ENTITIES: string[]

  constructor({name, database, entities}) {
    this.NAME = name
    this.DATABASE = database
    this.ENTITIES = entities
  }
}
