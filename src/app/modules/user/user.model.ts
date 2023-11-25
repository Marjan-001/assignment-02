import {  Schema,model } from "mongoose";
import { TAddress, TFullName, TOrders, TUser } from "./user.interface";



const FullNameSchema = new Schema<TFullName>({

firstName:{
    type:String,
    required:true,
},
lastName:{
    type:String,
    required:true,
}
})

const AddressSchema= new Schema<TAddress>({
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true, 
    }
})
const OrdersSchema = new Schema <TOrders>({
    productName: String,
    price: Number,
    quantity: Number  
})
const UserSchema = new Schema<TUser>({
    userId:{type:Number, required:true,unique:true},
    username: {type:String, required:true},
    password: {type:String},
    fullName: {type:FullNameSchema,required:true,_id:false},
    age: {type:Number},
    email: {type:String,required:true,unique:true},
   isActive:{type:Boolean},
   hobbies:{type:[String]},
   address:{type:AddressSchema,required:true,_id:false},
   orders:{type:OrdersSchema}
})

//hide password from the api response
UserSchema.methods.toJSON = function() {
    const odject = this.toObject();
  
    delete odject.password;
    return odject;
   }
export const User = model<TUser>('User',UserSchema)