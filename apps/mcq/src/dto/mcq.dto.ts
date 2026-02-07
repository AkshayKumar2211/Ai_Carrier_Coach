import { IsArray, isEnum, IsEnum, IsString } from "class-validator";

export enum QuestionType{
    NODEJS='nodejs',
    JAVASCRIPT='javascript',
    MONGODB='mongodb',
}


export enum Level{
    EASY='easy',
    MEDIUM='medium',
    HARD='hard',
}

export class mcqDto{
    @IsString()
    question:string;

    @IsArray()
    options:[];

    @IsString()
    answer:string;

    @IsEnum(QuestionType)
    type:QuestionType

    @IsEnum(Level)
    level:string;

}



export class mcqEditDto{

    @IsString()
    _Id:string;

    @IsString()
    question:string;

    @IsArray()
    options:[];

    @IsString()
    answer:string;

    @IsEnum(QuestionType)
    type:QuestionType

    @IsEnum(Level)
    level:string;

}


