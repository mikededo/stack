import type { IconProps, Icon as LucideIcon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';
import { twMerge } from 'tailwind-merge';

export type IconButtonColor = 'primary' | 'secondary' | 'muted' | 'destructive';
export type IconButtonSizes = 'small' | 'default' | 'large';
export type BaseProps = {
  Icon: ComponentType<LucideIcon>;
  size?: IconButtonSizes;
  color?: IconButtonColor;
  href?: string;
  strokeWidth?: IconProps['strokeWidth'];
  wrapperClasses?: string;
  iconClasses?: string;
};

const ICON_SIZES: Record<IconButtonSizes, string> = {
  small: 'ui-size-4',
  default: 'ui-size-5',
  large: 'ui-size-6'
};
const ICON_WRAPPER_SIZES: Record<IconButtonSizes, string> = {
  small: 'ui-size-6',
  default: 'ui-size-8',
  large: 'ui-size-10'
};
const ICON_WRAPPER_CLASSES =
  'ui-flex ui-items-center ui-justify-center ui-rounded-full ui-hover:bg-muted ui-transition-colors ui-cursor-pointer';
const COLORS: Record<IconButtonColor, string> = {
  primary:
    'ui-bg-primary dark:ui-bg-primary-800 ui-text-white hover:ui-bg-primary/90 hover:dark:ui-bg-primary-800/90 ui-stroke-white disabled:ui-bg-primary/75 dark:disabled:ui-bg-primary-800/75',
  secondary:
    'ui-bg-secondary-50 dark:ui-bg-secondary-900 dark:ui-text-white dark:ui-stroke-white hover:ui-bg-secondary/80 dark:hover:ui-bg-secondary-900/90 ui-border ui-border-transparent hover:ui-border-secondary-100 dark:hover:ui-border-secondary-700',
  muted:
    'ui-bg-transparent ui-text-foreground hover:ui-bg-secondary-50 ui-stroke-foreground dark:ui-text-white dark:ui-stroke-white dark:hover:ui-bg-secondary-900 disabled:ui-bg-secondary-50 disabled:ui-text-secondary-200',
  destructive:
    'ui-bg-destructive ui-text-destructive-foreground hover:ui-bg-destructive/90 ui-stroke-destructive'
};

export const getWrapperClasses = ({
  size,
  color,
  classes
}: Required<Pick<BaseProps, 'size' | 'color'>> & { classes?: string }) =>
  twMerge(ICON_WRAPPER_CLASSES, ICON_WRAPPER_SIZES[size], COLORS[color ?? 'primary'], classes);

export const getIconClasses = ({
  size,
  classes
}: Required<Pick<BaseProps, 'size'>> & { classes?: string }) =>
  twMerge(ICON_SIZES[size], 'stroke-inherit', classes);
