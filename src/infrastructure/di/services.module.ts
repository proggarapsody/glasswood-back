import { IJwtConfig } from '@application/adapters/config-service.interface'
import { ICryptoService } from '@application/adapters/crypto-service.interface'
import { IExceptionsService } from '@application/adapters/exceptions-service.interface'
import { IJwtService } from '@application/adapters/jwt-service.interface'
import { ILoggerService } from '@application/adapters/logger-service.interface'
import { classes } from '@automapper/classes'
import { AutomapperModule } from '@automapper/nestjs'
import { EnvironmentConfigModule } from '@infrastructure/config/env/config.module'
import { MikroORMConfigModule } from '@infrastructure/config/mikroorm/mikroorm.module'
import { Module } from '@nestjs/common'
import { JwtModule as Jwt } from '@nestjs/jwt'

import { CryptoService } from '../services/crypto.service'
import { ExceptionsService } from '../services/exceptions.service'
import { JwtTokenService } from '../services/jwt.service'
import { LoggerService } from '../services/logger.service'
import { MapperService } from '../services/mapper.service'

@Module({
  imports: [
    Jwt.registerAsync({
      imports: [EnvironmentConfigModule],
      useFactory: (config: IJwtConfig) => config.getJwtConfig(),
      inject: [IJwtConfig],
    }),
    EnvironmentConfigModule,
    MikroORMConfigModule,
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  providers: [
    {
      provide: IJwtService,
      useClass: JwtTokenService,
    },
    {
      provide: ICryptoService,
      useClass: CryptoService,
    },
    {
      provide: ILoggerService,
      useClass: LoggerService,
    },
    {
      provide: IExceptionsService,
      useClass: ExceptionsService,
    },

    MapperService,
    // {
    //   provide: IStrategiesValidationService,
    //   useClass: StrategiesValidationService
    // },
    // LocalStrategy,
    // JwtStrategy,
    // JwtRefreshTokenStrategy,
  ],
  exports: [
    IJwtService,
    ILoggerService,
    IExceptionsService,
    ICryptoService,
    MapperService,
  ],
})
export class ServicesModule {}
