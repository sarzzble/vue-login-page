import * as z from 'zod'

const loginSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email format',
    ),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export default loginSchema
