import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Dialog from '..';

beforeEach(() => {
  // jsdom has no native top layer. Focus/inert behavior is verified in a real browser.
  Object.defineProperties(HTMLDialogElement.prototype, {
    showModal: {
      configurable: true,
      value: vi.fn(function (this: HTMLDialogElement) {
        this.setAttribute('open', '');
      }),
    },
    close: {
      configurable: true,
      value: vi.fn(function (this: HTMLDialogElement) {
        this.removeAttribute('open');
      }),
    },
  });
});
afterEach(() => vi.restoreAllMocks());

describe('native modal dialog', () => {
  it('labels the modal and keeps actions inside it; closing stays controlled by its owner', () => {
    const close = vi.fn();
    const { rerender } = render(
      <Dialog open title="Orbit setup" onClose={close} actions={<button type="button">Apply orbit</button>}>
        <input aria-label="Epoch" />
      </Dialog>,
    );
    const modal = screen.getByRole('dialog', { name: 'Orbit setup' });
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toContainElement(screen.getByRole('button', { name: 'Apply orbit' }));
    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(close).toHaveBeenCalledOnce();
    expect(modal).toHaveAttribute('open');
    rerender(
      <Dialog open={false} title="Orbit setup" onClose={close}>
        <p>Closed</p>
      </Dialog>,
    );
    expect(modal).not.toHaveAttribute('open');
  });
  it('requests dismissal on Escape without treating Enter as apply or closing during cleanup', () => {
    const close = vi.fn();
    const { unmount } = render(
      <Dialog open title="Orbit setup" onClose={close}>
        <input aria-label="Epoch" />
      </Dialog>,
    );
    fireEvent.keyDown(screen.getByLabelText('Epoch'), { key: 'Enter' });
    expect(close).not.toHaveBeenCalled();
    const event = new Event('cancel', { bubbles: false, cancelable: true });
    screen.getByRole('dialog').dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(close).toHaveBeenCalledOnce();
    unmount();
    expect(close).toHaveBeenCalledOnce();
  });
  it('keeps its native close event from reaching an enclosing onClose handler', () => {
    const outerClose = vi.fn();
    // An enclosing component that forwards `onClose` onto its DOM root, as a MUI modal does. The DOM types do not
    // declare `onClose` on a div, so it is passed through a spread.
    const outerProps = { onClose: outerClose };
    render(
      <div {...outerProps}>
        <Dialog open title="Orbit setup" onClose={vi.fn()}>
          <p>Nested</p>
        </Dialog>
      </div>,
    );
    screen.getByRole('dialog').dispatchEvent(new Event('close', { bubbles: false }));
    expect(outerClose).not.toHaveBeenCalled();
  });
});
