import { AddToCartUseCase } from '@application/use-cases/cart/add-to-cart.use-case'
import { RemoveFromCartUseCase } from '@application/use-cases/cart/remove-from-cart.use-case'
import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AddToCartDto, RemoveFromCartDto } from './cart.dto'

@Controller('cart')
@ApiTags('cart')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(AddToCartDto, RemoveFromCartDto)
export class CartController {
  constructor(
    private readonly _addToCartUseCase: AddToCartUseCase,
    private readonly _removeFromCartUseCase: RemoveFromCartUseCase,
    @InjectMapper()
    private readonly _mapper: Mapper
  ) {}

  @Post('')
  async addProductToCart(@Body() dto: AddToCartDto) {
    await this._addToCartUseCase.execute(dto)
  }

  @Post('remove-products')
  async removeProductsFromCart(@Body() dto: RemoveFromCartDto) {
    await this._removeFromCartUseCase.execute(dto)
  }
}
