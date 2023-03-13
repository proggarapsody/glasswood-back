import { CreateProductUseCase } from '@application/use-cases/products/create-product.command'
import { GetProductsUseCase } from '@application/use-cases/products/get-products.query'
import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { Product } from '@domain/entities/product.entity'
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreateProductDto } from './products.dto'
import { ProductPresenter } from './products.presenter'

@Controller('products')
@ApiTags('product')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter, CreateProductDto)
export class ProductsController {
  constructor(
    private readonly _getProductsUseCase: GetProductsUseCase,
    private readonly _createProductUseCase: CreateProductUseCase,
    @InjectMapper()
    private readonly _mapper: Mapper
  ) {}

  @Get('')
  @ApiResponseType(ProductPresenter, true)
  async getAllProducts() {
    const products = await this._getProductsUseCase.execute()
    return await this._mapper.mapArrayAsync(products, Product, ProductPresenter)
  }

  @Post('')
  @ApiResponseType(ProductPresenter, false)
  async createProduct(@Body() dto: CreateProductDto) {
    const product = await this._createProductUseCase.execute(dto)
    return await this._mapper.mapAsync(product, Product, ProductPresenter)
  }
}
