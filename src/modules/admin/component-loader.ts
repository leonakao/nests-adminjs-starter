import { ComponentLoader } from './types';

export type Components = Record<'Dashboard' | 'Avatar', string>;

let componentLoader: ComponentLoader;
let components: Components;

export const getComponentLoader = async () => {
  if (!componentLoader) {
    const { ComponentLoader: CL } = await import('adminjs');
    componentLoader = new CL();

    components = {
      Dashboard: componentLoader.add(
        'Dashboard',
        './components/dashboard/index',
      ),
      Avatar: componentLoader.add('Avatar', './components/avatar/index'),
    };
  }

  return { componentLoader, components };
};
