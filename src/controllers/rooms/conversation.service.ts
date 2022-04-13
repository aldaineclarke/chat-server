    /* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { catchError, EMPTY, from, Observable, of } from 'rxjs';
import { Model } from 'mongoose'
import * as bcrypt from "bcrypt" 
import { AuthService } from 'src/auth/auth.service';
import { UserInterface } from 'src/Schemas/user.schema';
import { RoomInterface } from 'src/Schemas/room.schema';
// import { UserDocument } from 'src/Schemas/user.schema';

@Injectable()// This is possibly for the conversation service, but
export class ConversationService{
    constructor(@InjectModel('Room') private readonly roomModel: Model<RoomInterface>){}

    getConversationById(id: string){
        const conversation = this.roomModel.findOne({_id: id})
    }
    // getAllUserConversations(userId: string){
    //     // const conversations = from(this.roomModel.find({participants:{$all:[]}}).$where({participants: $a });
    //     return conversations; 
    // }
    // async getAllUserConversations(userId: string){
    //     const conversations = from( await this.roomModel.find((room:RoomInterface)=>{
    //         room.participants.find((user:UserInterface)=> user._id == userId)
    //     }));
    //     return conversations; 
    // }
    
}