import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { createTaskDto } from './dto/createTask.dto';
import { Status } from '@prisma/client';


type createTaskInput = createTaskDto & {userId : string}

@Injectable()
export class TaskService {

    constructor(private readonly prisma : PrismaService){}

        /**
     * Creates a new task.
     * @param createTaskDto - Data transfer object for creating a task.
     * @returns The created task.
     */
    async createTask(createTaskDto: createTaskInput){
        return this.prisma.task.create({
            data: {
                title: createTaskDto.title,
                description: createTaskDto.description,
                status: createTaskDto.status,
                userId: createTaskDto.userId
              }
            }
        );
    }

    /**
     * find all tasks.
     * @returns The list of taks in the database
     */
    async getAllTasks(){
        return this.prisma.task.findMany();
    }

    async getTasksByUserId(userId: string){
        const tasks =  this.prisma.task.findMany({where:{userId}})
        if(!tasks){
            throw new NotFoundException(`You have no Tasks`)
        }
        return tasks;
    }

        /**
     * find task ny it's Id.
     * @param id - the id of the searched Task.
     * @returns one task.
     */
    async getTaskById(id: string){
        const task = await this.prisma.task.findUnique({where : {id}});
        if(!task){
            throw new NotFoundException(`Task with ID ${id} Not Found`)
        }
        return task;
    }

        /**
     * update an existing  task.
     * param id and updated task data
     * @returns The updated task.
     */
    async updateTask(id: string, updateTask: UpdateTaskDto){
        const task = await this.prisma.task.findUnique({where : {id}});
        if(!task){
            throw new NotFoundException(`Task with ID ${id} Not Found`)
        }
        return this.prisma.task.update({where : {id}, data : updateTask});
    }

    // dete task by it's id 
    // return the deleted task
    async deleteTask(id: string){
        const task = await this.prisma.task.findUnique({where : {id}});
        if(!task){
            throw new NotFoundException(`Task with ID ${id} Not Found`)
        }
        return this.prisma.task.delete({where : {id}});
    }

    async getTasksByStatus(status: Status){
        const tasks = await  this.prisma.task.findMany({where: { status }})
        if(!tasks){
            throw new NotFoundException("No Tasks with status ", status)
        }
        return tasks;
    }
}
