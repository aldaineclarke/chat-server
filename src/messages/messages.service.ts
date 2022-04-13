/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessageSchema } from 'src/Schemas/message.schema';
import { Model } from "mongoose"
import { MessagesInterface } from 'src/Schemas/message.schema';
import { Observable, of } from 'rxjs';

@Injectable()
export class MessagesService {
  // The messages array here will act as a temporary database. 

  constructor(@InjectModel('Message') private messageModel: Model<MessagesInterface> ){

  }

  create(createMessageDto: MessagesInterface, clientId:string){
    // This essentially just pushes the message created into the backend and
    // This adds the data to the backend, but we still need to tell the client that the message was sent
    // const message = {
    //   sender: this.userStorage[clientId],
    //   text: createMessageDto.text
    // }
    // basically copied over the data to another variable then return the copied message data
    const createdMessage = new this.messageModel(createMessageDto);

    createdMessage.save();

    return createdMessage;

  }

  findAll() {
    // This should be incharge of getting all the messages from the group. 
    // return this.messages;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
  // This just gets the name based on the socket id.
  getClientName(clientId){
    // return this.userStorage[clientId]
  }

  join(name: string, clientId:string ){
    // this.userStorage[clientId] = name;
    return name;
  }
  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
