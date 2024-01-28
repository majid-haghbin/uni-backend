import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async professorExams(lessonID: number, professorID: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonID }
    })

    if (!lesson || lesson.professorID !== professorID) return new BadRequestException('آیدی درس اشتباه است')

    const exams = await this.prisma.exam.findMany({
      where: { lessonID }
    })

    return exams
  }
}
