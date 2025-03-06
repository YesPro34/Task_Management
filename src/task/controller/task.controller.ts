import { Controller, Post, Get, Patch,Query, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { createTaskDto } from '../dto/createTask.dto';
import { UpdateTaskDto } from '../dto/updateTask.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UserId } from '../../decorators/user-id.decorater';
import { FilterTasksDto } from '../dto/filter-tasks.dto';


@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {

    constructor(private readonly taskService : TaskService){}

    @Post()
    create(@Body() task: createTaskDto, @Request() request){
        const newTask = {...task, userId : request.user?.userId}
        return this.taskService.createTask(newTask)
    }

    @Get('my-tasks')
    getMyTasks(@UserId() userId : string){
        return this.taskService.getTasksByUserId(userId)
        
    }

    @Get('status')
    filterByStatus(@Query() filterStatus: FilterTasksDto){
        return this.taskService.getTasksByStatus(filterStatus.status)
    }

    @Get(':id')
    getTaskById(@Param('id') id: string){
        return this.taskService.getTaskById(id);
    }

    @Get()
    getAllTasks(){
        return this.taskService.getAllTasks()
    }
    

    @Patch(":id")
    updateTask(@Param('id') id: string, @Body() modifiedTask: UpdateTaskDto){
        return this.taskService.updateTask(id, modifiedTask);
    }

    @Delete(":id")
    deleteTask(@Param('id') id: string){
        return this.taskService.deleteTask(id);
    }


}
