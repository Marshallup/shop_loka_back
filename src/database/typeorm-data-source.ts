import { DataSource } from 'typeorm';
import { typeormConfig } from '../config/typeorm-config';

export const typeOrmConnectionDataSource = new DataSource(typeormConfig);
