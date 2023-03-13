import { OrderStatuses } from '@domain/common/enums/order-statuses.enum'
import { Order } from '@domain/entities/order.entity'
import { Product } from '@domain/entities/product.entity'

export class OrderPresenter {
  id: number
  userId: number
  createsAt: Date
  status: OrderStatuses
  products: Product[]

  constructor(order: Order) {
    this.userId = order.userId
    this.products = order.products
    this.status = order.status
    this.createsAt = order.createsAt
    this.id = order.id
  }
}
