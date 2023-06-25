interface IProps {
  message: string;
  styles: string;
}

const Error: React.FC<IProps> = (props) => {
  return (
    <p className={`font-medium italic ${props.styles} mt-1`}>
      | {props.message}*
    </p>
  );
};

export default Error;
