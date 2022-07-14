import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto'

const movie = {
  "id": 2,
  "title": "The Joker",
  "description": "American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver.",
  "director": "Todd Phillips",
  "release_date": new Date('08/31/2019'),
  "running_time": 122,
  "language": "english",
  "created_at": new Date(),
  "updated_at": new Date()
}

const movieWithoutDates = {
  "title": "The Joker",
  "description": "American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver.",
  "director": "Todd Phillips",
  "release_date": new Date('08/31/2019'),
  "running_time": 122,
  "language": "english"
}

const newMovie = {
  "id": 2,
  "title": "Joker",
  "description": "American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver.",
  "director": "Todd Phillips",
  "release_date": new Date('08/31/2019'),
  "running_time": 122,
  "language": "english",
  "created_at": new Date(),
  "updated_at": new Date()
}

const newMovieWithoutDates = {
  "title": "Joker",
  "description": "American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver.",
  "director": "Todd Phillips",
  "release_date": new Date('08/31/2019'),
  "running_time": 122,
  "language": "english"
}

const destroyResponse = {
  "raw": [],
  "affected": 1
}

describe('AppController', () => {
  let movieController: MovieController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            index: jest.fn().mockResolvedValue([movie]),
            show: jest.fn().mockImplementation((id: string) => Promise.resolve(movie)),
            store: jest.fn().mockImplementation((movieWithoutDates: CreateMovieDto) => Promise.resolve(movie)),
            update: jest.fn().mockImplementation((newMovieWithoutDates: UpdateMovieDto) => Promise.resolve(newMovie)),
            destroy: jest.fn().mockImplementation((id: string) => Promise.resolve(destroyResponse))
        }
      }]
    }).compile();
    movieController = app.get<MovieController>(MovieController);
  });

  it("Should be Defined!", () => {
    expect(movieController).toBeDefined()
  })

  describe('Index', () => {
    it('Index ~ Success', () => {
      expect(movieController.index()).resolves.toEqual([movie])
    })
  })

  describe('Show', () => {
    it('Show ~ Success', () => {
      expect(movieController.show('2')).resolves.toEqual(movie)
    })
  })
  
  
  describe('Store', () => {
    it('Store ~ Success', async () => {
      expect(movieController.store(movieWithoutDates)).resolves.toMatchObject(movie)
    })
  })

  describe('Update', () => {
    it('Update ~ Success', async () => {
      expect(movieController.update('2', newMovieWithoutDates)).resolves.toMatchObject(newMovie)
    })
  })

  describe('Destroy', () => {
    it('Destroy ~ Success', async () => {
      expect(movieController.destroy('2')).resolves.toMatchObject(destroyResponse)
    })
  })

})
