import { ICartRepository } from '@application/repositories/cart-repo.interface'
import { Injectable } from '@nestjs/common'

import { IUseCase } from '../use-case.interface'

interface AddToCartCommand {
  cartId: number
  productId: number
}

@Injectable()
export class AddToCartUseCase implements IUseCase<AddToCartCommand, void> {
  constructor(private readonly _repository: ICartRepository) {}

  async execute(command: AddToCartCommand): Promise<void> {
    await this._repository.addProductToCart(command.cartId, command.productId)
  }
}
