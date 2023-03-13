import { User } from '@domain/entities/user.entity'

export interface IStrategiesValidationService {
  validateUserForLocalStrategy(
    email: string,
    password: string
  ): Promise<Omit<User, 'password'> | null>
  validateUserForJwtStrategy(id: number): Promise<User | null>
  // validateUserForJwtRefreshStrategy()
}

export const IStrategiesValidationService = Symbol('IStrategiesValidationService')
