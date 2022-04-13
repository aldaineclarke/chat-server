/* eslint-disable prettier/prettier */
// import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import mongoose from "mongoose";
import { Document } from "mongoose";
import { UserInterface } from "./user.schema";
// import { UserSchema } from "./user.schema";


// export type MessageDocument = Message & Document

// @Schema()
// export class Message{
//     @Prop( {type: mongoose.Schema.Types.ObjectId, ref: "User"})
//     sender: typeof UserSchema;

//     @Prop({required: true})
//     text: string;
    
//     @Prop({default:Date.now(),required: true, type:Date})
//     createdAt: Date;

//     @Prop({default: false})
//     starred: boolean;

//     @Prop({type: mongoose.Schema.Types.ObjectId, ref:"Message"})
//     repliedTo: string;

// }
// export const MessageSchema = SchemaFactory.createForClass(Message)
export const MessageSchema = new mongoose.Schema({
    sender: {type:mongoose.Schema.Types.ObjectId, ref: "User" , required: true},
    data: {type: String, required: true},
    recipientId: {type:mongoose.Schema.Types.ObjectId, ref:"Contact", required:true},
    dateCreated: {type:Date, default: new Date()},
    repliedTo:{type:mongoose.Schema.Types.ObjectId, ref:"Message"},
    roomId:{type:mongoose.Schema.Types.ObjectId, ref: "Conversation"}
    // contacts: {type: [Contact]}
    // conversations: {type:[Conversation]}
});

export interface MessagesInterface extends Document {
    sender: UserInterface;
    text: string;
    createdAt: Date;
    starred: boolean;
    repliedTo: string;
    conversation: string;
  }