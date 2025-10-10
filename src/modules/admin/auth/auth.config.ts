import { ConfigService } from '@nestjs/config';
import { AdminModuleOptions } from '@adminjs/nestjs';
import { ComponentLoader } from '../types/types.config.js';

export const createAdminAuth = async (
  configService: ConfigService,
  componentLoader: ComponentLoader,
): Promise<AdminModuleOptions['auth']> => {
  const { DefaultAuthProvider } = await import('adminjs');

  return {
    cookieName: 'adminjs',
    cookiePassword: configService.getOrThrow('ADMINJS_COOKIE_PASSWORD'),
    provider: new DefaultAuthProvider({
      componentLoader,
      authenticate: async () => {
        return await Promise.resolve({
          id: '1',
          firstName: 'Admin',
          lastName: 'Admin',
          email: 'admin@admin.com',
          avatarUrl: undefined,
        });
      },
    }),
  };
};
