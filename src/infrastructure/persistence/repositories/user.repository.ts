import { IUserRepository } from '@application/repositories/user-repo.interface'
import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { UserStatuses } from '@domain/common/enums/user-statuses.enum'
import { User } from '@domain/entities/user.entity'
import { UserEntity } from '@infrastructure/entities/user.entity'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository extends IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: EntityRepository<UserEntity>,
    @InjectMapper()
    private readonly _mapper: Mapper
  ) {
    super()
  }

  async create(user: User): Promise<User> {
    const entity = this._userRepository.create({ ...user })
    await this._userRepository.persistAndFlush(entity)

    try {
      return await this._mapper.mapAsync(entity, UserEntity, User)
    } catch (error) {
      console.log(error)
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this._userRepository.findAll()
    return await this._mapper.mapArrayAsync(users, UserEntity, User)
  }

  async findById(id: number): Promise<User> {
    const user = await this._userRepository.findOne(id)
    if (user) {
      return await this._mapper.mapAsync(user, UserEntity, User)
    }
    return null
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this._userRepository.findOne({ email })
    if (user) {
      return await this._mapper.mapAsync(user, UserEntity, User)
    }
    return null
  }

  async update(
    id: number,
    updateBody: Pick<User, 'email' | 'name' | 'role'>
  ): Promise<void> {
    const user = await this._userRepository.findOneOrFail({ id })
    await this._userRepository.upsert({ ...user, ...updateBody })
  }

  async updatePassword(id: number, password: string): Promise<void> {
    const user = await this._userRepository.findOneOrFail({ id })
    await this._userRepository.upsert({ ...user, password })
  }
  async updateStatus(id: number, status: UserStatuses): Promise<void> {
    const user = await this._userRepository.findOneOrFail({ id })
    await this._userRepository.upsert({ ...user, status })
  }
  async deleteById(id: number): Promise<void> {
    const user = await this._userRepository.findOneOrFail({ id })
    await this._userRepository.removeAndFlush(user)
  }
}
