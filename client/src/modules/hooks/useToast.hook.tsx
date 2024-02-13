import type { EToastType } from '@/models';

import toast from 'react-hot-toast';

import { EToastPosition } from '@/models';

interface ToastProps {
  message: string;
  type: EToastType;
  position?: EToastPosition;
  icon?: string;
}

export const useToast = () => {
  return {
    toast: ({ message, type, icon, position = EToastPosition.TopRight }: ToastProps) => {
      toast[type](message, {
        position: position,
        duration: 5000,
        icon: icon && icon,
        className: 'font-semibold text-sm',
      });
    },
  };
};
