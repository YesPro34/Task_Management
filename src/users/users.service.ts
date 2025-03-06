import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { createUserDto } from './DTO/createUser.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

    constructor(private readonly prisma : PrismaService){}

    /**
     * Finds a user by their email address.
     * 
     * @param email - The email address of the user to find.
     * @returns An object containing the user's id and email if found.
     * @throws NotFoundException if no user with the given email is found.
     */
    async findUserByEmail(email: string){
        const user = await this.prisma.user.findUnique({where: {email}})
        if(!user){
            throw new NotFoundException(`User with ID ${email} Not Found`)
        }
        return {
            id : user.id,
            email : user.email
        }
    }

    /**
     * Finds a user by their email for authentication purposes.
     *
     * @param email - The email of the user to find.
     * @returns The user object if found.
     * @throws NotFoundException if the user is not found.
     */
    async findUserForAuth(email: string){
        const user = await this.prisma.user.findUnique({where: {email}})
        if(!user){
            throw new NotFoundException()
        }
        return user;
    }

    /**
     * Retrieves all users from the database.
     * 
     * @returns {Promise<Array<{id: number, email: string, createdAt: Date, updatedAt: Date}>>} 
     * A promise that resolves to an array of user objects, each containing the user's id, email, 
     * creation date, and last update date.
     */
    async findAllUsers(){
        return this.prisma.user.findMany({
            select : {
                id: true,
                email : true,
                createdAt : true,
                updatedAt : true
            }
        })
    }

    /**
     * Creates a new user with the provided details.
     * 
     * @param {createUserDto} user - The data transfer object containing user details.
     * @returns {Promise<{ id: string, email: string }>} - An object containing the new user's ID and email.
     * 
     * @throws {Error} - Throws an error if user creation fails.
     */
    async create(user: createUserDto){
        const saltRound = 10
        const hashedPassword = await bcrypt.hash(user.password, saltRound)
        const newUser = await this.prisma.user.create({
            data: {
                email : user.email,
                password : hashedPassword
            }
        });

        return {
            id: newUser.id,
            email : newUser.email
        }
    }
    /**
     * Deletes a user by their unique identifier.
     * 
     * @param {string} id - The unique identifier of the user to be deleted.
     * @returns {Promise<void>} A promise that resolves when the user is deleted.
     * @throws {NotFoundException} If no user is found with the given id.
     */
    async deleteUser(id:string){
            const user = await this.prisma.user.findUnique({where:{id}})
            if(!user){
                throw new NotFoundException()
            }
            return this.prisma.user.delete({where : {id}});
        
    }

}
