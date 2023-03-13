import { Cart } from '@domain/entities/cart.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class ICartRepository {
  abstract findByUserId(userId: number): Promise<Cart | null>
  abstract findById(id: number): Promise<Cart | null>
  abstract addProductToCart(id: number, productId: number): Promise<void>
  abstract removeProductsFromCart(id: number, productIds: number[]): Promise<void>
}
