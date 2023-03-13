import { ICartRepository } from '@application/repositories/cart-repo.interface'
import { Injectable } from '@nestjs/common'

import { IUseCase } from '../use-case.interface'

interface RemoveFromCartCommand {
  cartId: number
  productIds: number[]
}

@Injectable()
export class RemoveFromCartUseCase implements IUseCase<RemoveFromCartCommand, void> {
  constructor(private readonly _repository: ICartRepository) {}

  async execute(command: RemoveFromCartCommand): Promise<void> {
    await this._repository.removeProductsFromCart(command.cartId, command.productIds)
  }
}
