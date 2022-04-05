/* eslint-disable prettier/prettier */
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import mongoose from "mongoose";
import { Document } from "mongoose";
// export type UserDocument = User & Document

// @Schema()
// export class User{

//     @Prop({required: true})
//     name:string;

//     @Prop({required: true})
//     password: string

//     @Prop({required:true})
//     email: string;

//     @Prop()
//     profileImg:string;


// }

// export const UserSchema = SchemaFactory.createForClass(User)
export const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profile: {type:String, default: "/assets/IMG/defaultProfile.png"}
})
