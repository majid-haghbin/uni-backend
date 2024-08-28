import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { LessonsService } from 'src/lessons/lessons.service'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class AccessService {
  constructor(
    private prisma: PrismaService
  ) {}

  async studentHasAccessToLesson(studentID: number, lessonID: number) {
    const lesson = await this.prisma.pickedLesson.findUnique({
      where: {
        lessonID_studentID: {
          lessonID,
          studentID,
        }
      }
    })

    if (!lesson) return new UnauthorizedException('به این درس دسترسی ندارید')
    return true
  }

  async professorHasAccessToLesson(professorID: number, lessonID: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonID }
    })

    /** برای این که اطلاعات سیستم را به افراد ندهیم فقط می‌گوییم دسترسی نداری و نمی‌گوییم درسی وجود ندارد */
    if (!lesson) throw new UnauthorizedException('به این درس دسترسی ندارید')
    if (lesson.professorID !== professorID) throw new UnauthorizedException('به این درس دسترسی ندارید')

    return true
  }
}
