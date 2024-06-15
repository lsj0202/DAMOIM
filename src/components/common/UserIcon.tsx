import { cn } from '@/utils';
import classNames from 'classnames';
import { CSSProperties, HTMLAttributes } from 'react';
import { FaUser } from 'react-icons/fa';

type UserIconProps = {
  size?: number;
  iconSize?: number;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const UserIcon = ({ size = 40, iconSize = 20, className }: UserIconProps) => {
  const wrapperStyle: CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: 'slategray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const iconStyle: CSSProperties = {
    fontSize: iconSize,
    color: 'white',
  };

  return (
    <div style={wrapperStyle} className={cn(classNames(className))}>
      <FaUser style={iconStyle} />
    </div>
  );
};

export default UserIcon;
