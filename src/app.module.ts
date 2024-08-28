import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './database/prisma.service'
import { StudentsService } from './students/students.service'
import { ProfessorsService } from './professors/professors.service'
import { AdminsService } from './admins/admins.service'
import { UsersService } from './users/users.service'
import { AuthService } from './auth/auth.service'
import { UsersController } from './users/users.controller'
import { AdminsController } from './admins/admins.controller'
import { AuthController } from './auth/auth.controller'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { jwtConstants } from './auth/constants'
import { MajorsController } from './majors/majors.controller'
import { MajorsService } from './majors/majors.service'
import { ProfessorsController } from './professors/professors.controller'
import { LessonsController } from './lessons/lessons.controller'
import { LessonsService } from './lessons/lessons.service'
import { StudentsController } from './students/students.controller'
import { ExamsController } from './exams/exams.controller'
import { ExamsService } from './exams/exams.service'
import { AccessService } from './access/access.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      /** نیازی به ایمپورت کردن در مابقی ماژول‌ها نباشد */
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      /** @todo باید مقدار رمز از درون متغیر‌های محیطی خوانده شود که امن باشد */
      secretOrKeyProvider: () => jwtConstants.secret,
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    AdminsController,
    AuthController,
    MajorsController,
    ProfessorsController,
    LessonsController,
    StudentsController,
    ExamsController,
  ],
  providers: [
    AppService,
    PrismaService,
    StudentsService,
    ProfessorsService,
    AdminsService,
    UsersService,
    AuthService,
    JwtService,
    MajorsService,
    LessonsService,
    StudentsService,
    ExamsService,
    AccessService,
  ],
  exports: [AuthService]
})
export class AppModule {}
