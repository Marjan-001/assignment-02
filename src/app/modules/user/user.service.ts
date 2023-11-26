import {  TOrders, TUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData)
  
  return result
}

const getAllUserFromDB = async () => {
  const result = await User.find({}).select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  })
  return result
}

const getSingleUserFromDB = async (userId:number) => {

  if(!(await User.isUserExists(userId))){
    throw Error("USer not found")
  }
  const result = await User.findOne({userId:userId}  )
 return result
}

const updateSingleUserFromDB = async(userId:number)=>{
  if(!(await User.isUserExists(userId))){
    throw Error("USer not found")
  }
  const result = await User.updateOne({userId:userId})
  return result;
}

const deleteUserFromDB=async(userId:number)=>{
  if(!(await User.isUserExists(userId))){
    throw Error("USer not found")
  }
  const result = await User.deleteOne( { userId},{ isDeleted: { $ne: true } });
  return  result;
} 


const addOrderToDB = async(userId:number,orders:TOrders)=>{
  const addOrder = await User.findOneAndUpdate({userId},{$addToSet:{orders:orders}})
  return addOrder;
}

const getUserOrderFromDB = async(userId:number)=>{
  if(!(await User.isUserExists(userId))){
    throw Error("USer not found")
  }  
  const result =await User.findOne({userId},{_id:false,orders:true});
  return result;
}

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteUserFromDB,
  addOrderToDB,
  getUserOrderFromDB
}
