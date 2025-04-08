import type { IconProps, Icon as LucideIcon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

import { twMerge } from 'tailwind-merge';

export type IconButtonColor = 'destructive' | 'muted' | 'primary' | 'surface';
export type IconButtonSizes = 'default' | 'large' | 'small';
export type BaseProps = {
  Icon: ComponentType<LucideIcon>;
  href?: string;
  size?: IconButtonSizes;
  wrapperClasses?: string;
  color?: IconButtonColor;
  iconClasses?: string;
  strokeWidth?: IconProps['strokeWidth'];
};

const ICON_SIZES: Record<IconButtonSizes, string> = {
  default: 'size-5',
  large: 'size-6',
  small: 'size-4'
};
const ICON_WRAPPER_SIZES: Record<IconButtonSizes, string> = {
  default: 'size-8',
  large: 'size-10',
  small: 'size-6'
};
const ICON_WRAPPER_CLASSES =
  'flex items-center justify-center rounded-full hover:bg-muted transition-colors cursor-pointer';
const COLORS: Record<IconButtonColor, string> = {
  destructive: 'text-destructive-500 hover:bg-destructive-50 stroke-destructive-500',
  muted:
    'bg-transparent text-foreground hover:bg-surface-50 stroke-foreground dark:text-white dark:stroke-white dark:hover:bg-surface-900 disabled:bg-surface-50 disabled:text-surface-200',
  primary:
    'bg-primary dark:bg-primary-800 text-white hover:bg-primary/90 dark:hover:bg-primary-800/90 stroke-white disabled:bg-primary/75 dark:disabled:bg-primary-800/75',
  surface:
    'bg-surface-50 dark:bg-surface-900 dark:text-white dark:stroke-white hover:bg-surface/80 dark:hover:bg-surface-900/90 border border-transparent hover:border-surface-100 dark:hover:border-surface-700'
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
