import { LoginUseCase } from '@application/use-cases/auth/login.use-case'
import { RefreshTokenUseCase } from '@application/use-cases/auth/refresh-token.use-case'
import { SignupUseCase } from '@application/use-cases/auth/signup.use-case'
import { AddToCartUseCase } from '@application/use-cases/cart/add-to-cart.use-case'
import { RemoveFromCartUseCase } from '@application/use-cases/cart/remove-from-cart.use-case'
import { CreateOrderUseCase } from '@application/use-cases/order/create-order.command'
import { GetOrdersByUserIdUseCase } from '@application/use-cases/order/get-orders-by-userid.query'
import { CreateProductUseCase } from '@application/use-cases/products/create-product.command'
import { GetProductsUseCase } from '@application/use-cases/products/get-products.query'
import { GetStatsUseCase } from '@application/use-cases/stats/get-stats.use-case'
import { GetUsersUseCase } from '@application/use-cases/users/get-users.query'
import { EnvironmentConfigModule } from '@infrastructure/config/env/config.module'
import { RepositoriesModule } from '@infrastructure/di/repositores.module'
import { ServicesModule } from '@infrastructure/di/services.module'
import { Module } from '@nestjs/common'
@Module({
  imports: [ServicesModule, RepositoriesModule, EnvironmentConfigModule],
  providers: [
    SignupUseCase,
    RefreshTokenUseCase,
    LoginUseCase,
    GetUsersUseCase,
    CreateProductUseCase,
    GetProductsUseCase,
    GetStatsUseCase,
    AddToCartUseCase,
    RemoveFromCartUseCase,
    GetOrdersByUserIdUseCase,
    CreateOrderUseCase,
  ],
  exports: [
    SignupUseCase,
    RefreshTokenUseCase,
    LoginUseCase,
    GetUsersUseCase,
    CreateProductUseCase,
    GetProductsUseCase,
    GetStatsUseCase,
    AddToCartUseCase,
    RemoveFromCartUseCase,
    GetOrdersByUserIdUseCase,
    CreateOrderUseCase,
  ],
})
export class UseCasesModule {}
