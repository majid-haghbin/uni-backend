import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateStudentDTO } from './dto/create-student.dto'
import { AddToLessonDTO } from './dto/add-to-lesson.dto'
import { UsersService } from 'src/users/users.service'
import { StudentsAdminList } from './dto/admin-list.dto'

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService, private userService: UsersService) {}

  async create(body: CreateStudentDTO) {
    const major = await this.prisma.major.findUnique({
      where: { id: body.majorID }
    })
    if (!major) return new BadRequestException('آیدی رشته تحصیلی اشتباه است')

    const submittedWithSameMobile = await this.userService.findWithMobile(body.mobile)
    if (submittedWithSameMobile) return new BadRequestException('کاربری با این شماره همراه قبلا ثبت شده است')

    const submittedWithSameEmail = await this.userService.findWithEmail(body.email)
    if (submittedWithSameEmail) return new BadRequestException('کاربری با این ایمیل قبلا ثبت شده است')

    const student = await this.prisma.user.create({
      data: {
        name: body.name.trim(),
        family: body.family.trim(),
        fatherName: body.fatherName.trim(),
        email: body.email.trim(),
        mobile: body.mobile,
        role: 'student',
        password: body.password,

        student: {
          create: {
            birthDate: body.birthDate,
            code: body.code,

            major: {
              connect: {
                id: body.majorID,
              }
            }
          }
        }
      }
    })
    return student
  }

  async update(body: CreateStudentDTO) {
    const student = await this.prisma.user.findUnique({
      where: { ID: body.ID }
    })
    if (!student) return new BadRequestException('آیدی دانشجو صحیح نیست')

    const major = await this.prisma.major.findUnique({
      where: { id: body.majorID }
    })
    if (!major) return new BadRequestException('آیدی رشته تحصیلی اشتباه است')

    const updatedStudent = await this.prisma.user.update({
      where: { ID: body.ID },
      data: {
        name: body.name,
        family: body.family,
        fatherName: body.fatherName,
        mobile: body.mobile,
        email: body.email,
        password: body.password,

        student: {
          update: {
            where: { id: student.studentID },
            data: {
              birthDate: body.birthDate,
              code: body.code,
              majorID: body.majorID,
            }
          }
        }
      }
    })
    return updatedStudent
  }

  async addToLesson(body: AddToLessonDTO) {
    const user = await this.prisma.user.findUnique({
      where: { ID: body.studentID },
      include: {
        student: true
      }
    })
    if (!user || user.role !== 'student' || !user.student) return new BadRequestException('آیدی دانشجو اشتباه است')
    const { student } = user

    const lesson = await this.prisma.lesson.findUnique({
      where: { id: body.lessonID }
    })
    if (!lesson) return new BadRequestException('آیدی درس اشتباه است')
    if (student.majorID !== lesson.majorID) {
      return new BadRequestException('درس برای رشته دیگری ارائه شده است')
    }

    const response = await this.prisma.pickedLesson.create({
      data: {
        student: {
          connect: { id: student.id }
        },
        lesson: {
          connect: { id: body.lessonID }
        }
      }
    })
    return response
  }

  /**
   * برای دریافت لیست دانشجویان کل سیستم توسط ادمین‌ها طراحی شده
   * 
   * منطقیست که ادمین به تمامی اطلاعات کاربر دسترسی دارد
   */
  async getStudentsList(body: StudentsAdminList) {
    if (!body.notInLesson) {
      const students = await this.prisma.student.findMany({
        include: {
          user: true
        },
      })
      return students
    }

    const lesson = await this.prisma.lesson.findUnique({
      where: {
        id: body.notInLesson
      },
      include: {
        major: true
      }
    })
    if (!lesson) return new BadRequestException('آیدی درس را صحیح وارد کنید')

    // دانشجویانی را پیدا می‌کنیم که عضو این درس نیستند و به رشته‌ی تحصیلی این درس مربوط می‌شوند
    const studentsNotInLessonAndRelatedToMajor = await this.prisma.student.findMany({
      where: {
        pickedLessons: {
          none: {
            lessonID: body.notInLesson,
          },
        },
        majorID: lesson.major.id
      },
      include: {
        user: true
      }
    })

    return studentsNotInLessonAndRelatedToMajor
  }
}
