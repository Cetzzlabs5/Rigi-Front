// model User {
//   id              String          @id @default(uuid())
//   legalName       String
//   email           String          @unique
//   cuit            String          @unique
//   role            UserRole
//   password        String
//   isActive        Boolean         @default(false)
//   createdAt       DateTime        @default(now())
//   updatedAt       DateTime        @updatedAt
//   providers       Provider[]
//   miningCompanies MiningCompany[]
//   tokens          Token[]
// }

import z from "zod";


export const UserRole = z.enum(["ADMIN", "PROVIDER", "MINING_COMPANY"])

export const userSchema = z.object({
    id: z.string(),
    legalName: z.string(),
    email: z.string(),
    cuit: z.string(),
    role: UserRole,
    password: z.string(),
    password_confirm: z.string(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    providers: z.array(z.string()),
    miningCompanies: z.array(z.string()),
    token: z.string()
})


export type User = z.infer<typeof userSchema>
export type UserLoginForm = Pick<User, "email" | "password">
export type ForgotPasswordForm = Pick<User, "email">
export type ConfirmToken = Pick<User, "token">
export type NewPasswordForm = Pick<User, "password" | "password_confirm">

export const sessionSchema = userSchema.pick({
    id: true,
    legalName: true,
    email: true,
    role: true,
    isActive: true,
}).extend({
    hasCompletedProfile: z.boolean().optional(),
})

export type Session = z.infer<typeof sessionSchema>
