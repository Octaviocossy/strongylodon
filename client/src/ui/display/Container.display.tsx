interface IProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const Container: React.FC<IProps> = ({ className, children }) => {
  return <div className={`max-w-3xl m-auto px-4 ${className}`}>{children}</div>;
};

export default Container;
