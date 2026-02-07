import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../enums/user.enum";

@Schema({timestamps:true})
export class User extends Document{
     

  @Prop({ type: String, default: null })
  name: string;

  @Prop({ type: String, default: null ,index:true})
  email: string;

  @Prop({type:String,default:null})
  password:string;

  @Prop({
  type: String,
  enum: ["ACTIVE", "BLOCKED", "DELETED"],
  default: "ACTIVE",
  index: true,
})
status: string;


  @Prop({ type: String, default: null })
  country_code: string;

  @Prop({ type: String, default: null })
  phone: string;

  @Prop({ type: String, default: null })
  image: string;

  @Prop({ type: String, default: null })
  block_reason: string;


  @Prop({ type: Boolean, default: false })
  is_email_verify: boolean;

  @Prop({ type: Boolean, default: false })
  is_phone_verify: boolean;

 @Prop({ type: Number, default: 0, min: 0 })
wallet_balance: number;


  @Prop({ type: String, default: "english" })
  preferred_language: string;

  @Prop({ type: String, default: "$" })
  currency_symbol: string;

  @Prop({ default: 0 })
  ratings: number;

  @Prop({ default: null })
  socket_id: string;

  @Prop({type:String,default:null})
  refresh_token:string;


  @Prop({type:String,enum:Role,default:Role.USER})
  role:string

}



export const UserSchema=SchemaFactory.createForClass(User);