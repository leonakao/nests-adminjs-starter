import { ConfigService } from '@nestjs/config';
import { AdminModuleOptions, ComponentLoader } from '../types';

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
