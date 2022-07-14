import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    director: string;

    @IsNotEmpty()
    release_date: Date;

    @IsNotEmpty()
    @IsInt()
    running_time: number;

    @IsNotEmpty()
    @IsString()
    language: string;
}

export class UpdateMovieDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    director: string;

    @IsOptional()
    release_date: Date;

    @IsOptional()
    @IsInt()
    running_time: number;

    @IsOptional()
    @IsString()
    language: string;
}