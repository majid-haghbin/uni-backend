import { Injectable } from '@nestjs/common'
import { PrismaService } from './database/prisma.service'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  myResponse(response: any) {
    return {
      data: response,
      status: 'success'
    }
  }
}
