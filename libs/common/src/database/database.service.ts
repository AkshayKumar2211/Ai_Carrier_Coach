import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user/user.schema';
import { Model } from 'mongoose';
import { Mcq } from '../schemas/mcq/mcq.schema';
import { publicDecrypt } from 'crypto';

@Injectable()
export class DatabaseService {
    constructor(@InjectModel(User.name) public user:Model<User>,
   @InjectModel(Mcq.name) public mcq:Model<Mcq>){}
}
