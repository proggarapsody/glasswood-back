import { IOrderRepository } from '@application/repositories/order-repo.interface'
import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { OrderStatuses } from '@domain/common/enums/order-statuses.enum'
import { Order } from '@domain/entities/order.entity'
import { OrderEntity } from '@infrastructure/entities/order.entity'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OrderRepository extends IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly _orderRepository: EntityRepository<OrderEntity>,
    @InjectMapper()
    private readonly _mapper: Mapper
  ) {
    super()
  }

  async create(order: Order): Promise<Order> {
    const entity = this._orderRepository.create(order)
    await this._orderRepository.persistAndFlush(entity)
    return await this._mapper.mapAsync(entity, OrderEntity, Order)
  }

  async findAll(): Promise<Order[]> {
    const entities = await this._orderRepository.findAll()
    return await this._mapper.mapArrayAsync(entities, OrderEntity, Order)
  }

  async findById(id: number): Promise<Order> {
    const res = await this._orderRepository.findOneOrFail(id)
    return await this._mapper.mapAsync(res, OrderEntity, Order)
  }

  async findAllByUserId(userId: number): Promise<Order[]> {
    const entities = await this._orderRepository.find({ userId })
    return await this._mapper.mapArrayAsync(entities, OrderEntity, Order)
  }

  async deleteById(id: number): Promise<void> {
    const entity = await this._orderRepository.findOneOrFail({ id })
    await this._orderRepository.removeAndFlush(entity)
  }

  async changeStatusById(id: number, status: OrderStatuses): Promise<Order> {
    const entity = await this._orderRepository.findOneOrFail({ id })
    entity.status = status
    await this._orderRepository.upsert(entity)
    return await this._mapper.mapAsync(entity, OrderEntity, Order)
  }
}
