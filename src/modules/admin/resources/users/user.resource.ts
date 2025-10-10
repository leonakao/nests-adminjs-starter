import { NAVIGATION } from '../../navigations/navigation.config.js';
import { createResource } from '../../utils/create-resource.util.js';
import { userFormLayout, userShowLayout } from './user.layouts.js';
import { UserDto } from './user.dto.js';
import { validateForm } from '../../hooks/validate-form.before.js';
import { User } from '../../../database/entities/user.entity.js';

export const createUserResource = async () => {
  return await createResource({
    resource: User,
    options: {
      titleProperty: 'name',
      navigation: NAVIGATION.users,
      listProperties: ['name', 'email', 'isActive', 'createdAt'],
      filterProperties: ['name', 'email', 'isActive'],
      properties: {
        avatar: {
          type: 'string',
          isVisible: { list: false, filter: false, show: true, edit: true },
        },
        createdAt: {
          isVisible: { edit: false },
        },
        updatedAt: {
          isVisible: { edit: false },
        },
      },
      sort: {
        sortBy: 'createdAt',
        direction: 'desc',
      },
      actions: {
        show: { layout: userShowLayout },
        new: { before: [validateForm(UserDto)], layout: userFormLayout },
        edit: { before: [validateForm(UserDto)], layout: userFormLayout },
      },
    },
    features: [],
  });
};
