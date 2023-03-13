import { IProductRepository } from '@application/repositories/product-repo.interface'
import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { Product } from '@domain/entities/product.entity'
import { ProductEntity } from '@infrastructure/entities/product.entity'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductRepository extends IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly _productRepository: EntityRepository<ProductEntity>,
    @InjectMapper()
    private readonly _mapper: Mapper
  ) {
    super()
  }
  async create(product: Product): Promise<Product> {
    const entity = this._productRepository.create(product)
    await this._productRepository.persistAndFlush(entity)
    return await this._mapper.mapAsync(entity, ProductEntity, Product)
  }

  async findAll(): Promise<Product[]> {
    const entities = await this._productRepository.findAll()
    return await this._mapper.mapArrayAsync(entities, ProductEntity, Product)
  }

  async findById(id: number): Promise<Product> {
    const res = await this._productRepository.findOneOrFail(id)
    return await this._mapper.mapAsync(res, ProductEntity, Product)
  }

  async update(
    id: number,
    updateBody: Pick<Product, 'description' | 'name' | 'price' | 'categories' | 'images'>
  ): Promise<void> {
    const product = await this._productRepository.findOneOrFail({ id })
    await this._productRepository.upsert({ ...product, ...updateBody })
  }

  async deleteById(id: number): Promise<void> {
    const entity = await this._productRepository.findOneOrFail({ id })
    await this._productRepository.removeAndFlush(entity)
  }
}
