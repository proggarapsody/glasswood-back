import { constructUsing, Mapper } from '@automapper/core'
import { MappingProfile } from '@automapper/core'
import { createMap } from '@automapper/core'
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { Cart } from '@domain/entities/cart.entity'
import { Order } from '@domain/entities/order.entity'
import { Product } from '@domain/entities/product.entity'
import { Stats } from '@domain/entities/stats.entity'
import { User } from '@domain/entities/user.entity'
import { CartEntity } from '@infrastructure/entities/cart.entity'
import { OrderEntity } from '@infrastructure/entities/order.entity'
import { ProductEntity } from '@infrastructure/entities/product.entity'
import { UserEntity } from '@infrastructure/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { OrderPresenter } from '@presentation/controllers/orders/order.presenter'
import { ProductPresenter } from '@presentation/controllers/products/products.presenter'
import { StatsPresenter } from '@presentation/controllers/stats/stats.presenter'
import { UserPresenter } from '@presentation/controllers/users/user.presenter'

@Injectable()
export class MapperService extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper)
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, User, UserEntity)
      createMap(
        mapper,
        UserEntity,
        User,
        constructUsing((source) => {
          return new User(source.email, source.password, source.role)
        })
      )
      createMap(
        mapper,
        User,
        UserPresenter,
        constructUsing((source) => {
          return new UserPresenter(source)
        })
      )
      createMap(mapper, Cart, CartEntity)
      createMap(mapper, CartEntity, Cart)
      createMap(mapper, Product, ProductEntity)
      createMap(
        mapper,
        ProductEntity,
        Product,
        constructUsing((source) => {
          return new Product({
            description: source.description,
            name: source.name,
            price: source.price,
            categories: source.categories.getItems(false),
            images: source.images,
          })
        })
      )
      createMap(
        mapper,
        Product,
        ProductPresenter,
        constructUsing((source) => {
          return new Product({
            description: source.description,
            name: source.name,
            price: source.price,
            categories: source.categories,
            images: source.images,
          })
        })
      )
      createMap(
        mapper,
        OrderEntity,
        Order,
        constructUsing((source) => {
          return new Order(
            source.userId,
            this.mapper.mapArray(source.products.getItems(false), ProductEntity, Product)
          )
        })
      )
      createMap(
        mapper,
        Order,
        OrderPresenter,
        constructUsing((source) => {
          return new OrderPresenter(source)
        })
      )
      createMap(
        mapper,
        Stats,
        StatsPresenter,
        constructUsing((source) => {
          return new StatsPresenter(source)
        })
      )
    }
  }
}
