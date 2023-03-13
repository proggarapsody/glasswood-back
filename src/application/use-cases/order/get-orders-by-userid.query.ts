import { IOrderRepository } from '@application/repositories/order-repo.interface'
import { Order } from '@domain/entities/order.entity'
import { Injectable } from '@nestjs/common'

interface GetOrdersByUserIdQuery {
  userId: number
}

@Injectable()
export class GetOrdersByUserIdUseCase {
  constructor(private readonly _repository: IOrderRepository) {}

  async execute(command: GetOrdersByUserIdQuery): Promise<Order[]> {
    return await this._repository.findAllByUserId(command.userId)
  }
}
