import { IJwtConfig } from '@application/adapters/config-service.interface'
import { ICryptoService } from '@application/adapters/crypto-service.interface'
import { IExceptionsService } from '@application/adapters/exceptions-service.interface'
import { IJwtService } from '@application/adapters/jwt-service.interface'
import { ILoggerService } from '@application/adapters/logger-service.interface'
import { IUserRepository } from '@application/repositories/user-repo.interface'
import { Injectable } from '@nestjs/common'

import { IUseCase } from '../use-case.interface'

export interface ILoginCommand {
  email: string
  password: string
}

export interface ILoginResponse {
  refreshToken: string
  accessToken: string
}

@Injectable()
export class LoginUseCase implements IUseCase<ILoginCommand, ILoginResponse> {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _jwtService: IJwtService,
    private readonly _jwtConfig: IJwtConfig,
    private readonly _cryptoService: ICryptoService,
    private readonly _logger: ILoggerService,
    private readonly _exceptionService: IExceptionsService
  ) {}

  async execute(command: ILoginCommand): Promise<ILoginResponse> {
    const { email, password } = command

    if (!email || !password) {
      this._logger.warn(
        'LoginUseCase',
        `Email or password is missing, BadRequestException`
      )
      this._exceptionService.UnauthorizedException()
    }

    const user = await this._userRepository.findByEmail(email)

    if (!user) {
      this._logger.warn('LoginUseCase', `User not found, BadRequestException`)
      this._exceptionService.UnauthorizedException({
        message: 'User with this email does not exist.',
      })
    }

    const isPasswordMatching = await this._cryptoService.compare(password, user.password)

    if (!isPasswordMatching) {
      this._logger.warn('LoginUseCase', `Invalid email or password`)
      this._exceptionService.UnauthorizedException({
        message: 'Invalid email or password.',
      })
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }

    const { refreshSecret, secret, expirationTime, refreshExpirationTime } =
      this._jwtConfig.getJwtConfig()

    return {
      refreshToken: await this._jwtService.createToken(
        payload,
        refreshSecret,
        refreshExpirationTime
      ),
      accessToken: await this._jwtService.createToken(payload, secret, expirationTime),
    }
  }
}
