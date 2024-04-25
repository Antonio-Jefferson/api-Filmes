import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a token when login is successful', async () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      };
      const token = 'mockToken';
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await service.login(user);

      expect(jwtService.sign).toHaveBeenCalled();
      expect(result).toEqual({ access_token: token });
    });
  });

  describe('validateUser', () => {
    it('should return user when validation is successful', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const hashedPassword = await bcrypt.hash(password, 10);
      const user: User = {
        id: 1,
        email,
        password: hashedPassword,
        name: 'Test User',
      };
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.validateUser(email, password);

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(result).toEqual({ ...user, password: undefined });
    });

    it('should throw UnauthorizedError when email or password is incorrect', async () => {
      const email = 'test@example.com';
      const password = 'password';
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(undefined);

      await expect(service.validateUser(email, password)).rejects.toThrowError(
        UnauthorizedError,
      );
    });
  });

  describe('signup', () => {
    it('should return the created user when signup is successful', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      };
      const createdUser: User = { id: 1, ...createUserDto };
      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      const result = await service.signup(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual({ ...createdUser, password: undefined });
    });
  });
});
