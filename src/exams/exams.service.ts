import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
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
    
    const now = Date.now() / 1000
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
      }
    })

    body.questions.forEach(async question => {
      await this.createQuestion(question, exam.id)
    })

    return exam
  }

  /**
   * برای درج یک سوال جدید
   * @param question سوالی که قرار است در دیتابیس ثبت شود
   * @param examID آیدی امتحانی که این سوال به آن مربوط می‌شود
   * @returns سوالی که ایجاد شده
   */
  async createQuestion(question: CreateExamDto['questions'][number], examID: number) {
    const createdQuestion = await this.prisma.question.create({
      data: {
        exam: {
          connect: { id: examID }
        },
        title: question.title,
        isMultiChoice: question.isMultiChoice,
        marks: question.marks,
      }
    })

    if (question.answers && question.answers.length) {
      await this.prisma.choice.createMany({
        data: question.answers.map(choice => {
          return {
            questionID: createdQuestion.id,
            text: choice.text
          }
        })
      })
    }

    return createdQuestion
  }

  async closeExam(examID: number, professorID: number) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examID },
      include: {
        lesson: true
      }
    })

    if (!exam || exam.lesson.professorID !== professorID) return new BadRequestException('آیدی درس اشتباه است')
    
    await this.prisma.exam.update({
      where: { id: examID },
      data: {
        isClosed: true
      }
    })
  }
}
