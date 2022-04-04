/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';


@Injectable()
export class MessagesService {
  // The messages array here will act as a temporary database. 
  messages: any[] = [{id:"12ysq1t11u1i345",sender: "Gibbah", text:"Welcome to Gibbah", createdAt:Date.now(),starred:false }];
  
  userStorage = {}

  create(createMessageDto: CreateMessageDto, clientId:string) {
    // This essentially just pushes the message created into the backend and
    // This adds the data to the backend, but we still need to tell the client that the message was sent
    const message = {
      sender: this.userStorage[clientId],
      text: createMessageDto.text
    }
    // basically copied over the data to another variable then return the copied message data
    this.messages.push(message);
    return message;

  }

  findAll() {
    // This should be incharge of getting all the messages from the group. 
    return this.messages;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
  // This just gets the name based on the socket id.
  getClientName(clientId){
    return this.userStorage[clientId]
  }

  join(name: string, clientId:string ){
    this.userStorage[clientId] = name;
    return name;
  }
  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
