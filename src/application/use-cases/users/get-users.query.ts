import { IUserRepository } from '@application/repositories/user-repo.interface'
import { User } from '@domain/entities/user.entity'
import { Injectable } from '@nestjs/common'
@Injectable()
export class GetUsersUseCase {
  constructor(private readonly _repository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return await this._repository.findAll()
  }
}
