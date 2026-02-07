import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Level, QuestionType } from "./mcq.enum";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class Mcq extends Document{
    @Prop({type:String,required:true})
    question:string;

    @Prop({type:Array,required:true})
    options:[];

    @Prop({type:String,required:true})
    answer:string;

    @Prop({type:String,enum:QuestionType,required:true})
    type:QuestionType;

    @Prop({type:String,enum:Level,required:true})
    level:string;

}


export const McqSchema=SchemaFactory.createForClass(Mcq);