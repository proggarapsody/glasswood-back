import { Stats } from '@domain/entities/stats.entity'

export class StatsPresenter {
  from: Date
  to: Date

  totalOrders: number
  productsIds: number[]
  totalIncome: number

  constructor(stats: Stats) {
    this.from = stats.from
    this.to = stats.to
    this.totalOrders = stats.totalOrders
    this.productsIds = stats.productsIds
    this.totalIncome = stats.totalIncome
  }
}
