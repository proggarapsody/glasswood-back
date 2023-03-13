import { AutoMap } from '@automapper/classes'
import { RolesEnum } from '@domain/common/enums/roles.enum'
import { UserStatuses } from '@domain/common/enums/user-statuses.enum'
import { Entity, OneToMany, OneToOne, Property } from '@mikro-orm/core'

import { BaseEntity } from './base-entity'
import { CartEntity } from './cart.entity'
import { OrderEntity } from './order.entity'

@Entity({
  tableName: 'users',
})
export class UserEntity extends BaseEntity {
  @Property({ unique: true })
  @AutoMap()
  email: string

  @Property()
  @AutoMap()
  password: string

  @Property({
    nullable: true,
  })
  @AutoMap()
  name?: string | undefined

  @Property()
  @AutoMap()
  role: RolesEnum

  @Property()
  @AutoMap()
  status: UserStatuses

  @OneToOne(() => CartEntity, (cart) => cart.user, { nullable: true })
  @AutoMap()
  cart?: CartEntity

  @OneToMany(() => OrderEntity, (order) => order.userId, {
    default: [],
  })
  @AutoMap()
  orders?: OrderEntity[]
}
