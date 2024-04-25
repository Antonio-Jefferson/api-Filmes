import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a film', async () => {
      const createFilmDto = {
        name: 'Film 1',
        description: 'Description of Film 1',
        image: 'image_url_1',
      };
      const createdFilm: Film = { id: 1, ...createFilmDto };

      jest.spyOn(service, 'create').mockResolvedValue(createdFilm);

      expect(await controller.create(createFilmDto)).toBe(createdFilm);
    });
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      const films: Film[] = [
        {
          id: 1,
          name: 'Film 1',
          description: 'Description of Film 1',
          image: 'image_url_1',
        },
        {
          id: 2,
          name: 'Film 2',
          description: 'Description of Film 2',
          image: 'image_url_2',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(films);

      expect(await controller.findAll()).toBe(films);
    });
  });

  describe('findOne', () => {
    it('should return a film by ID', async () => {
      const film: Film = {
        id: 1,
        name: 'Film 1',
        description: 'Description of Film 1',
        image: 'image_url_1',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(film);

      expect(await controller.findOne('1')).toBe(film);
    });
  });

  describe('update', () => {
    it('should update a film', async () => {
      const updateFilmDto = {
        name: 'Updated Film',
        description: 'Updated Description',
        image: 'updated_image_url',
      };
      const updatedFilm: Film = { id: 1, ...updateFilmDto };
      jest.spyOn(service, 'update').mockResolvedValue(updatedFilm);

      expect(await controller.update('1', updateFilmDto)).toBe(updatedFilm);
    });
  });

  describe('remove', () => {
    it('should remove a film', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue();

      await expect(controller.remove('1')).resolves.toBe(undefined);
    });
  });
});
