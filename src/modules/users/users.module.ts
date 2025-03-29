import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [UsersService],
  imports : [PrismaModule],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
