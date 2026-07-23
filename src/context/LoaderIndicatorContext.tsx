import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

interface LoaderIndicatorContextValue {
  hasLoaderIndicator: boolean;
  setLoaderIndicator: Dispatch<SetStateAction<boolean>>;
}

export const LoaderIndicatorContext = createContext<LoaderIndicatorContextValue | undefined>(undefined);

const useLoaderIndicator = () => {
  const context = useContext(LoaderIndicatorContext);
  if (!context) {
    throw new Error('useLoaderIndicator must be used within a WithLoaderIndicatorContext');
  }
  return context;
};

const WithLoaderIndicatorContext: FC<PropsWithChildren> = ({ children }) => {
  const [hasLoaderIndicator, setLoaderIndicator] = useState(false);

  return (
    <LoaderIndicatorContext.Provider value={{ hasLoaderIndicator, setLoaderIndicator }}>
      {children}
    </LoaderIndicatorContext.Provider>
  );
};

export { useLoaderIndicator, WithLoaderIndicatorContext };
