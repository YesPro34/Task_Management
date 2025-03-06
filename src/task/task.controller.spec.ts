import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { JwtService } from '@nestjs/jwt';

describe('TaskController', () => {
  let controller: TaskController;
  const mockTaskService = {}
  const mockJwtService = {}
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers : [TaskService,
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },]
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
