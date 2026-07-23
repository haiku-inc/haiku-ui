import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  subtitle?: string;
}

/** Browser tab title; uses Helmet so only one `<title>` is reconciled with `PageSeo` and `index.html`. */
const PageTitle: FC<Props> = ({ title, subtitle }) => {
  const projectName = import.meta.env.VITE_REACT_APP_PROJECT_NAME;
  const documentTitle = `${title} | ${subtitle ? `${subtitle} | ` : ''}${projectName}`;
  return (
    <Helmet>
      <title>{documentTitle}</title>
    </Helmet>
  );
};

export default PageTitle;
