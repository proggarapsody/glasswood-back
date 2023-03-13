import { IProductRepository } from '@application/repositories/product-repo.interface'
import { Product } from '@domain/entities/product.entity'
import { Injectable } from '@nestjs/common'

import { IUseCase } from '../use-case.interface'

interface CreateProductCommand {
  name: string
  price: number
  description: string
  images?: string[]
  categoriesIds?: number[]
}

@Injectable()
export class CreateProductUseCase implements IUseCase<CreateProductCommand, Product> {
  constructor(private readonly _repository: IProductRepository) {}

  async execute(product: CreateProductCommand): Promise<Product> {
    const newProduct = new Product(product)
    return await this._repository.create(newProduct)
  }
}
