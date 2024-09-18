import type { Icon as LucideIcon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export type Option = {
  text: string;
  destructive?: boolean;
  disabled?: boolean;
  Icon?: ComponentType<LucideIcon>;
  onClick?: () => void;
};
type Divider = 'divider';

export type ContextMenuOption = Divider | Option;
