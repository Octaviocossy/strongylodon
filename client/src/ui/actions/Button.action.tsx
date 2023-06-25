import { ButtonHTMLAttributes } from 'react';

import { Spinner } from '..';

interface IProps {
  text: string;
  styles?: string;
  loading?: boolean;
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const Button: React.FC<IProps> = (props) => {
  return (
    <button
      className={`p-2 transition-colors rounded-md cursor-pointer font-semibold ${props.styles} `}
      type={props.type}
    >
      {props.loading ? (
        <div className="flex justify-center">
          <Spinner color="text-white" styles={'h-[1.5rem], w-[1.5rem]'} />{' '}
        </div>
      ) : (
        props.text
      )}
    </button>
  );
};

export default Button;
