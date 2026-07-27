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
