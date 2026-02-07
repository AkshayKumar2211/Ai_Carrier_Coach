import { Module } from '@nestjs/common';
import { McqController } from './mcq.controller';
import { McqService } from './mcq.service';

@Module({
  imports: [],
  controllers: [McqController],
  providers: [McqService],
})
export class McqModule {}
