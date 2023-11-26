import { z } from 'zod'

const FullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  lastName: z.string(),
})

const AddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
})

const OrdersValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
})

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().max(20),
  fullName: FullNameValidationSchema,
  age: z.number(),
  email: z.string(),
  isActive: z.boolean().default(true),
  isDeleted: z.boolean().optional().default(false),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: OrdersValidationSchema.optional(),
})

export {
  FullNameValidationSchema,
  AddressValidationSchema,
  OrdersValidationSchema,
  UserValidationSchema,
}
