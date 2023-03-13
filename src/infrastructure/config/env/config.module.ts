/* eslint-disable unicorn/prefer-module */

import { IDbConfig, IJwtConfig } from '@application/adapters/config-service.interface'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EnvConfigService } from './config.service'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  providers: [
    {
      provide: IJwtConfig,
      useClass: EnvConfigService,
    },
    {
      provide: IDbConfig,
      useClass: EnvConfigService,
    },
  ],
  exports: [IJwtConfig, IDbConfig],
})
export class EnvironmentConfigModule {}
