/* eslint-disable prettier/prettier */
    import { Injectable, NotFoundException } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { catchError, EMPTY, from, Observable, of } from 'rxjs';
    import { Model } from 'mongoose'
    import * as bcrypt from "bcrypt" 
    import { AuthService } from 'src/auth/auth.service';
    import { UserInterface } from 'src/Schemas/user.schema';
    import { RoomInterface } from 'src/Schemas/room.schema';
import { UserService } from 'src/users/users.service';
    // import { UserDocument } from 'src/Schemas/user.schema';
    
    @Injectable()// This is possibly for the conversation service, but
    export class RoomsService{
        constructor(@InjectModel('Room') private readonly roomModel: Model<RoomInterface>, private userService: UserService){}
    
        getConversationById(id: string){
            const conversation = from(this.roomModel.findById({_id: id}).exec());
            return conversation;
        }
        getAllUserConversations(userId: string){
            const conversations = from(this.roomModel.find((room:RoomInterface)=>{
                room.participants.find((user:UserInterface)=> user._id == userId)
            }).exec());
            return conversations; 
        }
        async createConversation(userId: string, data:RoomInterface){

            data.participants.push(await this.userService.findByIdPromise(userId));

            const conversation = new this.roomModel(data).save();
            return conversation;
        }
        
        /**
         * This allows the user to add participants to a group or conversation.
         * @param {string} conversationId room Id for the chat
         * @param {string} participantId participant id to add.
         * @return {Promise} returns a promise object of the conversation from the DB
         */
        addParticipant(conversationId:string, participantId:string){
            return this.roomModel.findById(conversationId).then(async (data)=>{
                data.participants.push( await this.userService.findByIdPromise(participantId))
            })
         
        }
        
    }