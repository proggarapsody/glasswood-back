import { AutoMap } from '@automapper/classes'
import { CartEntity } from '@infrastructure/entities/cart.entity'
import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core'

import { BaseEntity } from './base-entity'
import { CategoryEntity } from './category.entity'
import { OrderEntity } from './order.entity'

@Entity({
  tableName: 'products',
})
export class ProductEntity extends BaseEntity {
  @PrimaryKey({ autoincrement: true })
  @AutoMap()
  id: number

  @Property({ unique: true })
  @AutoMap()
  name: string

  @Property()
  @AutoMap()
  price: number

  @Property()
  @AutoMap()
  description: string

  @Property()
  @AutoMap()
  images?: string[]

  @AutoMap()
  @ManyToMany(() => CategoryEntity, undefined, {
    owner: true,
  })
  categories? = new Collection<CategoryEntity>(this)

  @ManyToMany(() => CartEntity, 'products')
  @AutoMap()
  carts? = new Collection<CartEntity>(this)

  @ManyToMany(() => OrderEntity, 'products', { default: [] })
  @AutoMap()
  orders? = new Collection<OrderEntity>(this)
}
