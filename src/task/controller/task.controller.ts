import { Controller, Post, Get, Patch,Query, Delete, Body, Param, UseGuards, Request, HttpCode } from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { createTaskDto } from '../dto/createTask.dto';
import { UpdateTaskDto } from '../dto/updateTask.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UserId } from '../../decorators/user-id.decorater';
import { FilterTasksDto } from '../dto/filter-tasks.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags("tasks")
@Controller('tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TaskController {

    constructor(private readonly taskService : TaskService){}

    @Post()
    @ApiOperation({summary : "create a task"})
    @ApiResponse({ status: 201, description: 'Task created' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @ApiBody({type: createTaskDto })
    create(@Body() task: createTaskDto, @Request() request){
        const newTask = {...task, userId : request.user?.userId}
        return  this.taskService.createTask(newTask)
    }

    @Get('my-tasks')
    @ApiOperation({summary : "Get Task  For a User"})
    @ApiResponse({ status: 200, description: 'get task successfully' })
    getMyTasks(@UserId() userId : string){
        return this.taskService.getTasksByUserId(userId)
        
    }

    @Get('status')
    @ApiOperation({summary : "filter tasks by status"})
    @ApiResponse({ status: 200, description: 'get task successfully' })
    @ApiResponse({ status: 400, description: 'Tasks Not Found' })
    filterByStatus(@Query() filterStatus: FilterTasksDto){
        return this.taskService.getTasksByStatus(filterStatus.status)
    }


    @Get(':id')
    @ApiOperation({summary : "get task by id"})
    @ApiResponse({ status: 200, description: 'get task successfully' })
    @ApiResponse({ status: 404, description: 'Task Not Found' })
    getTaskById(@Param('id') id: string){
        return this.taskService.getTaskById(id);
    }


    @Get()
    @ApiOperation({summary : "Get all Tasks "})
    @ApiResponse({ status: 200, description: 'get all tasks successfully' })
    getAllTasks(){
        return this.taskService.getAllTasks()
    }
    

    @Patch(":id")
    @ApiOperation({summary : "update task by id"})
    @ApiResponse({ status: 200, description: 'update task successfully' })
    @ApiResponse({ status: 404, description: 'Task Not Found' })
    updateTask(@Param('id') id: string, @Body() modifiedTask: UpdateTaskDto){
        return this.taskService.updateTask(id, modifiedTask);
    }


    @Delete(":id")
    @HttpCode(204)
    @ApiOperation({summary : "delete task by id"})
    @ApiResponse({ status: 204, description: 'delete task successfully' })
    @ApiResponse({ status: 404, description: 'Task Not Found' })
    deleteTask(@Param('id') id: string){
        return this.taskService.deleteTask(id);
    }


}


