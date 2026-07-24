import { Viewer } from '@toast-ui/react-editor';
import classNames from 'classnames';
import { useMemo, type FC } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './styles.scss';

interface MarkdownViewerProps {
  source: string;
  className?: string;
}

/**
 * MarkdownViewer Component
 *
 * Uses Toast UI Editor's Viewer component to render markdown.
 * This ensures consistent rendering with the editor and properly preserves
 * HTML attributes like style and data-*.
 */
const MarkdownViewer: FC<MarkdownViewerProps> = ({ source, className }) => {
  const { themeExplicit } = useTheme();

  // a hack to force re-rendering when source changes
  const randKey = useMemo(() => `${Math.random()}`, [source]);

  return (
    <div
      className={classNames(className, 'markdown-editor', {
        'toastui-editor-dark markdown-editor-dark': themeExplicit === 'dark',
      })}
    >
      <Viewer key={randKey} initialValue={source || ''} />
    </div>
  );
};

export default MarkdownViewer;
