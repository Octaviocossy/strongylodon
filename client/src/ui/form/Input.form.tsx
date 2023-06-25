import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

import { Error } from '..';
import { IBoomError } from '../../models';

interface IProps {
  type: string;
  label?: string;
  name?: string;
  error?: FieldErrors | IBoomError | undefined;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  styles?: string;
  containerStyles?: string;
}

const Input: React.FC<IProps> = (props) => (
  <section className={`flex flex-col mb-4 ${props.containerStyles}`}>
    {props.label && (
      <label className="font-semibold" htmlFor={props.name}>
        {props.label}
      </label>
    )}
    <input
      className={`border-2  border-gray-300 rounded-md my-1 p-2 ${
        props.error ? 'border-warn outline-warn' : 'outline-primary'
      } ${props.styles}`}
      {...props.register}
      id={props.name}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
    />
    {props.error && (
      <Error
        message={(props.error.message as string) || ''}
        styles={'text-warn'}
      />
    )}
  </section>
);

export default Input;
