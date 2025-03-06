import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService =  {
    createUser : jest.fn(dto => {
      return {
        id : Date.now(),
        ...dto
      }
    }),
    findUserByEmail : jest.fn(email => {
      return {
        id : Date.now(),
        email
      }
    }),
    deleteUser : jest.fn(id => {
      return {
        id : id,
        email : 'my-email@yahoo.com'
      }
    }),
    findAllUsers : jest.fn().mockReturnValue([
        {id : String(Math.random()), email : 'user1@gmail.com'},
        {id : String(Math.random()), email : 'user2@gmail.com'},
        {id : String(Math.random()), email : 'user3@gmail.com'},
      ]),
    update : jest.fn((id, dto) => {
        return {
          id : id,
          ...dto
        }
      })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).overrideProvider(UsersService).useValue(mockUsersService).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = {email : "user@gmail.com",password: "user22@@"}
   await  expect(controller.createUser(dto)).toEqual({
      id : expect.any(Number),
      email : "user@gmail.com",
      password : "user22@@"
    })

    expect(mockUsersService.createUser).toHaveBeenCalledWith(dto)
  })

  it('should find user by email', async () => {
   await expect(controller.findUserByEmail('my-email@yahoo.com')).toEqual({
      id : expect.any(Number),
      email : 'my-email@yahoo.com'
    })

    expect(mockUsersService.findUserByEmail).toHaveBeenCalledWith('my-email@yahoo.com')
  })

  it('should delete a user', async() => {
   await  expect(controller.deleteUser('1')).toEqual({
      id : '1',
      email : 'my-email@yahoo.com'
    })
    expect(mockUsersService.deleteUser).toHaveBeenCalledWith('1');
  })

  it('should update a user',async () =>{
    const dto = {email: "yass@gmail.com", password : "pass123"}
    expect(controller.updateUser('1', dto)).toEqual({
      id : '1',
      ...dto
    })
  })

  it('should return all users in the db', async () => {
 await expect(controller.findAllUsers()).toEqual([
  {id : expect.any(String), email : 'user1@gmail.com'},
  {id : expect.any(String), email : 'user2@gmail.com'},
  {id : expect.any(String), email : 'user3@gmail.com'},
  ])
  expect(mockUsersService.findAllUsers).toHaveBeenCalled()
  })

});
