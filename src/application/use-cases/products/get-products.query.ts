import { IProductRepository } from '@application/repositories/product-repo.interface'
import { Product } from '@domain/entities/product.entity'
import { Injectable } from '@nestjs/common'
@Injectable()
export class GetProductsUseCase {
  constructor(private readonly _repository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this._repository.findAll()
  }
}
