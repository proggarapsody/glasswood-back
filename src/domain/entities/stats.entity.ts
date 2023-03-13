export class Stats {
  from: Date
  to: Date

  totalOrders: number
  productsIds: number[]
  totalIncome: number

  constructor({
    from,
    productsIds,
    to,
    totalIncome,
    totalOrders,
  }: {
    from: Date
    to: Date
    totalOrders: number
    productsIds: number[]
    totalIncome: number
  }) {
    this.from = from
    this.to = to
    this.totalOrders = totalOrders
    this.productsIds = productsIds
    this.totalIncome = totalIncome
  }
}
