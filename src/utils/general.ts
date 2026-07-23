const objectFilter = <T>(obj: Record<string, T>, predicate: (value: T) => boolean) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .map((key) => obj[key]);

const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const determineProgressPercent = (positive: number, total: number) => {
  return (positive * 100) / total;
};
const determineProgressColor = (positive: number, total: number) => {
  const percentage = determineProgressPercent(positive, total);
  if (percentage > 85) {
    return 'success';
  }
  if (percentage > 70) {
    return 'primary';
  }
  if (percentage > 50) {
    return 'warning';
  }
  return 'error';
};

const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
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

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  return array?.reduce((acc: T[][], _, index, originalArray) => {
    if (index % chunkSize === 0) {
      const chunk = originalArray.slice(index, index + chunkSize);
      acc.push(chunk);
    }
    return acc;
  }, []);
}

const random25to60 = () => {
  return Math.floor(Math.random() * (60 - 25 + 1)) + 25;
};
const random5to25 = () => {
  return Math.floor(Math.random() * (30 - 10 + 1)) + 10;
};

function shuffleArray<T>(inArray: Array<T>) {
  const array = [...inArray];
  for (let i = array.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export {
  blobToBase64,
  chunkArray,
  copyToClipboard,
  determineProgressColor,
  determineProgressPercent,
  objectFilter,
  random25to60,
  random5to25,
  shuffleArray,
  sleep,
};
