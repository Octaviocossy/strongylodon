interface IProps {
  text: string;
  styles?: string;
}

const Submit: React.FC<IProps> = (props) => {
  return (
    <input
      className={`p-2 bg-blackprimary transition-colors rounded-md cursor-pointer 
      text-white hover:bg-primary font-semibold ${props.styles} `}
      type="submit"
      value={props.text}
    />
  );
};

export default Submit;
