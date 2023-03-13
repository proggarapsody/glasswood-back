import { CreateOrderUseCase } from '@application/use-cases/order/create-order.command'
import { GetOrdersByUserIdUseCase } from '@application/use-cases/order/get-orders-by-userid.query'
import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { Order } from '@domain/entities/order.entity'
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreateOrderDto, GetOrderByUserIdDto } from './order.dto'
import { OrderPresenter } from './order.presenter'

@Controller('orders')
@ApiTags('orders')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(OrderPresenter, GetOrderByUserIdDto)
export class OrdersController {
  constructor(
    private readonly _getOrdersByUserIdUseCase: GetOrdersByUserIdUseCase,
    private readonly _createOrderUseCase: CreateOrderUseCase,
    @InjectMapper()
    private readonly _mapper: Mapper
  ) {}

  @Get('')
  @ApiResponseType(OrderPresenter, true)
  async getAllOrdersByUserId(@Body() dto: GetOrderByUserIdDto) {
    const orders = await this._getOrdersByUserIdUseCase.execute({ userId: dto.userId })
    return await this._mapper.mapArrayAsync(orders, Order, OrderPresenter)
  }

  @Post('')
  @ApiResponseType(OrderPresenter, false)
  async createOrder(@Body() dto: CreateOrderDto) {
    const order = await this._createOrderUseCase.execute(dto)
    return await this._mapper.mapAsync(order, Order, OrderPresenter)
  }
}
