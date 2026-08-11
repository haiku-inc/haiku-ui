import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

// The problem is that the import resolves to a string (the URL),
// so <ImportedName /> becomes <"data:image..." /> which is invalid.
// We must ensure that any SVG import returns a functional component.

const MockSVG = (props: React.ComponentProps<'svg'>) => React.createElement('svg', props);

vi.mock('*.svg', () => ({
  default: MockSVG,
}));

// Specifically match the path-based resolution used in CardTitle
// We use the full path to ensure it matches the import statement in CardTitle.tsx
vi.mock('../assets/images/card/title-veral.svg', () => ({
  default: MockSVG,
}));

// We also mock relative imports that might resolve to strings in some environments
vi.mock('./assets/images/card/title-universal.svg', () => ({
  default: MockSVG,
}));
