import type { KeyboardEvent } from 'react';

const enterKeyDown = (enterCallback: () => void, escCallback?: () => void) => {
  return (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        if (escCallback) {
          event.preventDefault();
          escCallback();
        }
        break;
      case 'Enter':
        event.preventDefault();
        enterCallback();
        break;
    }
  };
};

export { enterKeyDown };
