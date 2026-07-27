const random25to60 = () => {
  return Math.floor(Math.random() * (60 - 25 + 1)) + 25;
};
const random5to25 = () => {
  return Math.floor(Math.random() * (30 - 10 + 1)) + 10;
};

const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    fallbackCopyToClipboard(text);
  }
};

const fallbackCopyToClipboard = (text: string): void => {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid showing the textarea
  textArea.style.position = 'absolute';
  textArea.style.left = '-9999px';
  textArea.style.top = '-9999px';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch {
    // do nothing.
  }

  document.body.removeChild(textArea);
};

export { copyToClipboard, random25to60, random5to25 };
