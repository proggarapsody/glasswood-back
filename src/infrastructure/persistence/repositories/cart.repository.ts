import { ICartRepository } from '@application/repositories/cart-repo.interface'
import { IProductRepository } from '@application/repositories/product-repo.interface'
import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { Cart } from '@domain/entities/cart.entity'
import { Product } from '@domain/entities/product.entity'
import { CartEntity } from '@infrastructure/entities/cart.entity'
import { ProductEntity } from '@infrastructure/entities/product.entity'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CartRepository extends ICartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly _cartRepository: EntityRepository<CartEntity>,
    private readonly _productRepository: IProductRepository,
    @InjectMapper()
    private readonly _mapper: Mapper
  ) {
    super()
  }

  async findByUserId(userId: number): Promise<Cart | null> {
    const entity = await this._cartRepository.findOneOrFail({ user: { id: userId } })
    return await this._mapper.mapAsync(entity, CartEntity, Cart)
  }

  async findById(id: number): Promise<Cart> {
    const entity = await this._cartRepository.findOneOrFail({ id })
    return await this._mapper.mapAsync(entity, CartEntity, Cart)
  }

  async addProductToCart(id: number, productId: number): Promise<void> {
    const entity = await this._cartRepository.findOneOrFail({ id })
    const product = await this._productRepository.findById(productId)
    const productEntity = await this._mapper.mapAsync(product, Product, ProductEntity)

    entity.products.add(productEntity)
    await this._cartRepository.upsert({ ...entity })
  }

  async removeProductsFromCart(id: number, productIds: number[]): Promise<void> {
    const entity = await this._cartRepository.findOneOrFail({ id })
    entity.products.remove(
      entity.products.getItems().filter((p) => {
        return productIds.includes(p.id)
      })
    )
    await this._cartRepository.upsert({ ...entity })
  }
}
