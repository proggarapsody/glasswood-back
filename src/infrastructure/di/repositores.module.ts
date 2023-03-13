import { ICartRepository } from '@application/repositories/cart-repo.interface'
import { IOrderRepository } from '@application/repositories/order-repo.interface'
import { IProductRepository } from '@application/repositories/product-repo.interface'
import { IStatsRepository } from '@application/repositories/stats-repo.interface'
import { IUserRepository } from '@application/repositories/user-repo.interface'
import { MikroORMConfigModule } from '@infrastructure/config/mikroorm/mikroorm.module'
import { ServicesModule } from '@infrastructure/di/services.module'
import { CartEntity } from '@infrastructure/entities/cart.entity'
import { CategoryEntity } from '@infrastructure/entities/category.entity'
import { OrderEntity } from '@infrastructure/entities/order.entity'
import { ProductEntity } from '@infrastructure/entities/product.entity'
import { UserEntity } from '@infrastructure/entities/user.entity'
import { OrderRepository } from '@infrastructure/persistence/repositories/order.repository'
import { StatsRepository } from '@infrastructure/persistence/repositories/stats.repository'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { CartRepository } from '../persistence/repositories/cart.repository'
import { ProductRepository } from '../persistence/repositories/product.repository'
import { UserRepository } from '../persistence/repositories/user.repository'

@Module({
  imports: [
    MikroORMConfigModule,
    ServicesModule,
    MikroOrmModule.forFeature([
      ProductEntity,
      UserEntity,
      CartEntity,
      CategoryEntity,
      OrderEntity,
    ]),
  ],
  providers: [
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: ICartRepository,
      useClass: CartRepository,
    },
    {
      provide: IOrderRepository,
      useClass: OrderRepository,
    },
    {
      provide: IStatsRepository,
      useClass: StatsRepository,
    },
  ],
  exports: [
    IProductRepository,
    IUserRepository,
    ICartRepository,
    IStatsRepository,
    IOrderRepository,
  ],
})
export class RepositoriesModule {}
