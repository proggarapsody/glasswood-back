import { AutoMap } from '@automapper/classes'
import { PrimaryKey, Property } from '@mikro-orm/core'

export class BaseEntity {
  @PrimaryKey({ autoincrement: true })
  @AutoMap()
  id: number

  @Property()
  @AutoMap()
  createdAt: Date = new Date()
}
