import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'condensed' | 'default' | 'expanded';
export type ButtonColor = 'destructive' | 'muted' | 'primary' | 'surface';
type BaseProps = { disabled?: boolean; variant?: ButtonVariant; color?: ButtonColor };
export type Props = (
  | ({ href: string } & HTMLAnchorAttributes)
  | ({ href?: never } & HTMLButtonAttributes)
) & BaseProps;

const VARIANTS: Record<ButtonVariant, string> = {
  condensed: 'ui:py-1 ui:px-2.5 ui:h-unset ui:text-xs ui:font-normal',
  default: 'ui:px-4 ui:py-2 ui:text-sm',
  expanded: 'ui:px-6 ui:py-3 ui:text-md'
};
const COLORS: Record<ButtonColor, string> = {
  destructive:
    'ui:bg-destructive-500 ui:text-white ui:hover:bg-destructive-500/90 ui:stroke-destructive',
  muted:
    'ui:bg-transparent ui:text-foreground ui:hover:bg-surface-50 ui:stroke-foreground ui:dark:text-white ui:dark:stroke-white ui:dark:hover:bg-surface-900 ui:disabled:bg-surface-50 ui:disabled:text-surface-200',
  primary:
    'ui:bg-primary ui:dark:bg-primary-800 ui:text-white ui:hover:bg-primary/90 ui:dark:hover:bg-primary-800/90 ui:stroke-white ui:disabled:bg-primary/75 ui:dark:disabled:bg-primary-800/75',
  surface:
    'ui:bg-surface-50 ui:dark:bg-surface-900 ui:dark:text-white ui:dark:stroke-white ui:dark:hover:bg-surface-900/90 ui:border ui:border-transparent ui:hover:border-surface-100 ui:dark:hover:border-surface-700 ui:disabled:bg-surface-50 ui:disabled:text-surface-400 ui:disabled:hover:border-surface-50'
};

export const sharedClasses = ({
  className,
  color,
  variant
}: { className?: null | string } & Required<Pick<BaseProps, 'color' | 'variant'>>) =>
  twMerge(
    'ui:whitespace-nowrap ui:rounded-full ui:font-medium ui:transition-all ui:focus-visible:scale-[0.975] ui:focus-visible:outline-hidden ui:active:scale-[0.975] ui:disabled:cursor-not-allowed ui:disabled:active:scale-100',
    VARIANTS[variant],
    COLORS[color],
    className
  );
