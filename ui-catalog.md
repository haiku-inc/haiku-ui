## UI Component Catalog

### EMPTY_VALUE_FILLER

Import: `import { EMPTY_VALUE_FILLER } from 'haiku-ui';`
Use for: any place where a dash needed to mark that the value is empty.
Example: {!value ? EMPTY_VALUE_FILLER : value}

### Button

Import: `import { Button } from 'haiku-ui';`
Use for: any clickable action that triggers a mutation or navigation. Can be used as a compound component.

**Usage options:**

- `Button.[Variant]` (e.g., `<Button.Primary />`)
- `Button.Text.[Variant]` (e.g., `<Button.Text.Secondary />`)
- `Button.Filled.[Variant]` (e.g., `<Button.Filled.Error />`)

_Variants: `Error`, `Warning`, `Info`, `Primary`, `Secondary`, `Tertiary`, `Legendary`, `Epic`_

Props: color - css string, can use existing variables; icon - svg icon or other JSX element; onClick, children, className, disabled
Do NOT use for: navigation links that should be crawlable — use <Link> + Button variant="ghost" instead, or plain <a> for external links.
Example: <Button.Primary onClick={handleSave} disabled={disabled}>Save</Button>

"""
