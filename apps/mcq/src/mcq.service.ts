import { BadRequestException, Injectable } from '@nestjs/common';
import { mcqDto, mcqEditDto } from './dto/mcq.dto';
import { DatabaseService } from '@app/common/database';

@Injectable()
export class McqService {

constructor(private readonly model:DatabaseService){}

  getHello(): string {
    return 'Hello World!';
  }


  async create(dto:mcqDto)
  {
    try{

      const {question ,options ,answer,type,level}=dto;

      if(!question || !options || !answer || !type || !level)
      {
        throw new BadRequestException("All the fields are required");
      }

      const mcq= await this.model.mcq.create(dto);

      if(!mcq)
      {
        throw new BadRequestException("error will creating a question");
      }


      return "Question creared successfully";

    }
    catch(error)
    {
      console.log(error);
      throw Error;  
    }
  
  }

  async deletequestion(id:string)
  {
    if(!id)
    {
      throw new BadRequestException("Id is required ....");
    }

    const mcq=await this.model.mcq.deleteOne({_id:id});

    if(!mcq)
    {
      throw new BadRequestException("Deletion of the module failed please try again");
    }

    return "Question deleted successfully..";

  }



  // async edit(dto:mcqEditDto)
  // {
  //       const{}    
  // }


}
