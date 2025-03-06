import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../service/task.service';

describe('TaskService', () => {
  let service: TaskService;
  const mockTaskService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).overrideProvider(TaskService).useValue(mockTaskService).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
