import { ICryptoService } from '@application/adapters/crypto-service.interface'
import { IJwtService } from '@application/adapters/jwt-service.interface'
import { IUserRepository } from '@application/repositories/user-repo.interface'

import { IStrategiesValidationService } from './validation-service.interface'

export class StrategiesValidationService implements IStrategiesValidationService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _cryptoService: ICryptoService,
    private readonly _jwtService: IJwtService
  ) {}

  async validateUserForLocalStrategy(email: string, password: string) {
    const user = await this._userRepository.findByEmail(email)
    if (!user) {
      return null
    }
    const match = await this._cryptoService.compare(password, user.password)
    if (user && match) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async validateUserForJwtStrategy(id: number) {
    const user = await this._userRepository.findById(id)
    if (user) {
      return user
    }
    return null
  }
}
