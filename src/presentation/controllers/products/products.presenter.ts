import { Category } from '@domain/entities/category.entity'
import { Product } from '@domain/entities/product.entity'
import { ApiProperty } from '@nestjs/swagger'

export class ProductPresenter {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  price: number

  @ApiProperty()
  description: string

  @ApiProperty()
  images: string[]

  @ApiProperty()
  categories: Category[]

  constructor(product: Product) {
    this.id = product.id
    this.name = product.name
    this.price = product.price
    this.images = product.images
    this.description = product.description
    this.categories = product.categories
  }
}
