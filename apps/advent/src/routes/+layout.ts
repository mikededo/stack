import type { LayoutLoad } from './$types';

import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import shellsessionLang from 'shiki/langs/shellscript.mjs';
import githubLightDefault from 'shiki/themes/github-light-default.mjs';

export const prerender = true;

export const load: LayoutLoad = async ({ url }) => {
  const modifiedTheme = {
    ...githubLightDefault,
    colors: {
      ...(githubLightDefault.colors ?? {}),
      'editor.background': '#000000'
    }
  };
  const highlighter = await createHighlighterCore({
    engine: createOnigurumaEngine(() => import('shiki/wasm')),
    langs: [shellsessionLang],
    themes: [modifiedTheme]
  });

  return { pathname: url.pathname, shiki: highlighter };
};
