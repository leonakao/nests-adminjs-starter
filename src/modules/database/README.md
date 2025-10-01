# Database Module

This module wraps all database configuration and provides TypeORM integration with PostgreSQL.

## Features

- TypeORM configuration with PostgreSQL
- Environment-based configuration
- Migration support
- Auto-synchronization in development mode
- Centralized DataSource for migrations

## Configuration

Database configuration is managed through environment variables in `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
NODE_ENV=development
```

## Usage

### Import in your module

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './modules/database';
import { User } from './entities/user.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User]), // Register your entities
  ],
})
export class YourModule {}
```

### Create an entity

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
```

### Use in a service

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
```

## Migrations

### Generate a migration

```bash
pnpm migration:generate src/modules/database/migrations/MigrationName
```

### Create an empty migration

```bash
pnpm migration:create MigrationName
```

### Run migrations

```bash
pnpm migration:run
```

### Revert last migration

```bash
pnpm migration:revert
```

## Important Notes

- **Development**: `synchronize: true` is enabled in development mode for rapid prototyping
- **Production**: Always use migrations in production (synchronize is disabled)
- **Entity Location**: Entities should follow the pattern `*.entity.ts` and be placed anywhere in the `src` directory
- **Migration Location**: Migrations are stored in `src/modules/database/migrations/`
- **Example Entity**: A `User` entity is included as an example in `src/modules/database/entities/user.entity.ts`

## DataSource

The `data-source.ts` file exports a DataSource instance that can be used for:
- Running migrations via CLI
- Seeding data
- Direct database operations outside of NestJS context

```typescript
import dataSource from './modules/database/data-source';

// Initialize connection
await dataSource.initialize();

// Use dataSource
const users = await dataSource.getRepository(User).find();
```
