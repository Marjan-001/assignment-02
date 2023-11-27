
import {  TOrders, TUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData)
  
  return result
}

const getAllUserFromDB = async () => {
  const result = await User.find().select({"hobbies":0, "isActive":0,"userId":0,"_id":0})
  return result;
}

const getSingleUserFromDB = async (userId:number) => {

 
  const result = await User.findOne({userId:userId}  )
 return result
}

const updateSingleUserFromDB = async(userId:number)=>{
 
  const result = await User.updateOne({userId:userId})
  return result;
}

const deleteUserFromDB=async(userId:number)=>{
 
  const result = await User.deleteOne( { userId},{ isDeleted: { $ne: true } });
  return  result;
} 


const addOrderToDB = async(userId:number,orders:TOrders)=>{
  const addOrder = await User.findOneAndUpdate({userId},{$addToSet:{orders:orders}})
  return addOrder;
}

const getUserOrderFromDB = async(userId:number)=>{
 
  const result =await User.findOne({userId},{_id:false,orders:true});
  return result?.orders;
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
