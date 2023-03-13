import { IOrderRepository } from '@application/repositories/order-repo.interface'
import { IProductRepository } from '@application/repositories/product-repo.interface'
import { Order } from '@domain/entities/order.entity'
import { Injectable } from '@nestjs/common'

import { IUseCase } from '../use-case.interface'

interface CreateOrderCommand {
  userId: number
  productsIds: number[]
}

@Injectable()
export class CreateOrderUseCase implements IUseCase<CreateOrderCommand, Order> {
  constructor(
    private readonly _repository: IOrderRepository,
    private readonly _productRepository: IProductRepository
  ) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    const products = await Promise.all(
      command.productsIds.map(async (id) => {
        return await this._productRepository.findById(id)
      })
    )

    const order = new Order(command.userId, products)
    return await this._repository.create(order)
  }
}
