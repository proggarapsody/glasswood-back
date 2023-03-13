import { IStatsRepository } from '@application/repositories/stats-repo.interface'
import { Stats } from '@domain/entities/stats.entity'
import { OrderEntity } from '@infrastructure/entities/order.entity'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StatsRepository extends IStatsRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly _orderRepository: EntityRepository<OrderEntity>
  ) {
    super()
  }

  async get(filter: { from: Date; to: Date }): Promise<Stats> {
    const orders = await this._orderRepository.find({
      createdAt: { $gte: filter.from, $lte: filter.to },
    })

    const products = orders.flatMap((el) => el.products.getItems())
    const productsIds = products.map((el) => el.id)

    const totalIncome = products.reduce((acc, el) => acc + el.price, 0)

    return new Stats({
      from: filter.from,
      to: filter.to,
      productsIds,
      totalIncome,
      totalOrders: orders.length,
    })
  }
}
