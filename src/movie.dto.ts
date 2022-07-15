import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    director: string;

    @IsNotEmpty()
    @ApiProperty()
    release_date: Date;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    running_time: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
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