import type { FC, PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface LayoutSetupContextValue {
  isScrolled: boolean;
  isSidebarOpen: boolean;
  isExpandedLayout: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
  setExpandedLayout: (isExpanded: boolean) => void;
  title?: string;
  subTitle?: string;
  setPageTitle: (title: string, subtitle?: string) => void;
}

export const LayoutSetupContext = createContext<LayoutSetupContextValue | undefined>(undefined);

const useLayoutSetup = () => {
  const context = useContext(LayoutSetupContext);
  if (!context) {
    throw new Error('useLayoutSetup must be used within a WithLayoutSetupContext');
  }
  return context;
};

const WithLayoutSetupContext: FC<PropsWithChildren> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpandedLayout, setIsExpandedLayout] = useState(false);
  const [title, setTitle] = useState<string>();
  const [subTitle, setSubTitle] = useState<string>();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const setExpandedLayout = (isExpanded: boolean) => {
    setIsExpandedLayout(isExpanded);
  };
  const setPageTitle = (title: string, subtitle?: string) => {
    setTitle(title);
    setSubTitle(subtitle);
  };

  return (
    <LayoutSetupContext.Provider
      value={{
        isScrolled,
        isSidebarOpen,
        isExpandedLayout,
        toggleSidebar,
        closeSidebar,
        openSidebar,
        setExpandedLayout,
        setPageTitle,
        title,
        subTitle,
      }}
    >
      {children}
    </LayoutSetupContext.Provider>
  );
};

export { useLayoutSetup, WithLayoutSetupContext };
