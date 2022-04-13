/* eslint-disable prettier/prettier */
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import {Server, Socket} from "socket.io";
import { MessagesInterface } from 'src/Schemas/message.schema';
import { MessagesService } from './messages.service';
 


// Similar to a controller
@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class MessagesGateway {

  // This will be used as a proxy for the socket.io server directly
  @WebSocketServer() server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  // Needed to create message. should only be given to persons of a group.
  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: MessagesInterface, @ConnectedSocket() client: Socket) {
    // This will be either a promise or an observable since the value may not be availble when we request it.
    const message = this.messagesService.create(createMessageDto, client.id);

    // Emits an event called message whenever a message is created followed by  returning some data
    this.server.emit("message",message);

    return message;
  }

  // Need to find all the messages for the group that you join. 
  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  // Future use of this event is in case you wish to search through the the messages
  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }

  // Deleting messages should be left to the admin or the person who wrote the message
  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }

  @SubscribeMessage('join')
  // MessageBody has access to the payload that is sent whenever the event is fired from the websocket. you can pass in the particular property you wish to receive.
  joinChat(@MessageBody('name') name: string, @ConnectedSocket() client: Socket){
    // Each ConnectedSocket has an id which can be used to identify the client.
    // Should have a message sent the members of the group.
    return this.messagesService.join(name, client.id);
  }

  @SubscribeMessage('typing')
  typingCheck(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket){
    // Tells the recipient that the client is typing 
    // We will check for the isTyping data from the payload, if its true, then we need to get the client name then broadcast to the members of the group that the user is typing.
    const name = this.messagesService.getClientName(client.id);
    client.broadcast.emit("typing", {name, isTyping })
  }
}
