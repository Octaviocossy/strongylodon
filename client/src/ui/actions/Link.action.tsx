import { Link as RRouterLink, useLocation } from 'react-router-dom';

interface IProps {
  to: string;
  styles?: string;
  text: string;
  underline?: boolean;
}

const Link: React.FC<IProps> = ({ to, text, underline }) => {
  const { pathname } = useLocation();

  return (
    <RRouterLink
      className={`font-semibold hover:underline ${
        underline && pathname === to && 'underline'
      }`}
      to={to}
    >
      {text}
    </RRouterLink>
  );
};

export default Link;
