import BoringAvatars from 'boring-avatars';

import { useAuthSelector } from '../../redux';

interface IProps {
  size?: number;
  name?: string;
}

const Avatar: React.FC<IProps> = ({ name, size = 40 }) => {
  const { userdata } = useAuthSelector();

  return (
    <div className="drop-shadow-xl">
      <BoringAvatars
        colors={['#4a9c4e', '#ffecb3', '#ffffff', '#2e7d32', '#66bb6a']}
        name={name ? name : userdata.username}
        size={size}
        variant="marble"
      />
    </div>
  );
};

export default Avatar;
