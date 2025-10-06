# Admin Module

This is a base admin module for NestJS applications using AdminJS. It provides a clean, minimal setup with user management capabilities.

## Features

- **User Management**: Complete CRUD operations for users
- **Clean Dashboard**: Simple welcome dashboard with basic statistics
- **Responsive Design**: Works well on desktop and mobile devices
- **Internationalization**: Portuguese (pt-BR) translations included
- **TypeScript**: Fully typed components and configurations

## Structure

```
src/modules/admin/
├── adapters/           # Database adapters
├── auth/              # Authentication configuration
├── components/        # Custom UI components
│   ├── avatar/        # Avatar component for user profiles
│   └── dashboard/     # Main dashboard component
├── features/          # AdminJS features
│   └── soft-delete.feature.ts
├── hooks/             # AdminJS hooks
│   └── validate-form.before.ts
├── locales/           # Internationalization
│   ├── index.ts
│   └── pt-br.translation.ts
├── navigations/       # Navigation configuration
├── resources/         # Resource definitions
│   └── users/         # User resource configuration
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── admin.module.ts    # Main module file
└── component-loader.ts # Component loader configuration
```

## Usage

1. Import the AdminModule in your main app module:

```typescript
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    // ... other imports
    AdminModule.register(true), // Pass true to initialize
  ],
})
export class AppModule {}
```

2. Make sure you have the User entity properly configured in your database module.

3. Access the admin panel at `/admin` route.

## Customization

### Adding New Resources

1. Create a new resource directory under `resources/`
2. Define the resource configuration
3. Add it to the `admin.module.ts` resources array

### Customizing the Dashboard

Edit the dashboard component at `components/dashboard/index.tsx` to add your own statistics and information.

### Adding Translations

Add new translation files in the `locales/` directory and update the locale configuration.

## Dependencies

This module requires:
- `@adminjs/nestjs`
- `@adminjs/typeorm`
- `adminjs`
- `typeorm`
- `class-validator`
- `styled-components`

## Environment Variables

Make sure to configure the necessary environment variables for database connection and authentication in your `.env` file.
