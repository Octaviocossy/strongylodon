import type { LucideIcon } from 'lucide-react';

import { cn } from '@/utilities';

interface ErrorProps {
  message: string;
  icon?: LucideIcon;
  className?: string;
}

export function Error(props: ErrorProps) {
  return (
    <p className={cn('font-medium text-sm italic mt-1 flex items-center space-x-1', props.className)}>
      {props.icon ? <props.icon className="h-4 w-4" /> : null}
      <span>{props.message}*</span>
    </p>
  );
}
