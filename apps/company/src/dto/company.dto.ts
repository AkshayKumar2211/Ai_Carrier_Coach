import { IsEnum, IsMongoId, IsOptional, IsString } from "class-validator";


export enum companyIndustry {
    SOFTWARE = "software",
    HARDWARE = "hardware",
    SERVICE = "service",
    IT = "it",
    ECOMMERCE = "ecommerce",
    SALESANDMARKETING = "salesandmarketing"
}

export enum companySize{
    SMALL="small",
    MEDIUM="medium",
    LARGE="large"
}

export enum companyStage{
    STARTUP="startup",
    GROWING="growing",
    MATURE="mature"
}

export enum companyType{
    PRIVATE="private",
    PUBLIC="public"
}





export class CreateCompanyDto {

    @IsMongoId()
    user_id: string

    @IsString()
    company_name: string

    @IsString()
    company_description: string

    @IsString()
    company_logo: string

    @IsString()
    company_website: string

    @IsString()
    company_email: string;

    @IsString()
    company_phone: string;

    @IsString()
    company_address: string;

    @IsString()
    company_city: string;

    @IsEnum(companyIndustry)
    company_industry: string;

    @IsEnum(companySize)
    company_size: string;

    @IsEnum(companyStage)
    company_stage: string;

    @IsEnum(companyType)
    company_type: string;

}


export class companyListDto{
    @IsString()
    page: string;

    @IsString()
    limit: string;
    
    @IsString()
    @IsOptional()
    search: string;

    @IsEnum(companyIndustry)
    company_industry: string;

    @IsEnum(companySize)
    company_size: string;

    @IsEnum(companyStage)
    company_stage: string;

    @IsEnum(companyType)
    company_type: string;


}


export class UpdateCompanyDto {

    @IsMongoId()
    id: string

    @IsString()
    company_name: string

    @IsString()
    company_description: string

    @IsString()
    company_logo: string

    @IsString()
    company_website: string

    @IsString()
    company_email: string;

    @IsString()
    company_phone: string;

    @IsString()
    company_address: string;

    @IsString()
    company_city: string;

    @IsEnum(companyIndustry)
    company_industry: string;

    @IsEnum(companySize)
    company_size: string;

    @IsEnum(companyStage)
    company_stage: string;

    @IsEnum(companyType)
    company_type: string;

}  

