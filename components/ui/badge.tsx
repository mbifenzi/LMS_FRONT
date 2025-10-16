import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        soft: 'border-transparent bg-muted text-muted-foreground [a&]:hover:bg-muted/80',
        ghost:
          'border-transparent bg-transparent text-foreground [a&]:hover:bg-accent/50',
        success:
          'border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 [a&]:hover:bg-emerald-500/20',
        warning:
          'border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-300 [a&]:hover:bg-amber-500/20',
        info: 'border-transparent bg-sky-500/15 text-sky-700 dark:text-sky-300 [a&]:hover:bg-sky-500/20',
      },
      size: {
        sm: 'px-2 py-0.5 text-[11px] [&>svg]:size-3',
        md: 'px-2.5 py-1 text-xs [&>svg]:size-3',
        lg: 'px-3 py-1.5 text-sm [&>svg]:size-[0.9rem]',
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      shape: 'rounded',
    },
  }
);

function Badge({
  className,
  variant,
  size,
  shape,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, shape }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
