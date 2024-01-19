import { Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { PrismaService } from 'src/database/prisma.service'
import { CreateAdminDTO } from 'src/users/dto/createUser.dto'

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}

  async createAdmin(user: CreateAdminDTO) {
    try {
      const result = await this.prisma.user.create({
        data: {
          name: user.name,
          family: user.family,
          email:  user.email,
          mobile: user.mobile,
          fatherName: user.fatherName,
          role: 'superAdmin',
          admin: {
            create: {}
          },
        }
      })

      return result
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        /** @todo باید این قسمت اصلاح شود. شاید با کوئری دیگری اصلا نیاز به این نوع مدیریت خطا نباشد */
        console.log('error', err)
      }
      return err
    }
  }
}
