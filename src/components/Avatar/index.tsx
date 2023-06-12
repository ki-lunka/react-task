import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

interface AvatarProps {
  name: string;
  imageUrl?: string;
}

const avatarStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
};

export const Avatar: React.FC<AvatarProps> = ({ name, imageUrl }) => {
  return (
    <div>
      {imageUrl ? (
        <Image src={imageUrl} alt="avatar" style={avatarStyle} roundedCircle />
      ) : (
        <Badge
          className="d-flex justify-content-center align-items-center"
          bg="info"
          style={avatarStyle}
        >
          <h3>{name[0].toUpperCase()}</h3>
        </Badge>
      )}
    </div>
  );
};
