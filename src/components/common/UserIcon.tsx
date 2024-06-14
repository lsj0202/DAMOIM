import { CSSProperties } from 'react';
import { FaUser } from 'react-icons/fa';

type UserIconProps = {
  size?: number;
  iconSize?: number;
};
// & HTMLAttributes<HTMLDivElement>;

const UserIcon = ({ size = 40, iconSize = 20 }: UserIconProps) => {
  const wrapperStyle: CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: 'slategray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  const iconStyle: CSSProperties = {
    fontSize: iconSize,
    color: 'white',
  };

  return (
    <div style={wrapperStyle}>
      <FaUser style={iconStyle} />
    </div>
  );
};

export default UserIcon;
