import { ServicesModule } from '@infrastructure/di/services.module'
import { UseCasesModule } from '@infrastructure/di/use-cases.module'
import { Module } from '@nestjs/common'

import { AuthController } from './auth/auth.controller'
import { CartController } from './cart/cart.controller'
import { OrdersController } from './orders/orders.controller'
import { ProductsController } from './products/products.controller'
import { StatsController } from './stats/stats.controller'
import { UsersController } from './users/users.controller'

@Module({
  imports: [UseCasesModule, ServicesModule],
  controllers: [
    AuthController,
    UsersController,
    ProductsController,
    OrdersController,
    CartController,
    StatsController,
  ],
})
export class ControllersModule {}
