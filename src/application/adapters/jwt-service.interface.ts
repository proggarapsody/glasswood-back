import { RolesEnum } from '@domain/common/enums/roles.enum'

export interface IJwtServicePayload {
  sub: number
  email: string
  role: RolesEnum
}

export abstract class IJwtService {
  abstract checkToken(token: string, secret: string): Promise<IJwtServicePayload>
  abstract createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string
  ): string
  // abstract generateCookieWithJwtToken(user: IJwtServicePayload): Promise<string>
  // abstract generateCookieWithJwtRefreshToken(user: IJwtServicePayload): Promise<string>
}
