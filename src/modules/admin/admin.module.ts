import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { registerTypeormAdapter } from './adapters/typeorm.adapter.js';
import { createAdminAuth } from './auth/auth.config.js';
import { getComponentLoader } from './component-loader.js';
import { locale } from './locales/locale.config.js';
import { createUserResource } from './resources/users/user.resource.js';
import { User } from '../database/entities/user.entity.js';
import { AdminModule as AdminJsModule } from '@adminjs/nestjs';

@Module({})
export class AdminModule {
  static register(initialize?: boolean): DynamicModule {
    if (!initialize) {
      return {
        module: AdminModule,
      };
    }

    return {
      module: AdminModule,
      imports: [
        AdminJsModule.createAdminAsync({
          imports: [TypeOrmModule.forFeature([User])],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            await registerTypeormAdapter();
            const { componentLoader, components } = await getComponentLoader();

            return {
              adminJsOptions: {
                rootPath: '/admin',
                branding: {
                  withMadeWithLove: false,
                  companyName: 'Admin Panel',
                },
                resources: await Promise.all([createUserResource()]),
                locale,
                componentLoader,
                dashboard: {
                  component: components.Dashboard,
                },
              },
              auth: await createAdminAuth(configService, componentLoader),
            };
          },
        }),
      ],
    };
  }
}
