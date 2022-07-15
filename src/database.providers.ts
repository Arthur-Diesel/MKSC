import { DataSource } from 'typeorm';
import { join } from 'path';

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
        extra: {
          ssl: {
            rejectUnauthorized: false
          }
        }
      });

      return dataSource.initialize();
    },
  },
];