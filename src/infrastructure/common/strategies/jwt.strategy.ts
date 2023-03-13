import { IJwtConfig } from '@application/adapters/config-service.interface'
import { IJwtServicePayload } from '@application/adapters/jwt-service.interface'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

/**
 * strategy for check JWT token
 * check if user exists and token is correct
 * if not throw UnauthorizedException
 * if yes return user
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _config: IJwtConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: _config.getJwtConfig().secret,
    })
  }

  async validate(payload: IJwtServicePayload) {
    console.log(payload)

    return { payload }
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'Authorization' in req.cookies) {
      return req.cookies.access_token
    }
    return null
  }
}
