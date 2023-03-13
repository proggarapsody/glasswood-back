import { OrderStatuses } from '@domain/common/enums/order-statuses.enum'
import { Order } from '@domain/entities/order.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class IOrderRepository {
  abstract create(Order: Order): Promise<Order>
  abstract findAll(): Promise<Order[]>
  abstract findById(id: number): Promise<Order>
  abstract findAllByUserId(userId: number): Promise<Order[]>
  abstract changeStatusById(id: number, status: OrderStatuses): Promise<Order>
  abstract deleteById(id: number): Promise<void>
}
