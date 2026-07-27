import type { FC } from 'react';

interface Props {
  title: string;
  subtitle?: string;
}

/** Browser tab title; uses Helmet so only one `<title>` is reconciled with `PageSeo` and `index.html`. */
const PageTitle: FC<Props> = ({ title, subtitle }) => {
  const projectName = import.meta.env.VITE_REACT_APP_PROJECT_NAME;
  const documentTitle = `${title} | ${subtitle ? `${subtitle} | ` : ''}${projectName}`;
  return <title>{documentTitle}</title>;
};

export default PageTitle;
