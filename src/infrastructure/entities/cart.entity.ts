import { AutoMap } from '@automapper/classes'
import { Collection, Entity, ManyToMany, OneToOne } from '@mikro-orm/core'

import { BaseEntity } from './base-entity'
import { ProductEntity } from './product.entity'
import { UserEntity } from './user.entity'

@Entity({
  tableName: 'carts',
})
export class CartEntity extends BaseEntity {
  @OneToOne(() => UserEntity, { nullable: false })
  @AutoMap()
  user: UserEntity

  @ManyToMany(() => ProductEntity, 'carts', { owner: true, default: [] })
  @AutoMap()
  products? = new Collection<ProductEntity>(this)
}
