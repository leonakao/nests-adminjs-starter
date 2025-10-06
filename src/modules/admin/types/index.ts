export type * from 'adminjs';
export type * from '@adminjs/nestjs';
export type * from './filters';

import type { Action, ActionResponse, PropertyOptions } from 'adminjs';
import { BaseEntity } from 'typeorm';

export type CustomAction = Partial<Action<ActionResponse>>;

export type ResourceProperties<T extends BaseEntity> = Partial<
  Record<keyof T, PropertyOptions>
> & {
  [key: string]: PropertyOptions;
};
