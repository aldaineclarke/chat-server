/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { catchError, EMPTY, from, Observable, of } from 'rxjs';
import { Model } from 'mongoose'
import * as bcrypt from "bcrypt" 
import { AuthService } from 'src/auth/auth.service';
import { UserInterface } from 'src/Schemas/user.schema';
// import { UserDocument } from 'src/Schemas/user.schema';

@Injectable()
export class UserService {
    
    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface> ){}

    // TODO: Improve - not sure what the datatype of the observable will be.
    /**
     * @description This method will be used to create a new document into the database.
     * @param {UserInterface} user - A model of the data to save 
     * @returns {Observable<UserInterface>} The return value will be the document that was created.
     */
    createUser(user: UserInterface): Observable<UserInterface>{
        console.log(user)
        // hash the password then save it to the database.
        user.password = bcrypt.hashSync(user.password,10);
        user.email = user.email.toLowerCase()
        const createdUser =  new this.userModel(user);

        return from(createdUser.save()).pipe(
            catchError((error) => {throw new Error(error)})
        );
    }



    /**
     * @description Queries the database for a user with the username provided.
     * @param {string} username  username of the user.
     * 
     * @returns {Observable<UserInterface>}  user document if it is found in the database. 
     * @returns {Observable<number>}  returns zero if not found
     */
    findOne(email: string):Observable<UserInterface> | null{
        const  user = from(this.userModel.findOne({email: email.toLowerCase()}).exec());
        return (user) ? user : null;
    }
    async findOnePromise(email: string){
        const  user = await this.userModel.findOne({email: email.toLowerCase()}).exec();
        return (user) ? user : null;
    }
    compareHashed(unhashed, hashed){
        console.log(bcrypt.compareSync(hashed, unhashed))
        return bcrypt.compareSync(hashed, unhashed)
    }
    findById(id: string): Observable<UserInterface>{
        const user = from(this.userModel.findById(id))
        return user;    
    }
    async findByIdPromise(id: string){
        const user = await this.userModel.findById(id);
        return user;
    }
    



}
