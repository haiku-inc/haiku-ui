import { useLayoutSetup } from '@/context/LayoutContext';
import PageTitle from '@/ui/PageTitle';
import SkeletonText from '@/ui/SkeletonText';
import Text from '@/ui/Text';
import { useLayoutEffect, type FC, type PropsWithChildren } from 'react';
import Action from './Action';
import Pill from './Pill';

interface Props {
  title: string;
  subtitle?: string;
  isLoading?: boolean;
}

const Heading: FC<Props> = ({ title, subtitle, isLoading }) => {
  const { isExpandedLayout, setPageTitle } = useLayoutSetup();

  useLayoutEffect(() => {
    setPageTitle(title, subtitle);
  }, [title, subtitle, setPageTitle]);

  if (isExpandedLayout) {
    return isLoading ? null : <PageTitle title={title} subtitle={subtitle} />;
  }

  return isLoading ? (
    <div className="m-h-8 flex items-center mb-5! sm:mr-3! sm:mb-0! w-full">
      <SkeletonText />
    </div>
  ) : (
    <div className="m-h-8 flex items-center mb-0! sm:mr-3!">
      <PageTitle title={title} subtitle={subtitle} />
      {!isExpandedLayout && <Text.HeadingPage>{title}</Text.HeadingPage>}
    </div>
  );
};

const SectionHeader: FC<PropsWithChildren<Props>> = ({ children, title, subtitle, isLoading }) => {
  const { isExpandedLayout } = useLayoutSetup();

  if (isExpandedLayout) {
    return <Heading title={title} subtitle={subtitle} isLoading={isLoading} />;
  }

  return (
    <div className="flex flex-col justify-between items-center sm:flex-row">
      {!children ? (
        <Heading title={title} subtitle={subtitle} isLoading={isLoading} />
      ) : (
        <>
          <Heading title={title} subtitle={subtitle} isLoading={isLoading} />
          <div className="flex gap-1 flex-col mt-3 sm:mt-0 lg:flex-row lg:items-center lg:gap-4">{children}</div>
        </>
      )}
    </div>
  );
};

interface ICompound extends FC<PropsWithChildren<Props>> {
  Pill: typeof Pill;
  Action: typeof Action;
}

(SectionHeader as ICompound).Pill = Pill;
(SectionHeader as ICompound).Action = Action;

export default SectionHeader as ICompound;
