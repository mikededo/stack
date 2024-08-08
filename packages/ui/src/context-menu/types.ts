import type { Icon as LucideIcon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export type Option = {
  destructive?: boolean;
  disabled?: boolean;
  Icon?: ComponentType<LucideIcon>;
  onClick?: () => void;
  text: string;
};
type Divider = 'divider';

export type ContextMenuOption = Divider | Option;
