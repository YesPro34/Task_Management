import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { createTaskDto } from '../dto/createTask.dto';
import { Status } from '@prisma/client';
import { TaskEntity } from '../entity/task.entity';

type createTaskInput = createTaskDto & {userId : string}

@Injectable()
export class TaskService {

    constructor(private readonly prisma : PrismaService){}

    /**
     * Creates a new task in the database.
     * 
     * @param {createTaskInput} createTaskDto - The data transfer object containing the details of the task to be created.
     * @returns {Promise<TaskEntity>} - A promise that resolves to the created TaskEntity.
     */
    async createTask(createTaskDto: createTaskInput): Promise<TaskEntity>{
        return await  this.prisma.task.create({
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
     * Retrieves all tasks from the database.
     *
     * @returns {Promise<TaskEntity[]>} A promise that resolves to an array of TaskEntity objects.
     */
    async getTasksByUserId(userId: string): Promise<TaskEntity[]>{
        const tasks =  await this.prisma.task.findMany({where:{userId}})
        if(!tasks){
            throw new NotFoundException(`You have no Tasks`)
        }
        return tasks;
    }


    /**
     * Retrieves a task by its unique identifier.
     *
     * @param {string} id - The unique identifier of the task.
     * @returns {Promise<TaskEntity>} A promise that resolves to the task entity.
     * @throws {NotFoundException} If no task is found with the given ID.
     */
    async getTaskById(id: string):Promise<TaskEntity>{
        const task = await this.prisma.task.findUnique({where : {id}});
        if(!task){
            throw new NotFoundException(`Task with ID ${id} Not Found`)
        }
        return new TaskEntity(task);
    }


    /**
     * Updates a task with the given ID using the provided update data.
     *
     * @param {string} id - The ID of the task to update.
     * @param {UpdateTaskDto} updateTask - The data to update the task with.
     * @returns {Promise<TaskEntity>} - A promise that resolves to the updated task entity.
     * @throws {NotFoundException} - If no task with the given ID is found.
     */
    async deleteTask(id: string): Promise<TaskEntity>{
        const task = await this.prisma.task.findUnique({where : {id}});
        if(!task){
            throw new NotFoundException(`Task with ID ${id} Not Found`)
        }
        return await this.prisma.task.delete({where : {id}});
    }


    /**
     * Retrieves tasks based on their status.
     *
     * @param {Status} status - The status of the tasks to retrieve.
     * @returns {Promise<TaskEntity[]>} A promise that resolves to an array of TaskEntity objects.
     * @throws {NotFoundException} If no tasks with the specified status are found.
     */
    async getTasksByStatus(status: Status) : Promise<TaskEntity[]>{
        const tasks = await  this.prisma.task.findMany({where: { status }})
        if(!tasks){
            throw new NotFoundException("No Tasks with status ", status)
        }
          return tasks;
    }
}
