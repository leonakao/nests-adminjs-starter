import { BaseEntity, Between, FindOptionsWhere, In } from 'typeorm';
import { Filter } from '../types';

export const applyFilters = (
  filters: Filter['filters'],
): FindOptionsWhere<BaseEntity> | undefined => {
  const arrFilters = Object.entries(filters);

  const finalFilters: FindOptionsWhere<BaseEntity> = {};
  const arrayFilters: Record<string, string[]> = {};

  for (const [key, filterElement] of arrFilters) {
    if (key.includes('.') && typeof filterElement.value === 'string') {
      const [arrayName] = key.split('.');
      if (!arrayFilters[arrayName]) {
        arrayFilters[arrayName] = [];
      }
      arrayFilters[arrayName].push(filterElement.value);
    } else if (typeof filterElement.value === 'string') {
      finalFilters[key] = filterElement.value;
    } else if (typeof filterElement.value === 'object') {
      finalFilters[key] = Between(
        filterElement.value.from,
        filterElement.value.to,
      );
    }
  }

  for (const [arrayName, values] of Object.entries(arrayFilters)) {
    if (values.length > 0) {
      finalFilters[arrayName] = In(values);
    }
  }

  return finalFilters;
};
