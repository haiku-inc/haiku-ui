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

## Native forms and dialogs

`Dialog`, `InputField`, `CheckboxField`, `UtcDateTimeField`, `Notice`, `Disclosure`, `DataTable` and
`Pagination` are native HTML components styled with Haiku theme tokens. They do not import or wrap MUI.
Import them from `haiku-ui` or their `haiku-ui/src/ui/` modules.

The only dropdown is `Floater`. Opened from inside a `Dialog` (or any native modal `<dialog>`), it renders its
menu inside that dialog so the top layer cannot hide it.

```tsx
import { Dialog, InputField, Notice } from 'haiku-ui';
import Button from 'haiku-ui/src/ui/Button';

<Dialog
  open={open}
  title="Orbit setup"
  onClose={cancel}
  actions={
    <Button.Primary type="button" onClick={apply}>
      Apply
    </Button.Primary>
  }
>
  <InputField
    label="Position X (km)"
    value={positionX}
    onChange={updatePositionX}
    description="In the declared inertial frame"
    error={positionError}
  />
  <Notice tone="info">Review the data coverage before applying.</Notice>
</Dialog>;
```

`Dialog` is controlled: Escape, the close button and a backdrop pointer gesture request `onClose`.
The owner closes it by setting `open` to false. It uses `showModal()` for the browser's top layer,
focus containment, inert background and focus restoration. Actions remain inside the modal.
Native dialogs require a browser with `HTMLDialogElement.showModal` support.

`UtcDateTimeField` accepts a UTC ISO string ending in `Z`, or an empty string. Its
`onValueChange` receives a normalized UTC ISO string, or an empty string when cleared. Native
editing never converts through the computer's local timezone. It retains incomplete edits while
reporting invalid required input; it never chooses a replacement instant.

Inputs and selects accept normal native HTML attributes. Labels, descriptions and error messages
are connected to their controls. Checkboxes use native `onChange` events. Native selection, disclosure,
and pagination controls preserve keyboard behavior. `DataTable` supplies table and scroll-region
semantics; applications provide their column headers, sorting buttons and row contents.
