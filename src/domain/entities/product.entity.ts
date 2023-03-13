import { Category } from './category.entity'

export class Product {
  id: number
  name: string
  description: string
  price: number
  images?: string[]
  categories?: Category[]

  constructor({
    description,
    name,
    price,
    categories,
    images,
  }: {
    name: string
    description: string
    price: number
    images?: string[]
    categories?: Category[]
  }) {
    this.name = name
    this.description = description
    this.price = price
    this.images = images
    this.categories = categories
  }
}
