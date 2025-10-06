import { DynamicModule, Module } from '@nestjs/common';
import { AdminModule as AdminJSModule } from '@adminjs/nestjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { registerTypeormAdapter } from './adapters/typeorm.adapter';
import { createAdminAuth } from './auth';
import { getComponentLoader } from './component-loader';
import { locale } from './locales';
import { createUserResource } from './resources/users/user.resource';
import { User } from '../database';

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
        AdminJSModule.createAdminAsync({
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
