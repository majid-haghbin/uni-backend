import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateExamDto, QuestionDto } from './dto/create-exam.dto'
import { SubmitAttemptDto } from './dto/submit-attempt.dto'
import { User } from '@prisma/client'

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
      where: { lessonID },
      include: {
        attempts: {
          include: {
            _count: true
          }
        }
      }
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
   */
  async createExam(body: CreateExamDto) {
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

    return exam
  }

  /**
   * ایجاد آزمون
   * @param body 
   * @param professorID آیدی استادی که می‌خواهد درس را ایجاد کند
   * @returns 
   */
  async createExamByProfessor(body: CreateExamDto, professorID: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: body.lessonID, professorID }
    })
    
    if (!lesson) return new BadRequestException('آیدی درس اشتباه است')
    
    return this.createExam(body)
  }

  /**
   * برای درج یک سوال جدید
   * @param question سوالی که قرار است در دیتابیس ثبت شود
   * @param examID آیدی امتحانی که این سوال به آن مربوط می‌شود
   * @returns سوالی که ایجاد شده
   */
  async createQuestion(question: QuestionDto, examID: number) {
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

  async getExamForStudent(examID: number, studentID: number) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examID },
      include: {
        lesson: true,
      }
    })

    if (!exam) return new BadRequestException('چنین آزمونی وجود ندارد')

    const lesson = await this.prisma.pickedLesson.findUnique({
      where: {
        lessonID_studentID: {
          lessonID: exam.lesson.id,
          studentID,
        }
      }
    })

    if (!lesson) return new BadRequestException('چنین آزمونی وجود ندارد')

    return this.getExamDetails(examID)
  }

  async getExamDetails(examID: number) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examID },
      include: {
        questions: {
          include: {
            choices: true
          }
        }
      }
    })

    return exam
  }

  async submitExamAttempt(studentID: number, body: SubmitAttemptDto) {
    const pickedLesson = await this.prisma.pickedLesson.findUnique({
      where: {
        lessonID_studentID: {
          lessonID: body.lessonID,
          studentID,
        }
      }
    })

    if (!pickedLesson) return new BadRequestException('چنین آزمونی وجود ندارد')

    try {
      const attempt = await this.prisma.attempt.create({
        data: {
          exam: { connect: { id: body.examID }},
          student: { connect: { id: studentID }},
          answers: {
            create: body.answers.map(answer => ({
              text: answer.text || null, // اگر پاسخ تشریحی بود
              question: {
                connect: { id: answer.questionID },
              },
              choice: answer.choiceID ?
                { connect: { id: answer.choiceID } } :
                undefined, // اگر تستی بود
            })),
          },
          created: (Date.now() / 1000).toFixed()
        }
      })

      return
    } catch(err) {
      return err
    }
  }
  
  async hasAccessToExamAttempts(examID: number, user: User) {
    if (user.role === 'admin' || user.role === 'superAdmin') return true
    else if (user.role === 'professor') {
      const exam = await this.prisma.exam.findUnique({
        where: { id: examID },
        include: {
          lesson: true
        }
      })

      if (!exam) return false
      if (exam.lesson.professorID === user.professorID) return true
    } else {
      const exam = await this.prisma.exam.findUnique({
        where: { id: examID },
        include: { lesson: true }
      })

      if (!exam) return false

      const pickedLesson = await this.prisma.pickedLesson.findUnique({
        where: {
          lessonID_studentID: {
            lessonID: exam.lesson.id,
            studentID: user.studentID
          }
        }
      })

      if (!pickedLesson) return false
      return true
    }
  }

  async getExamAttempts(examID: number, user: User) {
    const hasAccess = await this.hasAccessToExamAttempts(examID, user)
    if (!hasAccess) throw new BadRequestException('چنین آزمونی وجود ندارد')

    const exam = await this.prisma.exam.findUnique({
      where: { id: examID }
    })

    const attempts = await this.prisma.attempt.findMany({
      where: {
        examID,
        studentID: user.role === 'student' ? user.studentID : undefined
      },
      include: {
        student: {
          include: {
            user: true
          }
        }
      }
    })

    return {
      exam,
      attempts
    }
  }
}
