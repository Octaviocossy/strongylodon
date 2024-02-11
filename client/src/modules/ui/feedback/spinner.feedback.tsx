import { cn } from '@/utilities';

interface SpinnerProps {
  className?: string;
  variant?: 'default' | 'green' | 'red' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null | undefined;
}

const variants: Record<string, { circle: string; path: string }> = {
  default: { circle: 'text-primary', path: 'text-primary' },
  green: { circle: 'text-green-700 dark:text-green-300', path: 'text-green-700 dark:text-green-300' },
  red: { circle: 'text-red-700 dark:text-red-300', path: 'text-red-700 dark:text-red-300' },
  destructive: { circle: 'text-destructive', path: 'text-destructive' },
  outline: { circle: 'text-accent', path: 'text-accent' },
  secondary: { circle: 'text-secondary', path: 'text-secondary' },
  ghost: { circle: 'text-accent', path: 'text-accent' },
  link: { circle: 'text-primary', path: 'text-primary' },
};

export function Spinner({ className, variant }: SpinnerProps) {
  return (
    <svg className={cn('animate-spin', className)} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle
        className={cn('opacity-25', variant ? variants[variant].circle : variants.default.circle)}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className={cn('opacity-85', variant ? variants[variant].path : variants.default.path)}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
  );
}
