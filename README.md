# Haiku UI

## Use

Add to your css where tailwind is import, the source for:

```
@import 'tailwindcss';
@source "../node_modules/haiku-ui/src";
```

Add scss import to you main.tsx to have all styles:

```
import 'haiku-ui/src/styles/index.scss';
```

## Local development

For local development use `npm link` on this repo, then `npm link haiku-ui` on the destination repo right after `npm i`.

## CSS colors override

```
@mixin custom-light-theme {
  --primary: red;
}
@mixin custom-dark-theme {
  --primary: violet;
}
@mixin custom-universal-colors {
  --text-dark: blue;
}
@mixin custom-mui-theme-reset {
  --mui-palette-text-primary: var(--text-primary);
}


:root.light,
// Edit this to change default theme (and css file `toggle` and context var)
:root:not(.os-defined, .dark) {
  @include custom-light-theme;
  @include custom-mui-theme-reset;
  @include custom-universal-colors;
}

:root.dark {
  @include custom-dark-theme;
  @include custom-mui-theme-reset;
  @include custom-universal-colors;
}

// OS Default.
// Edit this to change default theme (and css file `toggle` and context var)
:root.os-defined {
  @media (prefers-color-scheme: light) {
    @include custom-light-theme;
  }

  @media (prefers-color-scheme: dark) {
    @include custom-dark-theme;
  }

  @include custom-mui-theme-reset;
  @include custom-universal-colors;
}
```
