import { Controller, Get, HttpCode, Param, Post, Put, Body, Delete } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';

@Controller()
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    public async index(): Promise<Movie[]> {
        return await this.movieService.index()
    }

    @Get(':id')
    public async show(@Param('id') id: string): Promise<Movie> {
        return await this.movieService.show(parseInt(id))
    }

    @Post()
    @HttpCode(201)
    public async store(@Body() createMovieDto: CreateMovieDto): Promise<Movie | {error: string}> {
        createMovieDto.release_date = new Date(createMovieDto.release_date)
        return await this.movieService.store(createMovieDto)
    }

    @Put(':id')
    public async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto): Promise<Movie | {error: string}> {
        if(updateMovieDto.release_date){
            updateMovieDto.release_date = new Date(updateMovieDto.release_date)
        }
        return await this.movieService.update(parseInt(id), updateMovieDto)
    }

    @Delete(':id')
    public async destroy(@Param('id') id: string): Promise<any> {
        return await this.movieService.destroy(parseInt(id))
    }
}