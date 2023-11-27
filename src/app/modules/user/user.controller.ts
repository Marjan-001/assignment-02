import { Request, Response } from 'express'
import { UserServices } from './user.service'
import { OrdersValidationSchema, UserValidationSchema } from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body
    const ZodValidateData = UserValidationSchema.parse(userData)
    console.log(ZodValidateData)
    const result = await UserServices.createUserIntoDB(ZodValidateData)


    res.status(200).json({
      success: true,
      message: 'User is created succesfully',
      data: result,
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err:any) {
    console.log(err)
    res.status(404).json({
      success: false,
      message: err.message,
     
      error: {
        code:404,
        des:err.message},
    })
  }
}
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB()

    res.status(200).json({
      success: true,
      message: ' users fetched succesfully',
      data: result,
    })
  } catch (err:any) {
    res.status(404).json({
      success: false,
      message: 'user not found',
      error: err.message,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.userId, 10)

    const result = await UserServices.getSingleUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: ' user fetched succesfully',
      data: result,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.userId, 10)

    const result = await UserServices.updateSingleUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: ' user updated succesfully',
      data: result,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.userId, 10)

    const result = await UserServices.deleteUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: ' user deleted succesfully',
      data: result,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const createOrder = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId)
    const orderData = req.body
    const validateOrder = OrdersValidationSchema.parse(orderData)
    const addOrder = await UserServices.addOrderToDB(userId, validateOrder)

    if (addOrder) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      })
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const getUserOrder = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId)

    const result = await UserServices.getUserOrderFromDB(userId)

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  createOrder,
  getUserOrder,
}
