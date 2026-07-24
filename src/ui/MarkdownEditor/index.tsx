/* eslint-disable @typescript-eslint/no-explicit-any */
import chart from '@toast-ui/editor-plugin-chart';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import type { EditorProps } from '@toast-ui/react-editor';
import { Editor } from '@toast-ui/react-editor';
import classNames from 'classnames';
import { useEffect, useRef, type FC } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './styles.scss';

/**
 * Toolbar and Color Picker Utilities
 */
function createToolbarItemOption(colorPickerContainer: HTMLDivElement) {
  return {
    name: 'color',
    tooltip: 'Text color',
    className: 'css-var-color-selector-button',
    popup: {
      body: colorPickerContainer,
      style: { width: 'auto' },
    },
  };
}

function createSelection(tr: any, selection: any, SelectionClass: any, openTag: string, closeTag: string) {
  const { mapping, doc } = tr;
  const { from, to, empty } = selection;
  const mappedFrom = mapping.map(from) + openTag.length;
  const mappedTo = mapping.map(to) - closeTag.length;

  return empty ? SelectionClass.create(doc, mappedTo, mappedTo) : SelectionClass.create(doc, mappedFrom, mappedTo);
}

function createColorHeading(title: string) {
  const element = document.createElement('h4');

  element.setAttribute('class', 'w-full! text-bold mb-2');
  element.textContent = title;

  return element;
}

function createColorStack(cssVarNames: string[]) {
  const div = document.createElement('div');
  div.setAttribute('class', 'flex gap-2 mb-4');

  cssVarNames.forEach((cssVarName) => {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('style', `background: var(${cssVarName}); color: var(${cssVarName});`);
    button.setAttribute('class', !cssVarName ? 'w-full! border! border-red-400' : 'w-10!');
    button.setAttribute('data-variable', cssVarName);
    button.textContent = !cssVarName ? 'reset' : '__';
    div.appendChild(button);
  });

  return div;
}

/**
 * Image Style Plugin
 * Preserves inline styles on <img> tags when switching between Markdown and WYSIWYG modes.
 * Uses ProseMirror custom node views to apply styles directly to image DOM elements.
 */
function imageStylePlugin() {
  return function (context: any) {
    const { pmState } = context;

    // Storage for image styles - maps image src to style attribute value
    const imageStyleStorage = new Map<string, string>();

    // Create a ProseMirror plugin that provides custom node views for images
    const styleDecorationPlugin = pmState?.Plugin
      ? new pmState.Plugin({
          props: {
            // Custom node views for images
            nodeViews: {
              image(node: any) {
                const dom = document.createElement('img');
                dom.setAttribute('src', node.attrs.src || '');
                if (node.attrs.alt) dom.setAttribute('alt', node.attrs.alt);
                if (node.attrs.title) dom.setAttribute('title', node.attrs.title);

                // Try to get style from storage
                const storedStyle = imageStyleStorage.get(node.attrs.src);
                if (storedStyle) {
                  dom.setAttribute('style', storedStyle);
                }

                return {
                  dom,
                  update(updatedNode: any) {
                    if (updatedNode.type.name !== 'image') return false;

                    dom.setAttribute('src', updatedNode.attrs.src || '');
                    if (updatedNode.attrs.alt) {
                      dom.setAttribute('alt', updatedNode.attrs.alt);
                    } else {
                      dom.removeAttribute('alt');
                    }
                    if (updatedNode.attrs.title) {
                      dom.setAttribute('title', updatedNode.attrs.title);
                    } else {
                      dom.removeAttribute('title');
                    }

                    // Reapply stored style
                    const storedStyle = imageStyleStorage.get(updatedNode.attrs.src);
                    if (storedStyle) {
                      dom.setAttribute('style', storedStyle);
                    }

                    return true;
                  },
                  stopEvent: () => false,
                  ignoreMutation: () => true,
                };
              },
            },
          },
          view() {
            return {
              update(view: any) {
                // Extract image styles from document content and populate storage
                // This runs on every document update in WYSIWYG mode
                const markdown = view.state.doc.textContent || '';
                const imgRegex = /<img[^>]+>/gi;
                const images = markdown.match(imgRegex) || [];

                images.forEach((img: string) => {
                  const srcMatch = img.match(/src=["']([^"']+)["']/);
                  const styleMatch = img.match(/style=["']([^"']+)["']/);

                  if (srcMatch && styleMatch) {
                    imageStyleStorage.set(srcMatch[1], styleMatch[1]);
                  }
                });
              },
            };
          },
        })
      : undefined;

    const plugins = styleDecorationPlugin ? [styleDecorationPlugin] : [];

    return {
      wysiwygPlugins: plugins,
      // Render images with styles preserved when converting to HTML
      toHTMLRenderers: {
        htmlBlock: {
          img(node: any, { entering }: any) {
            if (entering) {
              const attrs: Record<string, string> = {};
              if (node.attrs.src) attrs.src = node.attrs.src;
              if (node.attrs.alt) attrs.alt = node.attrs.alt;
              if (node.attrs.title) attrs.title = node.attrs.title;

              const storedStyle = imageStyleStorage.get(node.attrs.src);
              if (storedStyle) attrs.style = storedStyle;

              return {
                type: 'openTag',
                tagName: 'img',
                attributes: attrs,
              };
            }
            return { type: 'closeTag', tagName: 'img' };
          },
        },
      },
      // Render images with styles preserved when converting back to Markdown
      toMarkdownRenderers: {
        htmlBlock: {
          img(node: any) {
            const { src, alt, title } = node.attrs || {};
            const storedStyle = src ? imageStyleStorage.get(src) : null;

            let html = '<img';
            if (src) html += ` src="${src}"`;
            if (alt) html += ` alt="${alt}"`;
            if (title) html += ` title="${title}"`;
            if (storedStyle) html += ` style="${storedStyle}"`;
            html += ' />';

            return {
              rawHTML: html,
            };
          },
        },
      },
    };
  };
}

/**
 * Color Syntax Plugin
 * Adds a custom color picker to the toolbar for styling text with CSS variables.
 * Supports both Markdown and WYSIWYG modes.
 */
function colorSyntax2Plugin(context: any) {
  const { eventEmitter, pmState } = context;
  const container = document.createElement('div');

  container.addEventListener('click', (ev) => {
    const target = ev.target as HTMLElement;
    if (target.getAttribute('type') === 'button') {
      const varName = target.getAttribute('data-variable');
      eventEmitter.emit('command', 'color', { selectedColor: varName });
      eventEmitter.emit('closePopup');
    }
  });

  container.appendChild(createColorHeading('Primary colors'));
  container.appendChild(createColorStack(['--primary', '--secondary', '--tertiary', '--quinary']));

  container.appendChild(createColorHeading('Alert colors'));
  container.appendChild(createColorStack(['--text-error', '--text-success', '--text-warning', '--text-info']));

  container.appendChild(createColorHeading('Reset colors (WYSIWYG only)'));
  container.appendChild(createColorStack(['']));

  const toolbarItem = createToolbarItemOption(container);

  return {
    // Markdown mode: Wrap selected text with inline HTML
    markdownCommands: {
      color: ({ selectedColor }: { selectedColor: string }, { tr, selection, schema }: any, dispatch: any) => {
        if (!selectedColor) return false;

        const slice = selection.content();
        const textContent = slice.content.textBetween(0, slice.content.size, '\n');
        const openTag = `<span style="color: var(${selectedColor})">`;
        const closeTag = `</span>`;
        const colored = `${openTag}${textContent}${closeTag}`;

        tr.replaceSelectionWith(schema.text(colored)).setSelection(
          createSelection(tr, selection, pmState.TextSelection, openTag, closeTag),
        );

        dispatch!(tr);
        return true;
      },
    },
    // WYSIWYG mode: Apply color using ProseMirror marks
    wysiwygCommands: {
      color: ({ selectedColor }: { selectedColor: string }, { tr, selection, schema }: any, dispatch: any) => {
        const { from, to } = selection;

        if (selectedColor) {
          const attrs = { htmlAttrs: { style: `color: var(${selectedColor})` } };
          const mark = schema.marks.span.create(attrs);
          tr.addMark(from, to, mark);
          dispatch!(tr);
          return true;
        }

        // Reset: remove color marks
        tr.removeMark(from, to);
        dispatch!(tr);
        return true;
      },
    },
    toolbarItems: [
      {
        groupIndex: 0,
        itemIndex: 3,
        item: toolbarItem,
      },
    ],
    toHTMLRenderers: {
      htmlInline: {
        span(node: any, { entering }: any) {
          return entering
            ? { type: 'openTag', tagName: 'span', attributes: node.attrs! }
            : { type: 'closeTag', tagName: 'span' };
        },
      },
    },
  };
}

/**
 * MarkdownEditor Component
 *
 * A wrapper around Toast UI Editor with custom plugins for:
 * - Chart rendering
 * - Code syntax highlighting
 * - Color syntax (CSS variable-based text coloring)
 * - Table cell merging
 * - UML diagram rendering
 * - Image style preservation (maintains inline styles on img tags)
 *
 * Features:
 * - Dual-mode editing (Markdown and WYSIWYG)
 * - Dark theme support
 * - Preserves HTML attributes on images and other elements
 * - Vertical preview pane
 */
const MarkdownEditor: FC<EditorProps> = ({ initialValue, onChange, initialEditType = 'markdown' }) => {
  const { themeExplicit } = useTheme();
  const editorRef = useRef<Editor>(null);
  const imageStyleMapRef = useRef<Map<string, string>>(new Map());
  const isConvertingRef = useRef<boolean>(false);

  /**
   * Initialize image storage from initial value
   * Extracts all <img> tags and stores their complete HTML for later restoration
   */
  useEffect(() => {
    if (!initialValue) return;

    // Extract all images with their complete HTML
    const imgRegex = /<img[^>]+>/gi;
    const images = initialValue.match(imgRegex) || [];

    images.forEach((img: string) => {
      const srcMatch = img.match(/src=["']([^"']+)["']/);
      if (srcMatch) {
        const src = srcMatch[1];
        imageStyleMapRef.current.set(src, img);
      }
    });

    // Apply styles to DOM if editor starts in WYSIWYG mode
    const timer = setTimeout(() => {
      const editorInstance = editorRef.current?.getInstance();
      if (!editorInstance) return;

      const currentMode = (editorInstance as any).currentMode || (editorInstance as any).mode;
      if (currentMode === 'wysiwyg') {
        const editorEl =
          editorInstance.getEditorElements?.()?.wwEditor || document.querySelector('.toastui-editor-ww-container');

        if (editorEl) {
          imageStyleMapRef.current.forEach((imgHtml: string, src: string) => {
            const styleMatch = imgHtml.match(/style=["']([^"']+)["']/);
            if (styleMatch) {
              const style = styleMatch[1];
              const imgElements = editorEl.querySelectorAll(`img[src="${CSS.escape(src)}"]`);
              imgElements.forEach((imgEl: HTMLElement) => {
                imgEl.setAttribute('style', style);
              });
            }
          });
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [initialValue]);

  /**
   * Monitor editor changes and restore/apply image styles
   * - In Markdown mode: Restores full image HTML if attributes are stripped
   * - In WYSIWYG mode: Applies styles directly to DOM elements for visual display
   *
   * Runs every 100ms to detect and correct any attribute stripping by the editor
   */
  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (!editorInstance) return;

    const checkAndRestore = () => {
      try {
        const currentMarkdown = editorInstance.getMarkdown();
        const currentMode = (editorInstance as any).currentMode || (editorInstance as any).mode;

        if (currentMode === 'markdown') {
          // Markdown mode: Restore original image HTML if it was reformatted
          const imgRegex = /<img[^>]+>/gi;
          const currentImages = currentMarkdown.match(imgRegex) || [];
          let needsRestore = false;

          for (const img of currentImages) {
            const srcMatch = img.match(/src=["']([^"']+)["']/);
            if (srcMatch) {
              const src = srcMatch[1];
              const originalImg = imageStyleMapRef.current.get(src);
              if (originalImg && originalImg !== img) {
                needsRestore = true;
                break;
              }
            }
          }

          if (needsRestore) {
            let restoredMarkdown = currentMarkdown;
            imageStyleMapRef.current.forEach((originalImg: string, src: string) => {
              const escapedSrc = src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              const imgRegex = new RegExp(`<img[^>]*src=["']${escapedSrc}["'][^>]*>`, 'gi');
              restoredMarkdown = restoredMarkdown.replace(imgRegex, originalImg);
            });

            if (restoredMarkdown !== currentMarkdown) {
              editorInstance.setMarkdown(restoredMarkdown, false);
            }
          }
        } else if (currentMode === 'wysiwyg') {
          // WYSIWYG mode: Apply styles directly to DOM for visual display
          const editorEl =
            editorInstance.getEditorElements?.()?.wwEditor ||
            document.querySelector('.toastui-editor-ww-container .ProseMirror');

          if (editorEl) {
            imageStyleMapRef.current.forEach((imgHtml: string, src: string) => {
              const styleMatch = imgHtml.match(/style=["']([^"']+)["']/);
              if (!styleMatch) return;

              const style = styleMatch[1];
              const imgElements = editorEl.querySelectorAll(`img[src="${CSS.escape(src)}"]`);

              imgElements.forEach((imgEl: HTMLElement) => {
                if (imgEl.getAttribute('style') !== style) {
                  imgEl.setAttribute('style', style);
                }
              });
            });
          }
        }
      } catch {
        // Silently handle any errors to prevent monitoring from crashing
      }
    };

    const interval = setInterval(checkAndRestore, 100);
    return () => clearInterval(interval);
  }, []);

  /**
   * Handle editor content changes
   * Tracks new images with styles and ensures all image HTML is preserved
   * Also converts <b> tags to markdown bold syntax
   */
  const handleChange = () => {
    const editorInstance = editorRef.current?.getInstance();
    if (!editorInstance) return;

    // Prevent infinite loops from setMarkdown triggering handleChange
    if (isConvertingRef.current) return;

    let markdown = editorInstance.getMarkdown();

    // Check if there are <b> tags that need conversion
    if (markdown.includes('<b>')) {
      const convertedMarkdown = markdown.replace(/<b>(.*?)<\/b>/gi, '**$1**');

      if (convertedMarkdown !== markdown) {
        // Set flag to prevent re-entry
        isConvertingRef.current = true;

        // Update the editor's content with converted markdown
        editorInstance.setMarkdown(convertedMarkdown, false);
        markdown = convertedMarkdown;

        // Reset flag after a short delay
        setTimeout(() => {
          isConvertingRef.current = false;
        }, 100);
      }
    }

    // Track any new images with style attributes
    const imgRegex = /<img[^>]+>/gi;
    const images = markdown.match(imgRegex) || [];

    images.forEach((img: string) => {
      const srcMatch = img.match(/src=["']([^"']+)["']/);
      if (srcMatch && img.includes('style=')) {
        imageStyleMapRef.current.set(srcMatch[1], img);
      }
    });

    // Restore original image HTML to prevent attribute stripping
    imageStyleMapRef.current.forEach((originalImg, src) => {
      const escapedSrc = src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const imgRegex = new RegExp(`<img[^>]*src=["']${escapedSrc}["'][^>]*>`, 'gi');
      markdown = markdown.replace(imgRegex, originalImg);
    });

    onChange(markdown);
  };

  return (
    <div
      className={classNames('markdown-editor', {
        'toastui-editor-dark markdown-editor-dark': themeExplicit === 'dark',
      })}
    >
      <Editor
        ref={editorRef}
        initialValue={initialValue || ' '}
        previewStyle="vertical"
        height="400px"
        initialEditType={initialEditType}
        useCommandShortcut={true}
        onChange={handleChange}
        plugins={[chart, codeSyntaxHighlight, colorSyntax2Plugin, tableMergedCell, uml, imageStylePlugin]}
        customHTMLSanitizer={(html: string) => html} // Disable sanitization to preserve all HTML attributes
        extendedAutolinks={true}
      />
    </div>
  );
};

export default MarkdownEditor;
