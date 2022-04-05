/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
// import { EMPTY, from, map, Observable, of } from 'rxjs';
// import { LoginService } from 'src/login/login.service';
import { UserInterface } from 'src/users/users.interface';
// import { UserDocument } from 'src/Schemas/user.schema';
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}
    
    /**
     * @description Validates the user based on the username and password that is passed in. Then returns the Model object of the user if it matches. If no match, then it returns null. 
     * @param {string} username
     * @param {string} password 
     * @returns {Observable<Object>} An observable of type object. 
     */
//     validateUser(username: string, password: string):Observable<object>{
        
//         return this.userService.findOne(username).pipe(
//             map((user:UserInterface) =>{
//                 if(user && user.password == password){
//                     return user.toObject()
//                 }
//             })
//         )
        

        
// }
    async validateUser(username: string, password: string){
        const user:UserInterface = await this.userService.findOnePromise(username);
        if(user && user.password == password){
            return user.toObject();
        }    
        
        return null
                
    }
    async login (user:UserInterface){
        
        const payload = {name:user.name, sub: user._id}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}