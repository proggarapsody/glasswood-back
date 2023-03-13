import { JwtStrategy } from '@infrastructure/common/strategies/jwt.strategy'
import { StrategiesValidationService } from '@infrastructure/common/strategies/validation.service'
import { IStrategiesValidationService } from '@infrastructure/common/strategies/validation-service.interface'
import { EnvironmentConfigModule } from '@infrastructure/config/env/config.module'
import { RepositoriesModule } from '@infrastructure/di/repositores.module'
import { ServicesModule } from '@infrastructure/di/services.module'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [PassportModule, RepositoriesModule, ServicesModule, EnvironmentConfigModule],
  providers: [
    {
      provide: IStrategiesValidationService,
      useClass: StrategiesValidationService,
    },

    JwtStrategy,
  ],
})
export class StrategiesModule {}
