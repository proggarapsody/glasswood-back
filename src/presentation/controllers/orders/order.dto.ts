export class GetOrderByUserIdDto {
  userId: number
}

export class CreateOrderDto {
  userId: number
  productsIds: number[]
}
