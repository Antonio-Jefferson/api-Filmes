import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

const userEntity: User = new User({
  id: 1,
  email: 'user@gmail.com',
  name: 'user',
  password: 'password',
});

const userRes = {
  id: 1,
  email: 'user@gmail.com',
  name: 'user',
};
describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn().mockReturnValue(userEntity),
            save: jest.fn().mockResolvedValue(userRes),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const data: CreateUserDto = {
      email: 'test@example.com',
      password: 'hashedPassword',
      name: 'user01',
    };
    it('should create a user', async () => {
      const result = await service.create(data);

      expect(result).toEqual(userRes);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  it('should throw ConflictException if user with same email exists', async () => {
    const existingUser: User = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      name: 'user01',
    };
    jest.spyOn(service, 'findByEmail').mockResolvedValue(existingUser);

    const createUserDto = {
      email: 'test@example.com',
      password: 'password',
      name: 'user01',
    };

    await expect(service.create(createUserDto)).rejects.toThrow(
      ConflictException,
    );
  });
});
