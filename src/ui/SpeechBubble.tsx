import type { FC } from 'react';

interface Props {
  caption: string;
}
const SpeechBubble: FC<Props> = ({ caption }) => (
  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 animate-bounce">
    <div className="relative bg-white text-black px-3 py-2 rounded-lg shadow-lg border-2 border-gray-300">
      <div className="text-sm font-semibold">{caption}</div>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
    </div>
  </div>
);

export default SpeechBubble;
