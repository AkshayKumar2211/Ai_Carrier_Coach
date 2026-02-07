import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { companyIndustry, companySize, companyStage, companyType } from "./company.enum";

@Schema({ timestamps: true })
export class Company extends Document 
{
    @Prop({type:Types.ObjectId,required:true})
    user_id: string;
    
    @Prop({type:String,required:true})
    company_name: string
    
    @Prop({type:String,required:true})
    company_description: string

    @Prop({type:String,required:true})
    company_logo: string

    @Prop({type:String,required:true})
    company_website: string

    @Prop({type:String,required:true})
    company_email: string
 
   @Prop({type:String,required:true})
   company_phone: string
    
    @Prop({type:String,required:true})
    company_address: string

    @Prop({type:String,required:true})
    company_city: string

    @Prop({type:String,enum:companyIndustry,required:true})
    company_industry: string

    @Prop({type:String,enum:companySize,required:true})
    company_size: string

    @Prop({ type: String, enum: companyStage, required: true })
    company_stage: string

    @Prop({ type: String, enum: companyType, required: true })
    company_type: string

}


export const companySchema = SchemaFactory.createForClass(Company);