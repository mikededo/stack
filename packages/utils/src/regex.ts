export const NAME_REGEX = /^[a-z\s]+$/i;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
export const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/;

export const HEX_REGEX = /^#([A-F0-9]{6}|[A-F0-9]{3})$/i;
