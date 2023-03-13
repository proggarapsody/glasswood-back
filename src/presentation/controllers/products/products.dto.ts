import { ApiProperty } from '@nestjs/swagger'

export class UpdateProductDto {}

export class CreateProductDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  price: number

  @ApiProperty()
  description: string

  @ApiProperty()
  images?: string[]

  @ApiProperty()
  categoriesIds?: number[]
}

export class DeleteProductDto {
  @ApiProperty()
  id: number
}
