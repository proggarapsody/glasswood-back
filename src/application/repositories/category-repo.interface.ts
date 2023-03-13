import { Category } from '@domain/entities/category.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class ICategoryRepository {
  abstract create(category: Category): Promise<Category>
  abstract findAll(): Promise<Category[]>
  abstract findById(id: number): Promise<Category>
  abstract update(id: number): Promise<void>
  abstract deleteById(id: number): Promise<void>
}
