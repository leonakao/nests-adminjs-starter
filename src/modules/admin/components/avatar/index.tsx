import React from 'react';
import { Avatar } from '@adminjs/design-system';

interface AvatarComponentProps {
  property: {
    path: string;
  };
  record: {
    params: Record<string, any>;
  };
}

const AvatarComponent: React.FC<AvatarComponentProps> = (props) => {
  const { property, record } = props;
  const value = record?.params?.[property.path];

  return <Avatar src={value} style={{ margin: 'auto' }} />;
};

export default AvatarComponent;
