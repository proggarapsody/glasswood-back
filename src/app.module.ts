/* eslint-disable unicorn/prefer-module */
import { StrategiesModule } from '@infrastructure/common/strategies/strategies.module'
import { EnvironmentConfigModule } from '@infrastructure/config/env/config.module'
import { MikroORMConfigModule } from '@infrastructure/config/mikroorm/mikroorm.module'
import { ServicesModule } from '@infrastructure/di/services.module'
import { UseCasesModule } from '@infrastructure/di/use-cases.module'
import { Module } from '@nestjs/common'
import { ControllersModule } from '@presentation/controllers/controllers.module'

@Module({
  imports: [
    MikroORMConfigModule,
    ControllersModule,
    ServicesModule,
    EnvironmentConfigModule,
    UseCasesModule,
    StrategiesModule,
  ],
})
export class AppModule {}
