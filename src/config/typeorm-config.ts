import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';
import { ConfigService as NestConfig } from '@nestjs/config';

config();

const ConfigService = new NestConfig();

export const typeormConfig: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: +ConfigService.get('DB_PORT'),
  username: ConfigService.get('DB_USERNAME'),
  password: ConfigService.get('DB_PASSWORD'),
  database: ConfigService.get('DB_NAME'),
  synchronize: false,
  migrationsRun: false,
  entities: [join(__dirname, '../database', 'entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '../database', 'migrations', '*.{ts,js}')],
};
