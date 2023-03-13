import { Product } from '@domain/entities/product.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class IProductRepository {
  abstract create(product: Product): Promise<Product>
  abstract findAll(): Promise<Product[]>
  abstract findById(id: number): Promise<Product>
  abstract update(
    id: number,
    updateBody: Pick<Product, 'description' | 'name' | 'price' | 'categories' | 'images'>
  ): Promise<void>
  abstract deleteById(id: number): Promise<void>
}
