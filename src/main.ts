import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'

const PORT = 3030

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    /** سرور در هنگام ارورهای هندل نشده کرش نکند */
    abortOnError: false
  })

  app.use(helmet())
  /**
   * @todo Should fix origin value 
   */
  app.enableCors({
    origin: [
      'http://localhost:8080', 
    ],
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe({
    /** 
     * مقدار زیر تعیین می‌کند که خطاهای 400 با جزئیات نمایش داده شوند یا خیر
     * @todo باید بر اساس اینکه در پروداکشن هستیم یا دولوپمنت پیاده سازی شود
     */
    disableErrorMessages: false,
    /** پراپرتی‌هایی که درون
     * dto
     * تعریف نشده‌اند حذف شوند و به فایل کنترلر تحویل داده نشوند.
     */
    whitelist: true,
  }));

  await app.listen(PORT)
}
bootstrap()
