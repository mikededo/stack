import plugin from 'tailwindcss/plugin';

const BOOL = ['false', 'true'];

const ARIA = {
  atomic: BOOL,
  autocomplete: ['inline', 'list', 'both'],
  busy: BOOL,
  checked: [...BOOL, 'mixed'],
  current: [...BOOL, 'page', 'step', 'location', 'date', 'time'],
  disabled: BOOL,
  dropeffect: ['none', 'copy', 'execute', 'link', 'move', 'popup'],
  errormessage: ['true'],
  expanded: BOOL,
  grabbed: BOOL,
  haspopup: ['menu', 'listbox', 'tree', 'grid', 'dialog', 'true'],
  hidden: BOOL,
  invalid: [...BOOL, 'grammar', 'spelling'],
  level: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  live: ['off', 'assertive', 'polite'],
  multiline: BOOL,
  multiselectable: BOOL,
  orientation: ['horizontal', 'vertical'],
  pressed: [...BOOL, 'mixed'],
  readonly: BOOL,
  relevant: ['additions-text', 'additions', 'all', 'removals', 'text'],
  required: BOOL,
  selected: BOOL,
  sort: ['none', 'ascending', 'descending', 'other']
};

const getSelector = (element: number | string, key: string) => {
  if (element === 'true') {
    return `aria-${key}`;
  } else if (element === 'false') {
    return `aria-not-${key}`;
  }

  return `aria-${key}-${element}`;
};

export const aria = () => plugin(({ addVariant }) => {
  let key: keyof typeof ARIA;
  for (key in ARIA) {
    if (ARIA[key] instanceof Function) {
      continue;
    }

    ARIA[key].forEach((element) => {
      const selector = getSelector(element, key);

      addVariant(selector, [`[aria-${key}="${element}"] &`, `&[aria-${key}="${element}"]`]);
      addVariant(`group-${selector}`, `.group[aria-${key}="${element}"] &`);
      addVariant(`peer-${selector}`, `.peer[aria-${key}="${element}"] ~ &`);
    });
  }
});
