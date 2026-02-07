import {
    IsArray,
    IsEnum,
    IsMongoId,
    IsString,
    IsNumber,
    IsDateString
} from "class-validator";

export enum JobType {
    FULLTIME = "fulltime",
    PARTTIME = "parttime",
    FREELANCE = "freelance"
}

export class JobDto {

    @IsMongoId()
    company_id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    company: string;

    @IsString()
    location: string;

    @IsEnum(JobType)
    job_type: JobType;

    @IsString()
    experience: string;

    @IsNumber()
    experience_in_years: number;

    @IsNumber()
    experience_in_months: number;

    @IsNumber()
    salary: number;

    @IsDateString()
    deadline: string;

    @IsArray()
    @IsString({ each: true })
    skills: string[];

    @IsArray()
    @IsString({ each: true })
    languages: string[];

    @IsArray()
    @IsString({ each: true })
    job_function: string[];

    @IsArray()
    @IsString({ each: true })
    job_industry: string[];

    @IsArray()
    @IsString({ each: true })
    job_role: string[];
}


export class jobListDto{

    @IsString()
    page: string;

    @IsString()
    limit: string;

    @IsString()
    search: string;

    @IsString()
    sort: string;

    @IsString()
    filter: string;
  
}
