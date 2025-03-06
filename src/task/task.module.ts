import { Module } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports : [PrismaModule],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
