import { AutoMap } from '@automapper/classes'
import { OrderStatuses } from '@domain/common/enums/order-statuses.enum'
import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core'

import { BaseEntity } from './base-entity'
import { ProductEntity } from './product.entity'
import { UserEntity } from './user.entity'

@Entity({
  tableName: 'orders',
})
export class OrderEntity extends BaseEntity {
  @AutoMap()
  @ManyToOne(() => UserEntity, { nullable: false })
  userId: number

  @Property()
  @AutoMap()
  status: OrderStatuses

  @ManyToMany(() => ProductEntity, 'orders', { default: [], owner: true })
  @AutoMap()
  products? = new Collection<ProductEntity>(this)
}
