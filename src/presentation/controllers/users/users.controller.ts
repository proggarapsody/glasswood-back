import { GetUsersUseCase } from '@application/use-cases/users/get-users.query'
import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { User } from '@domain/entities/user.entity'
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator'
import { Controller, Get } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger'

import { UserPresenter } from './user.presenter'
@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UsersController {
  constructor(
    private readonly _getUsersUseCase: GetUsersUseCase,
    @InjectMapper()
    private readonly _mapper: Mapper
  ) {}

  @Get('')
  @ApiResponseType(UserPresenter, true)
  async getAllUsers() {
    const users = await this._getUsersUseCase.execute()
    return await this._mapper.mapArrayAsync(users, User, UserPresenter)
  }
}
