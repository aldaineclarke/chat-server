/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserInterface } from 'src/Schemas/user.schema';
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
    async validateUser(email: string, password: string){
        const user:UserInterface = await this.userService.findOnePromise(email);
        if(user && this.userService.compareHashed(user.password, password)){
            return user.toObject();
        }    
        
        return null
                
    }
    async login (user:UserInterface){
        const userId = user._id;
        return {access_token: this.generateToken(user).access_token, id: userId}
    }

    generateToken(user:UserInterface){
        const payload = {email:user.email, sub: user._id}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}