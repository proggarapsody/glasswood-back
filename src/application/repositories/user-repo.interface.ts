import { UserStatuses } from '@domain/common/enums/user-statuses.enum'
import { User } from '@domain/entities/user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class IUserRepository {
  abstract create(todo: User): Promise<User>
  abstract findAll(): Promise<User[]>
  abstract findById(id: number): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract update(
    id: number,
    updateBody: Pick<User, 'email' | 'name' | 'role'>
  ): Promise<void>
  abstract updatePassword(id: number, password: string): Promise<void>
  abstract updateStatus(id: number, status: UserStatuses): Promise<void>
  abstract deleteById(id: number): Promise<void>
}
