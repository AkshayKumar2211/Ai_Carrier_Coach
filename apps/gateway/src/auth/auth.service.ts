// ## Auth Service

// The User Service handles all user-related operations such as:
// - User creation and login with email and password
// -Generate and cache otp 
// - Generate access token and refresh token for login completion



import { DatabaseService } from "@app/common/database";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateDto, LoginType, passwordDto } from "./dto/user.dto";
import * as bcrypt from 'bcrypt' 
import { JwtService } from "@nestjs/jwt";
import { CACHE_MANAGER ,Cache} from "@nestjs/cache-manager";
import { ContextIdFactory } from "@nestjs/core";


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

        const existUser=await this.model.user.findOne({email}).select("+email +password +status +role");

        let payload;
        let token;
        let otp=this.genertaOtp(email);
       
      


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
                role:existUser.role
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
                role:newUser.role
            }

             token=await this .jwtService.signAsync(payload);

        }

        return {
            token,
            message:"Login init please wait for otp and fill the otp...."
        }
        }



        //## function to generate otp and call the function  from common services to send otp to email address....

        async genertaOtp (email:string)
        {
                let otp=Math.floor(1000+Math.random()*9000);

                // call function to send otp to email or phone number will be here
                  // to cache the otp for faste retrieval ......
               await this.cacheManager.set( `otp${email}` , otp, 50000);
                
                return String(otp);
        }

        
        
        
        //## function to generate access_token and refreshToken and otp confirmation ......

        async generateAccessTokenAndRefreshToke(ottp:string,token:string)
        {

            if(!token  || !ottp)
            {
                throw new Error("Otp and token is required....");
            }



            const payload=await this.jwtService.verifyAsync(token);
            const otp=await this.cacheManager.get(`otp${payload.email}`);
            if(!otp)
            {
                throw new BadRequestException("Otp is not in storage")
            }

            if(ottp!=otp)
            {
                throw new Error("Otp does not match provide a corrected otp")
            }

            const match=ottp===otp?true:false;

            if(!match)
            {
                throw new BadRequestException("Otp is expire create a new otp");
            }

             await this.cacheManager.del(`otp${payload.email}`);  // after fetching the otp from cache del it .......   
      
          const user=await this.model.user.findOne({email:payload.email}).select("+email +password +status +role");

          if(!user)
          {
            throw new Error("Error while fetching detail of the user");
          }

          const newPayload={
            email:user.email,
            status:user.status,
            LoginType:LoginType.COMPLETED,
            role:user.role,
            Type:"access"
          }

          const access_token= await this.jwtService.signAsync(newPayload);
          
          newPayload.Type="refresh";

          const refreshToken=await this.jwtService.signAsync(newPayload);

          user.refresh_token=refreshToken;
          user.save();


          return{
            token:access_token,
            message:"Login successfully"
          }


        }


        /*
        * Refresh token function to provide a new access token
        */

        async refreshToken(token:string)
        {
            if(!token)
            {
                throw new Error("refresh token is required for this ....");
            }

            const user=await this.jwtService.verifyAsync(token);

            const existUser=await this.model.user.findOne({email:user.email}).select("+email +password +status +role");

            if(!existUser || !existUser.status ) 
            {
                throw new Error("User with this token has been deleted")
            }

            
        const newPayload={
            email:user.email,
            status:user.status,
            LoginType:LoginType.COMPLETED,
            role:user.role,
            Type:"access"
          }

          const access_token=await this.jwtService.signAsync(newPayload);

             return{
            token:access_token,
            message:"Login successfully"
          }       
        }

        // async changePassword(dto:passwordDto)
        // {
        //      const {email,password}=dto;

        //      if(!email || !password)
        //      {
        //         throw new BadRequestException("Emails and password both are required");
        //      }

        //      const user=await this.model.user.findOne({email}).select("+password +email");

        //       if(!user)
        //       {
        //         throw new BadRequestException("User with this email does not exist in the database provide a valid emnail");
        //       }



        // }


}