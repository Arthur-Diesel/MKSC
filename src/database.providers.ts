import { DataSource } from 'typeorm';
import { join } from 'path';

console.log(process.env.DATABASE_HOST)

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PWD,
        database: process.env.DATABASE_DB,
        entities: [
          join(__dirname, '**', '*.entity.{ts,js}'),
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];