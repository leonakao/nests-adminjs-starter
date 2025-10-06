export const registerTypeormAdapter = async (): Promise<void> => {
  const { AdminJS } = await import('adminjs');
  const { Database, Resource } = await import('@adminjs/typeorm');

  AdminJS.registerAdapter({
    Resource,
    Database,
  });
};
