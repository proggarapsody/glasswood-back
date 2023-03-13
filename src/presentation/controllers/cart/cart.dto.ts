export class AddToCartDto {
  cartId: number
  productId: number
}

export class RemoveFromCartDto {
  cartId: number
  productIds: number[]
}
