declare module '*.scss';

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.avif';
declare module '*.svg' {
  const content: FunctionComponent<SVGAttributes<SVGElement>>;
  export default content;
}
