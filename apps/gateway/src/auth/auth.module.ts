import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports:[CacheModule.register(),JwtModule.register({
        global:true,
        secret:"bsbabjasbfjabsjbsjdblsbfjasbjasf",
        signOptions:{ expiresIn: '5m' },
    })],
    providers:[],
})

export class AuthModule {}