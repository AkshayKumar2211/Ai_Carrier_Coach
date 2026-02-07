import { BadRequestException, Injectable } from "@nestjs/common";
import { CompanyAggregation } from "./company.aggregation";
import { companyListDto, CreateCompanyDto, UpdateCompanyDto } from "./dto/company.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Company } from "./schema/company.schema";
import { Model } from "mongoose";


@Injectable()
export class CompanyService {
  
  constructor(private readonly companyAggregation: CompanyAggregation,
    @InjectModel(Company.name) private readonly model:Model<Company>
  ){}
  
  getHello(): string {
    return 'Hello World!';
  }


  async createCompany(dto:CreateCompanyDto)
  {
    if (!dto)
    {
      throw new BadRequestException("Companies all the details are required to register");
    }
    const { company_name, company_description, company_logo, company_website, company_email, company_phone, company_address, company_city, company_industry, company_size, company_stage, company_type } = dto;
    
    if(!company_name || !company_description || !company_logo || !company_website || !company_email || !company_phone || !company_address || !company_city || !company_industry || !company_size || !company_stage || !company_type)
    {
      throw new BadRequestException("Companies all the details are required to register");
    }

    const company:any = {  // if i remove any why it is not working at line 43 
      company_name,
      company_description,
      company_logo,
      company_website,
      company_email,
      company_phone,
      company_address,
      company_city,
      company_industry,
      company_size,
      company_stage,
      company_type
    }

    const newCompany = await this.model.create(company);
    
    if (!newCompany)
    {
      throw new Error("Creating compnay creation fialed");
    }

    return newCompany;
  }


  async companyByID(id:string) 
  {
    try {
      const pipeline:any = [];

      const match = this.companyAggregation.match(id);

      const lookup = this.companyAggregation.userLookUp();
      const projection = this.companyAggregation.projection();

      pipeline.push(lookup);
      pipeline.push(match);
      pipeline.push(projection);

      pipeline.push(match);
      pipeline.push(lookup);

      const company = await this.model.aggregate(pipeline);

      if (!company)
      {
        throw new BadRequestException("Comapny not found");
      }

      return company;

    }
    catch (error){
      console.log("error", error);
    }
  }



  async companyList(dto: companyListDto)
  {
    try {

      const { page, limit, search } = dto;

     const pages = Number(page);
      const limits = Number(limit);
      const skip = (pages - 1) * limits;
      const option = {
       limits,
        skip
      }


      const pipeline: any = [];
         
      const match = this.companyAggregation.search(search);
      const lookup = this.companyAggregation.userLookUp();
      const projection = this.companyAggregation.projection();
      const face_set = await this.companyAggregation.face_set(option);

      pipeline.push(face_set);
      pipeline.push(lookup);
      pipeline.push(match);
      pipeline.push(projection);



      const company = await this.model.aggregate(pipeline);
      
      if (!company)
      {
        throw new BadRequestException("Comapny not found");
      }

      return {
        pages,
        limits,
        data: company,
        total: company.length
        }
     }
    catch (error) {
      throw error;
      console.log("error", error);
    }
  }


  async deleteComapny(id: string)
  {
    try {
      if (!id)
      {
        throw new BadRequestException("id is required");
      }

      const company = await this.model.findByIdAndDelete(id);

      if (!company)
      {
        throw new BadRequestException("company deletion failed");
      }
    }
    catch (error)
    {
      console.log(error);
      throw error;
    }

  }


  async updateCompany(dto: UpdateCompanyDto)
  {
      try {
        if(!dto)
        {
          throw new BadRequestException("Companies all the details are required to register");
        }
        if (!dto.id)
        {
          throw new BadRequestException("id is required");
        }

        const company = await this.model.findByIdAndUpdate(dto.id,dto);
        
        if (!company)
        {
          throw new BadRequestException("Comapny not found");        
        }

        return {
          message: "Updated data",
          data: company
        }
      
      }
      catch (error)
      {
        console.log(error);
        throw error;
      }
  }

}





  

