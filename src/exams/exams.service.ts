import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateExamDto } from './dto/create-exam.dto'

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

  /**
   * @param studentID آیدی دانشجو
   * @param lessonID آیدی درس
   * @returns لیست دروس دانشجو
   */
  async studentExams(lessonID: number, studentID: number) {
    const lesson = await this.prisma.pickedLesson.findUnique({
      where: {
        lessonID_studentID: {
          lessonID,
          studentID
        }
      }
    })

    if (!lesson) return new BadRequestException('آیدی درس اشتباه است')

    const exams = await this.prisma.exam.findMany({
      where: { lessonID }
    })

    return exams
  }

  async examsListForAdmin(lessonID: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonID }
    })

    if (!lesson) return new BadRequestException('آیدی درس اشتباه است')

    const exams = await this.prisma.exam.findMany({
      where: { lessonID }
    })

    return exams
  }
  
  /**
   * ایجاد آزمون
   * @param body 
   * @param professorID آیدی استادی که می‌خواهد درس را ایجاد کند
   * @returns 
   */
  async createExam(body: CreateExamDto, professorID: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: body.lessonID, professorID }
    })
    
    if (!lesson) return new BadRequestException('آیدی درس اشتباه است')
    
    const now = Date.now()

    const questions = body.questions.map(item => {
      return {
        title: item.title,
        isMultiChoice: item.isMultiChoice,
        marks: item.marks,
      }
    })

    const exam = await this.prisma.exam.create({
      data: {
        lesson: {
          connect: { id: body.lessonID }
        },
        title: body.title,
        description: body.description,
        created: now.toString(),
        updated: now.toString(),
        startDate: body.startDate,
        endDate: body.endDate,
        maxAttempt: body.maxAttempt,
        questions: {
          createMany: {
            data: questions,
          }
        }
      },
      include: {
        questions: true
      }
    })

    return exam
  }
}
