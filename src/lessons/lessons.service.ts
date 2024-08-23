import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateLessonDTO } from './dto/create-lesson.dto'
import { ExamsService } from 'src/exams/exams.service'
@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService, private examsService: ExamsService) {}

  async create(body: CreateLessonDTO) {
    const user = await this.prisma.user.findUnique({
      where: { ID: body.professorID }
    })
    if (!user || user.role !== 'professor') return new BadRequestException('آیدی استاد را درست وارد کنید')

    const major = await this.prisma.major.findUnique({
      where: { id: body.majorID }
    })
    if (!major) return new BadRequestException('آیدی رشته تحصیلی را درست وارد کنید')

    const lesson = await this.prisma.lesson.create({
      data: {
        name: body.name.trim(),
        unit: body.unit,
        professor: {
          connect: {
            id: user.professorID,
          }
        },
        major: {
          connect: {
            id: body.majorID
          }
        }
      }
    })
    return lesson
  }

  async list() {
    const lessons = await this.prisma.lesson.findMany()
    return lessons
  }

  /**
   * لیست دروس استاد مدنظر را برمی‌گرداند
   */
  async professorsLessons(professorID: number) {
    return this.prisma.lesson.findMany({
      where: { professorID }
    })
  }

  
  /**
   * لیست دروس دانشجو مدنظر را برمی‌گرداند
   */
  async studentsLessons(studentID: number) {
    const lessons = await this.prisma.pickedLesson.findMany({
      where: { studentID,  },
      include: {
        lesson: true
      }
    })

    return lessons.map(item => item.lesson)
  }

  /**
   * برای دریافت جزئیات درس مربوط به این دانشجو و آزمون‌های درس
   * @param lessonID آیدی درس مدنظر
   * @param studentID آیدی دانشجو مدنظر که از توکنش به دست می‌آید
   */
  async getStudentsLesson(lessonID: number, studentID: number) {
    const pickedLesson = await this.prisma.pickedLesson.findUnique({
      where: {
        lessonID_studentID: {
          lessonID,
          studentID
        }
      },
      include: {
        lesson: true
      }
    })

    if (!pickedLesson) return new BadRequestException('شما چنین درسی ندارید')

    const exams = await this.examsService.studentExams(lessonID, studentID)

    return {
      lesson: pickedLesson.lesson,
      exams,
    }
  }

  /**
   * برای دریافت جزئیات درس مربوط به این استاد و آزمون‌های درس
   * @param lessonID آیدی درس مدنظر
   * @param professorID آیدی استاد مدنظر که از توکنش به دست می‌آید
   */
  async getProfessorsLessonDetails(lessonID: number, professorID: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: {
        id: lessonID,
        professorID,
      }
    })

    if (!lesson) return new BadRequestException('شما چنین درسی ندارید')

    const exams = await this.prisma.exam.findMany({
      where: { lessonID }
    })

    return {
      lesson,
      exams,
    }
  }
}
