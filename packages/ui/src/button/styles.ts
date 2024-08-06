import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'condensed' | 'default' | 'expanded';
export type ButtonColor = 'primary' | 'secondary' | 'muted' | 'destructive';
type BaseProps = { variant?: ButtonVariant; color?: ButtonColor; disabled?: boolean };
export type Props = BaseProps &
  ((HTMLAnchorAttributes & { href: string }) | (HTMLButtonAttributes & { href?: never }));

const VARIANTS: Record<ButtonVariant, string> = {
  condensed: 'ui-py-1 ui-px-2.5 ui-h-unset ui-text-xs ui-font-normal',
  default: 'ui-px-4 ui-py-2 ui-text-sm',
  expanded: 'ui-px-6 ui-py-3 ui-text-md'
};
const COLORS: Record<ButtonColor, string> = {
  primary:
    'ui-bg-primary dark:ui-bg-primary-800 ui-text-white hover:ui-bg-primary/90 hover:dark:ui-bg-primary-800/90 ui-stroke-white disabled:ui-bg-primary/75 dark:disabled:ui-bg-primary-800/75',
  secondary:
    'ui-bg-secondary-50 dark:ui-bg-secondary-900 dark:ui-text-white dark:ui-stroke-white dark:hover:ui-bg-secondary-900/90 ui-border ui-border-transparent hover:ui-border-secondary-100 dark:hover:ui-border-secondary-700 disabled:ui-bg-secondary-50 disabled:ui-text-secondary-400 disabled:hover:ui-border-secondary-50',
  muted:
    'ui-bg-transparent ui-text-foreground hover:ui-bg-secondary-50 ui-stroke-foreground dark:ui-text-white dark:ui-stroke-white dark:hover:ui-bg-secondary-900 disabled:ui-bg-secondary-50 disabled:ui-text-secondary-200',
  destructive:
    'ui-bg-destructive ui-text-destructive-foreground hover:ui-bg-destructive/90 ui-stroke-destructive'
};

export const sharedClasses = ({
  variant,
  color,
  className
}: Required<Pick<BaseProps, 'variant' | 'color'>> & { className?: string | null }) =>
  twMerge(
    'ui-whitespace-nowrap ui-rounded-lg ui-font-medium ui-transition-all focus-visible:ui-scale-[0.975] focus-visible:ui-outline-none active:ui-scale-[0.975] disabled:ui-cursor-not-allowed disabled:active:ui-scale-100',
    VARIANTS[variant],
    COLORS[color],
    className
  );
