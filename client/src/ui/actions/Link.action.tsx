import { Link as RRouterLink } from 'react-router-dom';

interface IProps {
  to: string;
  className?: string;
  text: string;
  underline?: boolean;
}

const Link: React.FC<IProps> = ({ to, text, underline, className }) => {
  return (
    <RRouterLink
      className={`hover:underline ${underline && 'underline'} ${className}`}
      to={to}
    >
      {text}
    </RRouterLink>
  );
};

export default Link;
