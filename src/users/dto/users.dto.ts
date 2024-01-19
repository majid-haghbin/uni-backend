export const roles = ['superAdmin', 'admin', 'student', 'professor']
export type Role = typeof roles[number]

export enum Roles {
  superAdmin = 1,
  admin,
  student,
  professor
}
