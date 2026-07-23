import image0 from '@/assets/images/woh-bg-main-0.avif';
import image1 from '@/assets/images/woh-bg-main-1.avif';
import image2 from '@/assets/images/woh-bg-main-2.avif';
import image3 from '@/assets/images/woh-bg-main-3.avif';
import image4 from '@/assets/images/woh-bg-main-4.avif';
import image5 from '@/assets/images/woh-bg-main-5.avif';
import image6 from '@/assets/images/woh-bg-main-6.avif';
import image7 from '@/assets/images/woh-bg-main-7.avif';
import image8 from '@/assets/images/woh-bg-main-8.avif';
import image9 from '@/assets/images/woh-bg-main-9.avif';

const getCoordinatesInDocument = (element: HTMLElement) => {
  const box = element.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
};

const scrollToElement = (element: HTMLElement | HTMLDivElement | null, YOffset?: number) => {
  if (!element) {
    return;
  }
  const box = element.getBoundingClientRect();
  window.scrollTo({
    top: box.top + window.pageYOffset - (YOffset ?? 0),
    left: box.left + window.pageXOffset,
    behavior: 'smooth',
  });
};

const defaultBackground = () => {
  const images = [image0, image1, image2, image3, image4, image5, image6, image7, image8, image9];
  return images[Math.floor(Math.random() * 10)];
};

export { defaultBackground, getCoordinatesInDocument, scrollToElement };
