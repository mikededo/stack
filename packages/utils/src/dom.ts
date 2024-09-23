// Credit:
//  - https://stackoverflow.com/a/30753870
const focusableSelector = [
  '[contentEditable=true]',
  '[tabindex]',
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'iframe',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])'
]
  .map(selector => `${selector}:not([tabindex='-1'])`)
  .join(',');

export const getFocusableElements = (
  container: HTMLElement | null = document.body
) =>
  container == null
    ? []
    : Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));
