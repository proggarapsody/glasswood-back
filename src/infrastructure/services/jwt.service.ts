import { IJwtConfig } from '@application/adapters/config-service.interface'
import {
  IJwtService,
  IJwtServicePayload,
} from '@application/adapters/jwt-service.interface'
import { ILoggerService } from '@application/adapters/logger-service.interface'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly _logger: ILoggerService,
    private readonly jwtConfig: IJwtConfig
  ) {}

  async checkToken(token: string, secret: string): Promise<IJwtServicePayload> {
    return await this.jwtService.verifyAsync(token, {
      secret,
    })
  }

  createToken(payload: IJwtServicePayload, secret: string, expiresIn: string): string {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    })
  }

  async generateCookieWithJwtToken(user: IJwtServicePayload) {
    const payload: IJwtServicePayload = {
      sub: user.sub,
      email: user.email,
      role: user.role,
    }
    const { expirationTime, secret } = this.jwtConfig.getJwtConfig()

    const expiresIn = expirationTime + 's'
    const token = this.createToken(payload, secret, expiresIn)
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expirationTime}`
  }

  async generateCookieWithJwtRefreshToken(user: IJwtServicePayload) {
    const payload: IJwtServicePayload = {
      sub: user.sub,
      email: user.email,
      role: user.role,
    }
    const { refreshExpirationTime, refreshSecret } = this.jwtConfig.getJwtConfig()

    const expiresIn = refreshExpirationTime + 's'
    const token = this.createToken(payload, refreshSecret, expiresIn)
    return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${refreshExpirationTime}`
  }
}
