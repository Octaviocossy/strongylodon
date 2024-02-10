import { cn } from '@/utilities';

interface CenterProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export function Center({ children, className }: CenterProps) {
  return <div className={cn('flex justify-center items-center min-h-screen', className)}>{children}</div>;
}
