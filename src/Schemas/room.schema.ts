/* eslint-disable prettier/prettier */
import mongoose from "mongoose";
// import { MessagesInterface } from "src/messages/messages.interface";
import { MessageSchema, MessagesInterface } from "./message.schema";
import { UserInterface, UserSchema } from "./user.schema";

export const RoomSchema = new mongoose.Schema({
    name: {type:String, required:true},
    participants: {type:[UserSchema]},
    dateCreated: {type:Date, default: new Date()},
    messages: [MessageSchema],
    savedMessages:[MessageSchema],
    chatType:{type:String}
});

export interface RoomInterface {
    _id: string;
    participants: UserInterface[];
    dateCreated: Date;
    messages: MessagesInterface[];
    savedMessages:MessagesInterface[];
    chatType: string;
}