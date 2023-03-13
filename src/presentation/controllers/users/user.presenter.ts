import { RolesEnum } from '@domain/common/enums/roles.enum'
import { UserStatuses } from '@domain/common/enums/user-statuses.enum'
import { Cart } from '@domain/entities/cart.entity'
import { User } from '@domain/entities/user.entity'

export class UserPresenter {
  constructor(user: User) {
    this.email = user.email
    this.role = user.role
    this.status = user.status
    this.id = user.id
    this.name = user.name
    this.cart = user.cart
  }
  id: number
  name: string
  email: string
  cart?: Cart
  role: RolesEnum
  status: UserStatuses
}
