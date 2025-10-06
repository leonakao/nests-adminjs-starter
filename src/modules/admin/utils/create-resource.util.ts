import { ResourceWithOptions } from '../types';

export const createResource = (
  resource: ResourceWithOptions,
): ResourceWithOptions => {
  const defaultOptions: ResourceWithOptions['options'] = {
    properties: {
      id: {
        isVisible: false,
      },
    },
    actions: {
      bulkDelete: {
        isAccessible: false,
      },
    },
  };

  return {
    ...resource,
    options: deepMerge(defaultOptions, resource.options),
    features: resource.features || [],
  };
};

const deepMerge = (obj1, obj2, log = false) => {
  const result = { ...obj1 };

  for (const key in obj2) {
    if (Object.hasOwn(obj2, key)) {
      if (obj2[key] instanceof Array && obj1[key] instanceof Array) {
        result[key] = [...obj1[key], ...obj2[key]];
      } else if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
        result[key] = deepMerge(obj1[key], obj2[key], log);
      } else {
        result[key] = obj2[key];
      }
    }
  }

  return result;
};
