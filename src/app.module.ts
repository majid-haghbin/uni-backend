import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './database/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      /** نیازی به ایمپورت کردن در مابقی ماژول‌ها نباشد */
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService
  ],
})
export class AppModule {}
