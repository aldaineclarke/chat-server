/* eslint-disable prettier/prettier */
import {Document} from "mongoose"

export interface UserInterface extends Document {
    name:string;
    password: string
    email: string;
    profileImg:string;
}