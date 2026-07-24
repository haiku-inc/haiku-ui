import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';
import Loading from '../ui/Loading';

interface LoaderSpinnerContextValue {
  hasLoaderSpinner: boolean;
  setLoaderSpinner: Dispatch<SetStateAction<boolean>>;
  loaderSpinner: React.ReactElement | null;
}

export const LoaderSpinnerContext = createContext<LoaderSpinnerContextValue | undefined>(undefined);

const useLoaderSpinner = () => {
  const context = useContext(LoaderSpinnerContext);
  if (!context) {
    throw new Error('useLoaderSpinner must be used within a WithLoaderSpinnerContext');
  }
  return context;
};

const WithLoaderSpinnerContext: FC<PropsWithChildren> = ({ children }) => {
  const [hasLoaderSpinner, setLoaderSpinner] = useState(false);

  const loaderSpinner = hasLoaderSpinner ? <Loading /> : null;

  return (
    <LoaderSpinnerContext.Provider value={{ hasLoaderSpinner, setLoaderSpinner, loaderSpinner }}>
      {children}
    </LoaderSpinnerContext.Provider>
  );
};

export { useLoaderSpinner, WithLoaderSpinnerContext };
