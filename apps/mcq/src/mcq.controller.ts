import { Controller, Get } from '@nestjs/common';
import { McqService } from './mcq.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { mcqDto } from './dto/mcq.dto';

@Controller()
export class McqController {
  constructor(private readonly mcqService: McqService) {}

 @MessagePattern('mcq.create')
 async create(@Payload() payload:mcqDto)
 {
  return await this.mcqService.create(payload);
 }
}
