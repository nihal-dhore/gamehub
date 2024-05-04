import zod from "zod";

export const UserSchema = zod.object({
  username: zod.string().min(3, { message: "Username must be at least 3 characters long" }).max(40, { message: "Username must be at most 40 characters long" }).optional(),
  bio: zod.string().optional(),
})

export type User = zod.infer<typeof UserSchema>;