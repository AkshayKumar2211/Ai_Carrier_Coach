import { BadRequestException, Injectable } from '@nestjs/common';
import { JobDto } from './dto/job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './schema/job.schema';
import { Model } from 'mongoose';


@Injectable()
export class JobService {

  constructor(@InjectModel(Job.name) private readonly model:Model<Job>){}
  getHello(): string {
    return 'Hello World!';
  }


  async createJob(dto:JobDto)
  {
    try { 
      if (!dto)
      {
        throw new BadRequestException("for job posting all the details are required to register");
      }

      const job: any = {
        company_id: dto.company_id,
        title: dto.title,
        description: dto.description,
        company: dto.company,
        location: dto.location,
        job_type: dto.job_type,
        experience: dto.experience,
        experience_in_years: dto.experience_in_years,
        experience_in_months: dto.experience_in_months,
        salary: dto.salary,
        deadline: dto.deadline,
        skills: dto.skills,
        languages: dto.languages
      };

      const jobPost = await this.model.create(job);
      if(!jobPost)
      {
        throw new BadRequestException("unable to create job");
      }
      
      return {
        message: "Job posting created successfully now post it",
        data: jobPost
      }

    }
    catch (error) {

      console.log(error)
      throw error;
    }
  }


  async jobList() {
    try {
      
    }
    catch (error)
    {

    }
  }

}
