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
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    providers: z.array(z.string()),
    miningCompanies: z.array(z.string()),
    tokens: z.array(z.string())
})

export type User = z.infer<typeof userSchema>
export type UserLoginForm = Pick<User, "email" | "password">