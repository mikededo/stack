---
title: Styles - Tailwind
editLink: true
---

# Styles

All applications in `@stack` are based using [Tailwind
CSS](https://tailwindcss.com/). One important thing to note, is that each
package or application has its own generated `styles.css` file. Furthermore, if
an app is using a package (such as `@stack/ui`) that has its own `styles.css`
file, this will be imported in the app's global CSS definition. This could mean
that the combination of some packages could result in a lot of CSS being
generated, since for each package, there would be an entire Tailwind stylesheet
generated, plus the app's own.

## Package CSS relationship

The following list, shows the relationship between packages. If you import a
package from `root`, as well as any of `leaf`, you **do not need to import the
`leaf` package generated CSS**. This is because the `root` package already
imports the `leaf` package generated CSS.

| Root package | Leaf package | Generated CSS |
| ------------ | ------------ | ------------- |

This also applies to tailwind functions and utilities (`@base`,`@components` and
`@utilities`). If you import a package that exports a `styles.css`, and you
reference that import, there's no need to import the rest from Tailwind.

::: tip NOTE
In order to avoid class collisions, each package has its own Tailwind class
prefix. In apps, it's recommended not to use any prefix, as apps should always
be the end of this import mess.
:::
