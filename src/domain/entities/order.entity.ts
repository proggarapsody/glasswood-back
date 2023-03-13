import { OrderStatuses } from '@domain/common/enums/order-statuses.enum'

import { Product } from './product.entity'

export class Order {
  id: number
  userId: number
  createsAt: Date
  status: OrderStatuses
  products: Product[]

  constructor(userId: number, products: Product[]) {
    this.userId = userId
    this.products = products
    this.status = OrderStatuses.New
  }
}
