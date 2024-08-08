import type { IconProps, Icon as LucideIcon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

import { twMerge } from 'tailwind-merge';

export type IconButtonColor = 'destructive' | 'muted' | 'primary' | 'secondary';
export type IconButtonSizes = 'default' | 'large' | 'small';
export type BaseProps = {
  color?: IconButtonColor;
  href?: string;
  Icon: ComponentType<LucideIcon>;
  iconClasses?: string;
  size?: IconButtonSizes;
  strokeWidth?: IconProps['strokeWidth'];
  wrapperClasses?: string;
};

const ICON_SIZES: Record<IconButtonSizes, string> = {
  default: 'ui-size-5',
  large: 'ui-size-6',
  small: 'ui-size-4'
};
const ICON_WRAPPER_SIZES: Record<IconButtonSizes, string> = {
  default: 'ui-size-8',
  large: 'ui-size-10',
  small: 'ui-size-6'
};
const ICON_WRAPPER_CLASSES =
  'ui-flex ui-items-center ui-justify-center ui-rounded-full ui-hover:bg-muted ui-transition-colors ui-cursor-pointer';
const COLORS: Record<IconButtonColor, string> = {
  destructive:
    'ui-bg-destructive ui-text-destructive-foreground hover:ui-bg-destructive/90 ui-stroke-destructive',
  muted:
    'ui-bg-transparent ui-text-foreground hover:ui-bg-secondary-50 ui-stroke-foreground dark:ui-text-white dark:ui-stroke-white dark:hover:ui-bg-secondary-900 disabled:ui-bg-secondary-50 disabled:ui-text-secondary-200',
  primary:
    'ui-bg-primary dark:ui-bg-primary-800 ui-text-white hover:ui-bg-primary/90 hover:dark:ui-bg-primary-800/90 ui-stroke-white disabled:ui-bg-primary/75 dark:disabled:ui-bg-primary-800/75',
  secondary:
    'ui-bg-secondary-50 dark:ui-bg-secondary-900 dark:ui-text-white dark:ui-stroke-white hover:ui-bg-secondary/80 dark:hover:ui-bg-secondary-900/90 ui-border ui-border-transparent hover:ui-border-secondary-100 dark:hover:ui-border-secondary-700'
};

export const getWrapperClasses = ({
  classes,
  color,
  size
}: { classes?: string } & Required<Pick<BaseProps, 'color' | 'size'>>) =>
  twMerge(ICON_WRAPPER_CLASSES, ICON_WRAPPER_SIZES[size], COLORS[color ?? 'primary'], classes);

export const getIconClasses = ({
  classes,
  size
}: { classes?: string } & Required<Pick<BaseProps, 'size'>>) =>
  twMerge(ICON_SIZES[size], 'stroke-inherit', classes);
