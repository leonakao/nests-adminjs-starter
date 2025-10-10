import { DataSourceOptions } from 'typeorm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import * as dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'postgres',
  entities: [join(__dirname, '/../../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  migrationsRun: false,
};
