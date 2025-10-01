# Database Setup - TypeORM with PostgreSQL

## ✅ Installation Complete

The following packages have been installed and configured:

- `@nestjs/typeorm` - NestJS TypeORM integration
- `@nestjs/config` - Configuration management
- `typeorm` - TypeORM core
- `pg` - PostgreSQL driver
- `dotenv` - Environment variable loading

## 📁 Project Structure

```
src/
├── modules/
│   └── database/
│       ├── database.module.ts    # Main database module
│       ├── data-source.ts        # DataSource for migrations
│       ├── index.ts              # Module exports
│       ├── entities/             # Place for shared entities
│       └── README.md             # Detailed documentation
├── migrations/                   # Database migrations
└── app.module.ts                 # Updated with DatabaseModule
```

## 🔧 Configuration Files

### `.env`
Contains database connection settings:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
NODE_ENV=development
PORT=3000
```

### `database.module.ts`
- Wraps TypeORM configuration
- Uses environment variables via ConfigService
- Auto-synchronization enabled in development
- Logging enabled in development
- Supports migrations

### `data-source.ts`
- Standalone DataSource for TypeORM CLI
- Used for running migrations
- Can be imported for direct database operations

## 🚀 Available Scripts

Added to `package.json`:

```bash
# TypeORM CLI wrapper
pnpm typeorm

# Generate migration from entity changes
pnpm migration:generate src/migrations/MigrationName

# Create empty migration file
pnpm migration:create src/migrations/MigrationName

# Run pending migrations
pnpm migration:run

# Revert last migration
pnpm migration:revert
```

## 📝 Usage Examples

### 1. Create an Entity

Create a file `src/modules/users/entities/user.entity.ts`:

```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### 2. Create a Module with Repository

Create `src/modules/users/users.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### 3. Use Repository in Service

Create `src/modules/users/users.service.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
```

### 4. Import in App Module

The `DatabaseModule` is already imported in `app.module.ts`. Just add your feature modules:

```typescript
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule, // Add your modules here
  ],
  // ...
})
export class AppModule {}
```

## 🐳 Docker Setup

Your `docker-compose.yaml` already includes PostgreSQL:

```bash
# Start the database
docker-compose up -d db

# Start the app with database
docker-compose up
```

## 🔍 Testing the Connection

Start your application to test the database connection:

```bash
# Make sure PostgreSQL is running
docker-compose up -d db

# Start the app
pnpm start:dev
```

You should see TypeORM connection logs in the console if `NODE_ENV=development`.

## ⚠️ Important Notes

1. **Development vs Production**:
   - Development: `synchronize: true` (auto-creates tables)
   - Production: Use migrations only, never synchronize

2. **Entity Discovery**:
   - Entities must end with `.entity.ts` or `.entity.js`
   - Can be placed anywhere in the `src` directory
   - Automatically discovered by TypeORM

3. **Migrations**:
   - Always use migrations for production
   - Generate migrations after entity changes
   - Review generated migrations before running

4. **Environment Variables**:
   - Never commit `.env` to version control
   - Use `.env.example` as a template
   - Update values for different environments

## 🎯 Next Steps

1. Create your first entity
2. Generate a migration: `pnpm migration:generate src/migrations/InitialSchema`
3. Run the migration: `pnpm migration:run`
4. Create a service to interact with your entity
5. Build your API endpoints

## 📚 Additional Resources

- [TypeORM Documentation](https://typeorm.io/)
- [NestJS TypeORM Integration](https://docs.nestjs.com/techniques/database)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Setup completed successfully! 🎉**
