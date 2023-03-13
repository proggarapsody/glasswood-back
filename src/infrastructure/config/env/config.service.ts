import { IDbConfig, IJwtConfig } from '@application/adapters/config-service.interface'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvConfigService implements IJwtConfig, IDbConfig {
  constructor(private configService: ConfigService) {}

  getJwtConfig() {
    const secret = this.configService.get<string>('JWT_SECRET')
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
      expirationTime: this.configService.get<string>('JWT_EXPIRATION_TIME'),
      refreshSecret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      refreshExpirationTime: this.configService.get<string>(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
      ),
    }
  }

  getDatabaseHost() {
    return this.configService.get<string>('DB_HOST')
  }

  getDatabasePort() {
    return this.configService.get<number>('DB_PORT')
  }

  getDatabaseUser() {
    return this.configService.get<string>('DB_USER')
  }

  getDatabasePassword() {
    return this.configService.get<string>('DB_PASSWORD')
  }

  getDatabaseName() {
    return this.configService.get<string>('DB_NAME')
  }

  getDatabaseSchema() {
    return this.configService.get<string>('DB_SCHEMA')
  }

  getDatabaseSync() {
    return this.configService.get<boolean>('DB_SYNCHRONIZE')
  }
}
