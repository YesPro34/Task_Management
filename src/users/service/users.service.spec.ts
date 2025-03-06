import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      findMany: jest.fn().mockResolvedValue([
        {id : String(Math.random()), email : 'user1@gmail.com', createdAt : String(Math.random()), updatedAt : String(Math.random())},
        {id : String(Math.random()), email : 'user2@gmail.com', createdAt : String(Math.random()), updatedAt : String(Math.random())},
        {id : String(Math.random()), email : 'user3@gmail.com', createdAt : String(Math.random()), updatedAt : String(Math.random())},
      ]),
      findUnique: jest.fn(({ where: { id } }) => {
        return {
          id : id,
          email : "test@test.com",
          password : "password"
        }
      }),
      create: jest.fn().mockResolvedValue({id : "1", email : 'user@gmail.com', password : "pass123" }),
      update: jest.fn(),
      delete: jest.fn(({where : {id}}) => {
        return {
          id : id,
          email : "test@test.com",
          password : "password"
        }
      }),
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {email: "user@gmail.com", password : "pass123"}
    const result = await service.create(user)
    expect(result).toEqual({
      id: '1',
      email: "user@gmail.com",
    });
  })

  it('should return all users', async () => {
    const usersList = [
      {id : expect.any(String), email : 'user1@gmail.com', createdAt : expect.any(String), updatedAt : expect.any(String)},
      {id : expect.any(String), email : 'user2@gmail.com', createdAt : expect.any(String), updatedAt : expect.any(String)},
      {id : expect.any(String), email : 'user3@gmail.com', createdAt : expect.any(String), updatedAt : expect.any(String)}
    ]
    expect(await service.findAllUsers()).toEqual(usersList)
  });
  

  it('should delete a user', async() => {
    const id = '1'
    expect(await service.deleteUser(id)).toEqual({
        id : id,
        email : expect.any(String),
        password : expect.any(String)
    });
    expect(mockPrismaService.user.delete).toHaveBeenCalledWith({where : {id}})
  });

});
