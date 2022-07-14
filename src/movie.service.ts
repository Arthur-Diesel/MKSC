import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
    constructor(
        @Inject('MOVIE_REPOSITORY')
        private movieRepository: Repository<Movie>,
    ) {}

    async index (): Promise<Movie[]> {
        return this.movieRepository.find();
    }

    async show (id: number): Promise<Movie> {
        return this.movieRepository.findOneBy({ id: id })
    }

    async store (
        movie: {
            title: string | null,
            description: string | null,
            director: string | null,
            release_date: Date | null,
            running_time: number | null,
            language: string | null
        }): Promise<Movie> {
        const newMovie = new Movie()
        Object.assign(newMovie, movie)
        return this.movieRepository.save(newMovie)
    }

    async update (
        id: number, 
        movie: {
            title: string,
            description: string,
            director: string,
            release_date: Date,
            running_time: number,
            language: string 
        }
    ): Promise<Movie> {
        const movieToUpdate = await this.movieRepository.findOneBy({ id: id })
        Object.assign(movieToUpdate, movie)
        return this.movieRepository.save(movieToUpdate)
    }

    async destroy (id: number): Promise<any> {
        return this.movieRepository.delete({ id: id })
    }
}