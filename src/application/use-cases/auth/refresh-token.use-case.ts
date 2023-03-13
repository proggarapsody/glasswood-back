import { IJwtConfig } from '@application/adapters/config-service.interface'
import { IExceptionsService } from '@application/adapters/exceptions-service.interface'
import { IJwtService } from '@application/adapters/jwt-service.interface'
import { IUserRepository } from '@application/repositories/user-repo.interface'
import { Injectable } from '@nestjs/common'

import { IUseCase } from '../use-case.interface'

export interface IRefreshTokenCommand {
  accessToken: string | null
  refreshToken: string | null
}

export interface IRefreshTokenResponse {
  refreshToken: string
}

@Injectable()
export class RefreshTokenUseCase
  implements IUseCase<IRefreshTokenCommand, IRefreshTokenResponse>
{
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _jwtService: IJwtService,
    private readonly _jwtConfig: IJwtConfig,
    private readonly _exceptionService: IExceptionsService
  ) {}

  async execute(command: IRefreshTokenCommand): Promise<IRefreshTokenResponse> {
    if (!command.accessToken || !command.refreshToken) {
      this._exceptionService.UnauthorizedException()
    }

    try {
      const res = await this._jwtService.checkToken(
        command.refreshToken,
        this._jwtConfig.getJwtConfig().refreshSecret
      )

      const payload = {
        sub: res.sub,
        email: res.email,
        role: res.role,
      }
      const { refreshSecret, refreshExpirationTime } = this._jwtConfig.getJwtConfig()
      return {
        refreshToken: this._jwtService.createToken(
          payload,
          refreshSecret,
          refreshExpirationTime
        ),
      }
    } catch {
      this._exceptionService.UnauthorizedException({
        message: 'Refresh token is invalid or expired',
      })
    }
  }
}
