interface IProps {
  children: JSX.Element | JSX.Element[];
}

const Center: React.FC<IProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {children}
    </div>
  );
};

export default Center;
