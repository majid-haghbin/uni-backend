import { User } from "@prisma/client"

interface RequestWithUser extends Request {
  user: User
}