import { validate } from 'class-validator';
import { ActionRequest, Before, PropertyErrors } from '../types';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export const validateForm =
  <T extends object>(dtoClass: ClassConstructor<T>): Before =>
  async (request: ActionRequest) => {
    if (request.method !== 'post') {
      return request;
    }

    const { flat, ValidationError } = await import('adminjs');
    const payload = flat.unflatten(request.payload);

    const instance = plainToInstance(dtoClass, payload);
    const errors = await validate(instance);

    if (errors.length > 0) {
      const propertiesWithError = errors.reduce((acc, error) => {
        acc[error.property] = {
          message: Object.values(error.constraints ?? {})[0],
        };
        return acc;
      }, {} as PropertyErrors);

      throw new ValidationError(propertiesWithError);
    }

    return request;
  };
