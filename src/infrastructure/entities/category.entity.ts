import { AutoMap } from '@automapper/classes'
import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core'

import { BaseEntity } from './base-entity'
import { ProductEntity } from './product.entity'

@Entity({
  tableName: 'categories',
})
export class CategoryEntity extends BaseEntity {
  @Property({ unique: true })
  @AutoMap()
  name: string
  @AutoMap()
  @ManyToMany(() => ProductEntity, undefined, {
    mappedBy: 'categories',
  })
  products? = new Collection<ProductEntity>(this)
}
