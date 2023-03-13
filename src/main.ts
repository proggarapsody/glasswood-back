import { IDbConfig } from '@application/adapters/config-service.interface'
/* eslint-disable unicorn/prefer-top-level-await */
import { getMikroORMModuleOptions } from '@infrastructure/config/mikroorm/mikroorm.module'
import { MikroORM } from '@mikro-orm/core'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

class Application {
  public static async main() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    // await this.runSeeding(app)
    // app.useGlobalInterceptors()
    // app.useStaticAssets(Constants.PATH_TO_LOCAL_FOLDER, {
    //     prefix: "/api/public"
    // });

    const config = app.get(IDbConfig)

    await this.runMigration(config)

    app.setGlobalPrefix('api')
    this.addSwagger(app)

    app.enableCors()
    app.use(cookieParser())
    await app.listen(process.env.PORT)

    console.log(`Application is running on: ${await app.getUrl()}`)
  }

  private static async runMigration(config: IDbConfig): Promise<void> {
    const orm = await MikroORM.init(getMikroORMModuleOptions(config))
    const migrator = orm.getMigrator()
    await migrator.createMigration()

    await migrator.up()
    await orm.close()
  }

  // private static async runSeeding(app: NestExpressApplication): Promise<void> {
  //   const seedService = app.get(SeedService)
  //   await seedService.run()
  // }

  private static addSwagger(app: NestExpressApplication): void {
    const options = new DocumentBuilder()
      .setTitle('Glasswood Homestore API')
      .setDescription('Glasswood Homestore web app API')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api/swagger', app, document)
  }
}

Application.main().catch((error) => console.error(error))
