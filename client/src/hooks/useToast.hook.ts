import toast from 'react-hot-toast';

import { EToastPosition, EToastType } from '../models';

interface IProps {
  message: string;
  type: EToastType;
  position?: EToastPosition;
  icon?: string;
}

const useToast = () => {
  return {
    toast: ({
      message,
      type,
      icon,
      position = EToastPosition.TOP_RIGHT,
    }: IProps) =>
      toast[type](message, {
        position: position,
        duration: 5000,
        icon: icon && icon,
      }),
  };
};

export default useToast;
