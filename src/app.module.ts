import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from "./database.module";
import { movieProviders } from "./movie.providers";
import { MovieService } from "./movie.service";
import { MovieController } from "./movie.controller";

@Module({
    imports: [DatabaseModule, ConfigModule.forRoot()],
    controllers: [MovieController],
    providers: [
        ...movieProviders,
        MovieService,
    ],
})

export class AppModule {}