import { Controller, Post ,Delete, Body, Get, Param, Patch} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { createUserDto } from '../DTO/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    createUser(@Body() user: createUserDto){
        return this.usersService.create(user)
    }

    @Get()
    findAllUsers(){
        return this.usersService.findAllUsers()
    }
    @Get(":email")
    findUserByEmail(@Param('email') email : string){
        return this.usersService.findUserByEmail(email)
    }

    @Delete(":id")
    deleteUser(@Param("id") id : string){
        return this.usersService.deleteUser(id)
    }

    @Patch()
    updateUser(@Param('id') id : string, dto){
        return {id, ...dto}
    }


}
