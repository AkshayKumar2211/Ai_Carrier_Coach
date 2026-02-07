import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Mongoose, Types } from "mongoose";
import { job_type } from "./job.enum";


@Schema({ timestamps: true })
export class Job extends Document{

    @Prop({
        type: Types.ObjectId,
        ref: 'Company',
        default: null,
    })
    company_id: Types.ObjectId;

    @Prop({ type: String, required: true })
    title: string;
    
    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: String, required: true })
    company: string;

    @Prop({ type: String, required: true })
    location: string;

    @Prop({ type: String,enum:job_type, required: true })  
    job_type: string;

    @Prop({ type: String, required: true })
    experience: string;

    @Prop({ type: String, required: true })
    salary: string;

    @Prop({ type: String, required: true })
    deadline: string;

    @Prop({type:String,required:true})
    experience_in_years: string;

    @Prop({type:String,required:true})
    experience_in_months: string;

    @Prop({type:Array,required:true})
    skills: string[];

    @Prop({type:Array,required:true})
    languages: string[];

    @Prop({type:Array,required:true})
    job_function: string[];

    @Prop({type:Array,required:true})
    job_industry: string[];

    @Prop({type:Array,required:true})
    job_role: string[];

}


export const JobSchema = SchemaFactory.createForClass(Job);