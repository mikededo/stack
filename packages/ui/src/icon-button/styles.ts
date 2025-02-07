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
  default: 'ui:size-5',
  large: 'ui:size-6',
  small: 'ui:size-4'
};
const ICON_WRAPPER_SIZES: Record<IconButtonSizes, string> = {
  default: 'ui:size-8',
  large: 'ui:size-10',
  small: 'ui:size-6'
};
const ICON_WRAPPER_CLASSES =
  'ui:flex ui:items-center ui:justify-center ui:rounded-full ui-hover:bg-muted ui:transition-colors ui:cursor-pointer';
const COLORS: Record<IconButtonColor, string> = {
  destructive: 'ui:text-destructive-500 ui:hover:bg-destructive-50 ui:stroke-destructive-500',
  muted:
    'ui:bg-transparent ui:text-foreground ui:hover:bg-surface-50 ui:stroke-foreground ui:dark:text-white ui:dark:stroke-white ui:dark:hover:bg-surface-900 ui:disabled:bg-surface-50 ui:disabled:text-surface-200',
  primary:
    'ui:bg-primary ui:dark:bg-primary-800 ui:text-white ui:hover:bg-primary/90 ui:dark:hover:bg-primary-800/90 ui:stroke-white ui:disabled:bg-primary/75 ui:dark:disabled:bg-primary-800/75',
  surface:
    'ui:bg-surface-50 ui:dark:bg-surface-900 ui:dark:text-white ui:dark:stroke-white ui:hover:bg-surface/80 ui:dark:hover:bg-surface-900/90 ui:border ui:border-transparent ui:hover:border-surface-100 ui:dark:hover:border-surface-700'
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
