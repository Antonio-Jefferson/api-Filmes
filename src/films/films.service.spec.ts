import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

// Mock do repositório
const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('FilmsService', () => {
  let service: FilmsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        { provide: getRepositoryToken(Film), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a film', async () => {
      const filmDto = {
        name: 'Film Name',
        description: 'Film Description',
        image: 'film.jpg',
      };
      const createdFilm = { id: 1, ...filmDto };
      mockRepository.findOne.mockResolvedValueOnce(null);
      mockRepository.create.mockReturnValueOnce(createdFilm);
      mockRepository.save.mockResolvedValueOnce(createdFilm);

      const result = await service.create(filmDto);

      expect(result).toEqual(createdFilm);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { name: filmDto.name },
      });
      expect(mockRepository.create).toHaveBeenCalledWith(filmDto);
      expect(mockRepository.save).toHaveBeenCalledWith(createdFilm);
    });

    it('should throw ConflictException if film with same name already exists', async () => {
      const filmDto = {
        name: 'Film Name',
        description: 'Film Description',
        image: 'film.jpg',
      };
      mockRepository.findOne.mockResolvedValueOnce({ id: 1 });

      await expect(service.create(filmDto)).rejects.toThrow(ConflictException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { name: filmDto.name },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      const films = [
        {
          id: 1,
          name: 'Film 1',
          description: 'Description 1',
          image: 'image1.jpg',
        },
        {
          id: 2,
          name: 'Film 2',
          description: 'Description 2',
          image: 'image2.jpg',
        },
      ];
      mockRepository.find.mockResolvedValueOnce(films);

      const result = await service.findAll();

      expect(result).toEqual(films);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a film by ID', async () => {
      const film = {
        id: 1,
        name: 'Film Name',
        description: 'Film Description',
        image: 'film.jpg',
      };
      mockRepository.findOne.mockResolvedValueOnce(film);

      const result = await service.findOne(1);

      expect(result).toEqual(film);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if film with given ID does not exist', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('update', () => {
    it('should update a film', async () => {
      const updateDto = {
        name: 'New Film Name',
        description: 'New Description',
        image: 'new_image.jpg',
      };
      const film = {
        id: 1,
        name: 'Old Film Name',
        description: 'Old Description',
        image: 'old_image.jpg',
      };
      mockRepository.findOne.mockResolvedValueOnce(film);
      mockRepository.save.mockResolvedValueOnce({ ...film, ...updateDto });

      const result = await service.update(1, updateDto);

      expect(result).toEqual({ ...film, ...updateDto });
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.save).toHaveBeenCalledWith({
        ...film,
        ...updateDto,
      });
    });

    it('should throw NotFoundException if film with given ID does not exist', async () => {
      const updateDto = {
        name: 'New Film Name',
        description: 'New Description',
        image: 'new_image.jpg',
      };
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.update(1, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('remove', () => {
    it('should remove a film', async () => {
      const film = {
        id: 1,
        name: 'Film Name',
        description: 'Film Description',
        image: 'film.jpg',
      };
      mockRepository.findOne.mockResolvedValueOnce(film);

      await service.remove(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if film with given ID does not exist', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });
  });
});
