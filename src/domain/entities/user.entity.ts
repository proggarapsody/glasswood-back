import { UserStatuses } from '@domain/common/enums/user-statuses.enum'

import { RolesEnum } from '../common/enums/roles.enum'
import { Cart } from './cart.entity'
import { Order } from './order.entity'

export class User {
  constructor(email: string, password: string, role: RolesEnum) {
    this.email = email
    this.password = password
    this.role = role
    this.status = UserStatuses.Active
  }
  id: number
  name: string
  email: string
  password: string
  cart?: Cart
  orders?: Order[]
  role: RolesEnum
  status: UserStatuses
}
