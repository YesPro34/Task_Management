import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; 
import { createUserDto } from '../DTO/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entity/user.entity';


@Injectable()
export class UsersService {

    constructor(private readonly prisma : PrismaService){}


    /**
     * Finds a user by their email address.
     *
     * @param email - The email address of the user to find.
     * @returns {Promise<UserEntity>} A promise that resolves to a UserEntity object if the user is found.
     * @throws {NotFoundException} if no user with the given email address is found.
     */
    async findUserByEmail(email: string):Promise<UserEntity>{
        const user = await this.prisma.user.findUnique({where: {email}})
        if(!user){
            throw new NotFoundException(`User with ID ${email} Not Found`)
        }
        return new UserEntity(user)
    }

    /**
     * Finds a user by their email for authentication purposes.
     * 
     * @param email - The email of the user to find.
     * @returns {Promise<UserEntity>} A promise that resolves to a UserEntity if the user is found.
     * @throws {NotFoundException} if the user is not found.
     */
    async findUserForAuth(email: string): Promise<UserEntity>{
        const user = await this.prisma.user.findUnique({where: {email}})
        if(!user){
            throw new NotFoundException()
        }
        return new UserEntity(user);
    }


    /**
     * Retrieves all users from the database.
     *
     * @returns {Promise<UserEntity[]>} A promise that resolves to an array of UserEntity objects.
     */
    async findAllUsers(): Promise<UserEntity[]>{
        return await this.prisma.user.findMany({})
    }


    /**
     * Creates a new user with the provided details.
     * 
     * @param {createUserDto} user - The data transfer object containing user details.
     * @returns {Promise<UserEntity>} - A promise that resolves to the created user entity.
     */
    async create(user: createUserDto): Promise<UserEntity>{
        const saltRound = 10
        const hashedPassword = await bcrypt.hash(user.password, saltRound)
        const newUser = await this.prisma.user.create({
            data: {
                email : user.email,
                password : hashedPassword
            }
        });

        return new UserEntity(newUser)
    }

    /**
     * Deletes a user by their unique identifier.
     * 
     * @param {string} id - The unique identifier of the user to be deleted.
     * @returns {Promise<UserEntity>} - A promise that resolves to the deleted user entity.
     * @throws {NotFoundException} - If no user is found with the given identifier.
     */
    async deleteUser(id:string) : Promise<UserEntity>{
            const user = await this.prisma.user.findUnique({where:{id}})
            if(!user){
                throw new NotFoundException()
            }
            return await this.prisma.user.delete({where : {id}});
        
    }

}
