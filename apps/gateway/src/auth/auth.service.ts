// ## Auth Service

// The User Service handles all user-related operations such as:
// - User creation and login with email and password



import { DatabaseService } from "@app/common/database";
import { Inject, Injectable } from "@nestjs/common";
import { CreateDto, LoginType } from "./dto/user.dto";
import * as bcrypt from 'bcrypt' 
import { JwtService } from "@nestjs/jwt";
import { CACHE_MANAGER ,Cache} from "@nestjs/cache-manager";


@Injectable()
export class AuthService
{
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,private readonly model:DatabaseService,private readonly jwtService:JwtService ){}


    //## Create and Loginfunction
    //-- Used to login initialised if customer is exist 
    //-- If not create a new customer and initialed login
    //-- In this function bcrypt is used to hashpassword and jwt is used to create access and referesh token and also cache the otp....
    async createAndLoginUser(dto:CreateDto)
    {
        const{email,password}=dto;

        if(!email || !password)
        {
            throw new Error("email and password both are required");
        }

        const existUser=await this.model.user.findOne({email});

        let payload;
        let token;
        let otp=this.genertaOtp(email);
       
        // to cache the otp for faste retrieval ......
        await this.cacheManager.set( "OTP" , otp, 50000);


        if(existUser)
        {
         if(existUser.status==="Blocker" || existUser.status==="Deleted")
            {
                throw new Error("User have been blocked or is deleted");
            }
            
            const match= await bcrypt.compare(password,existUser.password);

            if(!match)
            {
                throw new Error("Please provide correct password");
            }

             payload={
                email:existUser.email,
                status:existUser.status,
                LoginType:LoginType.INIT,
                message:"login process has been started "
            }

            token=await this .jwtService.signAsync(payload);


        }
        else
        {

            const hashPassword=await bcrypt.hashSync(password,10);

            const newUser=await this.model.user.create({
                email:email,
                password:hashPassword
            });

            if(!newUser)
            {
                throw new Error("User creation failed due to a particular issue please try again");
            }

            payload={
                email,
                status:newUser.status,
                LoginType:LoginType.INIT,
                message:"login process has been started "

            }

        }
}

        genertaOtp (email:string):string
        {
                let otp=Math.floor(1000+Math.random()*9000);

                // call function to send otp to email or phone number will be here
                
                return String(otp);
        }

}