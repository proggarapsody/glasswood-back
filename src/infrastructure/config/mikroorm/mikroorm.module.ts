/* eslint-disable unicorn/prefer-module */

import { IDbConfig } from '@application/adapters/config-service.interface'
import { CartEntity } from '@infrastructure/entities/cart.entity'
import { CategoryEntity } from '@infrastructure/entities/category.entity'
import { OrderEntity } from '@infrastructure/entities/order.entity'
import { ProductEntity } from '@infrastructure/entities/product.entity'
import { UserEntity } from '@infrastructure/entities/user.entity'
import { LoadStrategy } from '@mikro-orm/core'
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { Module } from '@nestjs/common'

import { EnvironmentConfigModule } from '../env/config.module'

export const getMikroORMModuleOptions = (config: IDbConfig): MikroOrmModuleOptions => {
  return {
    type: 'postgresql',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    user: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    dbName: config.getDatabaseName(),
    // entities: [join(__dirname, '..', '..', 'entities', '*.entity.{ts,js}')],
    entities: [CartEntity, CategoryEntity, UserEntity, ProductEntity, OrderEntity],
    loadStrategy: LoadStrategy.JOINED,
    debug: true,
    ensureDatabase: true,
    persistOnCreate: true,

    metadataProvider: TsMorphMetadataProvider,

    migrations: {
      path: 'dist/infrastructure/persistence/migrations',
      pathTs: 'src/infrastructure/persistence/migrations',
      allOrNothing: true,
    },
    forceEntityConstructor: true,

    allowGlobalContext: true,
  } as MikroOrmModuleOptions
}

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [IDbConfig],
      useFactory: getMikroORMModuleOptions,
    }),
    EnvironmentConfigModule,
  ],
})
export class MikroORMConfigModule {}
