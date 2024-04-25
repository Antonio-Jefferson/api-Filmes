import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
// import { AuthRequest } from './models/AuthRequest';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            signup: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('login', () => {
  //   it('should return a token when login is successful', async () => {
  //     const userRequest: AuthRequest = {
  //       user: {
  //         id: 1,
  //         email: 'test@gmail.com',
  //         password: 'password',
  //         name: 'username',
  //       },
  //       get: jest.fn(),
  //       header: jest.fn(),
  //       accepts: jest.fn(),
  //     };

  //     const mockToken = { access_token: 'mockToken' };
  //     jest.spyOn(authService, 'login').mockResolvedValue(mockToken);

  //     const result = await controller.login(userRequest);

  //     expect(result).toEqual(mockToken);
  //   });
  // });
  describe('signup', () => {
    it('should return the created user when signup is successful', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      };
      const createdUser = { id: 1, ...createUserDto };
      jest.spyOn(authService, 'signup').mockResolvedValue(createdUser);

      const result = await controller.signup(createUserDto);

      expect(result).toEqual(createdUser);
    });
  });
});
