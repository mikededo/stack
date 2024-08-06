import type { Icon as LucideIcon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export type Option = {
  text: string;
  Icon?: ComponentType<LucideIcon>;
  onClick?: () => void;
  destructive?: boolean;
  disabled?: boolean;
};
type Divider = 'divider';

export type ContextMenuOption = Option | Divider;
