import { Model } from "mongoose";

export type TFullName={
    firstName:string;
    lastName:string;
}
export type TAddress={
    street:string;
    city:string;
    country:string;
}
export type THobbies= string[];
export type TOrders ={
    productName: string,
    price: number,
    quantity: number
}


export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive:boolean;
  isDeleted?:boolean;
  hobbies: THobbies;
  address:TAddress;
  orders?:TOrders[];
}

//create static

export interface UserModel  extends Model<TUser>{
    // eslint-disable-next-line no-unused-vars
    isUserExists(id:number):Promise<TUser|null> 
   }
