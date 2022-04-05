/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { catchError, EMPTY, from, Observable, of } from 'rxjs';
import { UserInterface } from 'src/users/users.interface';
import { Model } from 'mongoose'
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
    findOne(username: string):Observable<UserInterface> | null{
        const  user = from(this.userModel.findOne({name: username}).exec());
        return (user) ? user : null;
    }
    async findOnePromise(username: string){
        const  user = await this.userModel.findOne({name: username}).exec();
        return (user) ? user : null;
    }

}
