import { IsString } from "class-validator";

export enum LoginType{
    INIT="iniat",
    SUCCED="succed",
    COMPLETED="complete"
}

export enum TokenType{
    ACCESS='access',
    
}

export class CreateDto{

    @IsString()
    email:string;

    @IsString()
    password:string;

}


export class passwordDto{
    @IsString()
    email:string;

    @IsString()
    password:string;
}