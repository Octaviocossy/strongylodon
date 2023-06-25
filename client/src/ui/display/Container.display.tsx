interface IProps {
  children: JSX.Element | JSX.Element[];
}

const Container: React.FC<IProps> = ({ children }) => {
  return <div className="max-w-3xl m-auto px-2">{children}</div>;
};

export default Container;
