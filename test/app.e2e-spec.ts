import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/', () => {
    beforeEach(async () => {
      const uncleared = await request(app.getHttpServer()).get('/');
      await Promise.all(
        uncleared.body.map(async (movie) => {
          return request(app.getHttpServer()).delete(`/${movie.id}`);
        }),
      );
    });

    it('CREATE, READ, UPDATE, DELETE', async () => {
      const movie = {
        title: 'The Joker',
        description:
          'American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver.',
        director: 'Todd Phillips',
        release_date: '2019-08-31T03:00:00.000Z',
        running_time: 122,
        language: 'english',
      };

      const data = await request(app.getHttpServer())
        .post('/')
        .send(movie)
        .expect(201);
      expect(data.body).toEqual({
        ...movie,
        id: expect.any(Number),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });

      const movies = await request(app.getHttpServer()).get('/').expect(200);
      expect(movies.body.length).toBeGreaterThanOrEqual(1);
      expect(movies.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...movie,
            id: expect.any(Number),
            created_at: expect.any(String),
            updated_at: expect.any(String),
          }),
        ]),
      );

      const movieFound = await request(app.getHttpServer())
        .get(`/${data.body.id}`)
        .expect(200)
      expect(movieFound.body).toEqual({
        ...movie,
        id: data.body.id,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })

      const newMovie = await request(app.getHttpServer())
        .put(`/${data.body.id}`)
        .send({
          title: "Joker"
        })
        .expect(200)
      expect(newMovie.body).toEqual({
        ...movie, 
        title: "Joker", 
        id: data.body.id,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })

      return request(app.getHttpServer())
        .delete(`/${data.body.id}`)
        .expect(200)
        .expect({
            "raw": [],
            "affected": 1
        })

    });
  });
});
