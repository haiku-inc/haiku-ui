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

// Explicitly Light
:root.light {
  @include custom-light-theme;
  @include custom-mui-theme-reset;
  @include custom-universal-colors;
}

// Explicitly Dark
:root.dark {
  @include custom-dark-theme;
  @include custom-mui-theme-reset;
  @include custom-universal-colors;
}

// Implicit theme set (to os-defined) if no explicit theme is set.
:root:not(.os-defined, .dark, .light),
// Explicitly OS Default.
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

## Some elements

# Tooltip

Set attribute on element `data-tooltip` with tooltip text.

It also has control attributes (number):

- data-tooltip-width
- data-tooltip-height
- data-tooltip-left
- data-tooltip-right
- data-tooltip-bottom
- data-tooltip-top

# Colorful highlights

Set classname `border-highlight` or `border-highlight-2` for colorful highlight.

# Horizontal line snaps

Use a container with children `div` and set to it class `snap-scroll-block`.
