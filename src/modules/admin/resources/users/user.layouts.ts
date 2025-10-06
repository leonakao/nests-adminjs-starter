import type { LayoutElementFunction } from '../../types';

export const userShowLayout: LayoutElementFunction = () => {
  return [['name'], ['email'], ['avatar'], ['isActive']];
};

export const userFormLayout: LayoutElementFunction = () => {
  return [
    [
      {
        flex: true,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
      [
        ['name', { minWidth: '45%' }],
        ['email', { minWidth: '45%' }],
        ['avatar', { minWidth: '45%' }],
        ['isActive', { minWidth: '45%' }],
      ],
    ],
  ];
};
