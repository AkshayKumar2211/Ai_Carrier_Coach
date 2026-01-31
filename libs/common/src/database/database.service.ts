import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseService {
    constructor(@InjectModel(User.name) public user:Model<User>){}
}
