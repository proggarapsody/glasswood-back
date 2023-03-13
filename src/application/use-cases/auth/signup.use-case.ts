import { IJwtConfig } from '@application/adapters/config-service.interface'
import { ICryptoService } from '@application/adapters/crypto-service.interface'
import { IJwtService } from '@application/adapters/jwt-service.interface'
import { IUserRepository } from '@application/repositories/user-repo.interface'
import { RolesEnum } from '@domain/common/enums/roles.enum'
import { User } from '@domain/entities/user.entity'
import { Injectable } from '@nestjs/common'

import { IUseCase } from '../use-case.interface'

export interface ISignupCommand {
  email: string
  password: string
}

export interface ISignupResponse {
  refreshToken: string
  accessToken: string
}

@Injectable()
export class SignupUseCase implements IUseCase<ISignupCommand, ISignupResponse> {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _jwtService: IJwtService,
    private readonly _jwtConfig: IJwtConfig,
    private readonly _cryptoService: ICryptoService
  ) {}

  async execute(command: ISignupCommand): Promise<ISignupResponse> {
    // const user = new User({ ...command, role: RolesEnum.User })

    const hashedPassword = await this._cryptoService.hash(command.password)

    const user = await this._userRepository.create(
      new User(command.email, hashedPassword, RolesEnum.User)
    )

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }

    const { refreshSecret, secret, expirationTime, refreshExpirationTime } =
      this._jwtConfig.getJwtConfig()

    return {
      refreshToken: this._jwtService.createToken(
        payload,
        refreshSecret,
        refreshExpirationTime
      ),
      accessToken: this._jwtService.createToken(payload, secret, expirationTime),
    }
  }
}
