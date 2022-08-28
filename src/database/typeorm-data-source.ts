import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';
import { ConfigService as NestConfig } from '@nestjs/config';

config();

const ConfigService = new NestConfig();

export const configDataSource: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: +ConfigService.get('DB_PORT'),
  username: ConfigService.get('DB_USERNAME'),
  password: ConfigService.get('DB_PASSWORD'),
  database: ConfigService.get('DB_NAME'),
  synchronize: false,
  migrationsRun: false,
  entities: [join(__dirname, 'entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
};

export const typeOrmConnectionDataSource = new DataSource(configDataSource);
