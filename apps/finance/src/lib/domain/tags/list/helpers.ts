import { HEX_REGEX } from '@stack/utils';

export const isTagValid = (name: string, color: string) => name.length > 0 && HEX_REGEX.test(color);
