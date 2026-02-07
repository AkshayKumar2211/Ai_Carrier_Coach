import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, companySchema } from './schema/company.schema';
import { CompanyAggregation } from './company.aggregation';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/ai_carrier_coach")
    ,MongooseModule.forFeature([{name:Company.name,schema:companySchema}])
  ],
  controllers: [CompanyController],
  providers: [CompanyService,CompanyAggregation],
})
export class CompanyModule {}
