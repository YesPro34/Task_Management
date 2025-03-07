import { Controller, Post ,Delete, Body, Get, Param, Patch, HttpCode} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { createUserDto } from '../DTO/createUser.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';


@ApiTags("users")
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    @ApiOperation({summary : "create a User"})
    @ApiResponse({ status: 201, description: 'User created' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    createUser(@Body() user: createUserDto){
        return this.usersService.create(user)
    }

    @Get()
    @ApiOperation({summary : "Get all Users "})
    @ApiResponse({ status: 200, description: 'get all Users successfully' })
    findAllUsers(){
        return this.usersService.findAllUsers()
    }
    @Get(":email")
    findUserByEmail(@Param('email') email : string){
        return this.usersService.findUserByEmail(email)
    }

    @Delete(":id")
    @HttpCode(204)
    @ApiOperation({summary : "delete User by id"})
    @ApiResponse({ status: 204, description: 'delete User successfully' })
    @ApiResponse({ status: 404, description: 'User Not Found' })
    deleteUser(@Param("id") id : string){
        return this.usersService.deleteUser(id)
    }

    @Patch()
    @ApiOperation({summary : "update User by id"})
    @ApiResponse({ status: 200, description: 'update User successfully' })
    @ApiResponse({ status: 404, description: 'User Not Found' })
    updateUser(@Param('id') id : string, dto){
        return {id, ...dto}
    }


}
