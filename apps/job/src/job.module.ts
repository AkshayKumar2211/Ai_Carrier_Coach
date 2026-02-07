import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './schema/job.schema';

@Module({
  imports: [ MongooseModule.forRoot("mongodb://localhost:27017/ai_carrier_coach")
      ,MongooseModule.forFeature([{name:Job.name,schema:JobSchema}])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
