import { z } from 'zod'

const FullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2)
    .max(20),
    
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
  email: z.string().email(),
  isActive: z.boolean().default(true),
  isDeleted: z.boolean().optional().default(false),
  hobbies: z.string().array(),
  address: AddressValidationSchema,
  orders: z.array(OrdersValidationSchema).optional(),
})

export {
  FullNameValidationSchema,
  AddressValidationSchema,
  OrdersValidationSchema,
  UserValidationSchema,
}
