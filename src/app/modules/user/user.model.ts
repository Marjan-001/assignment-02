/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { TAddress, TFullName, TOrders, TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config/config'

const FullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const AddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
})
const OrdersSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})
const UserSchema = new Schema<TUser,UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String,required:true },
  fullName: { type: FullNameSchema, required: true, _id: false },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean,required:true },
  isDeleted: {type: Boolean,default: false},
  hobbies: { type: [String],required:true },
  address: { type: AddressSchema, required: true, _id: false },
  orders: { type: OrdersSchema },
})

// create custom static

UserSchema.statics.isUserExists=async function(userId:number){
  const existingUser= await User.findOne({userId:userId})
  return existingUser;
}



//hashing password using bcrypt
 UserSchema.pre('save',async function(next){
    const user =this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config. bcrypt_salt_rounds)
    

    )
    next();
 })
UserSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//hide password from the api response
UserSchema.methods.toJSON = function () {
  const odject = this.toObject()

  delete odject.password;

  return odject
}

UserSchema.statics.isUserExists=async(userId:number)=>{
  return await User.findOne({userId})
}
export const User = model<TUser,UserModel>('User', UserSchema)
