import type { FC, PropsWithChildren } from 'react';
import type { NavigateFunction, NavigateOptions, To } from 'react-router-dom';
import { NavLink as RouterNavLink, useLocation, useNavigate as useRouterNavigate } from 'react-router-dom';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

type UtmKey = (typeof UTM_KEYS)[number];

const extractCurrentUtmParams = (search: string) => {
  const sourceParams = new URLSearchParams(search);
  const currentUtms = new URLSearchParams();
  let hasAnyUtm = false;

  UTM_KEYS.forEach((key: UtmKey) => {
    const value = sourceParams.get(key);
    if (value != null) {
      currentUtms.set(key, value);
      hasAnyUtm = true;
    }
  });

  return { currentUtms, hasAnyUtm };
};

const mergeUtmParams = (targetParams: URLSearchParams, currentUtms: URLSearchParams) => {
  currentUtms.forEach((value, key) => {
    if (!targetParams.has(key)) {
      targetParams.append(key, value);
    }
  });
};

const getExistingSearchFromTo = (to: To): string => {
  if (typeof to === 'string') {
    const [pathWithPathname] = to.split('#');
    const [, existingSearch = ''] = pathWithPathname.split('?');
    return existingSearch;
  }

  const rawSearch = to.search ?? '';
  return rawSearch.startsWith('?') ? rawSearch.slice(1) : rawSearch;
};

const buildFinalToWithSearchFromString = (to: string, finalSearch: string) => {
  const [pathWithPathname, hashFragment = ''] = to.split('#');
  const [pathname] = pathWithPathname.split('?');
  const basePath = finalSearch ? `${pathname}?${finalSearch}` : pathname;

  return hashFragment ? `${basePath}#${hashFragment}` : basePath;
};

const buildFinalToWithSearch = (to: To, finalSearch: string): To => {
  if (typeof to === 'string') {
    return buildFinalToWithSearchFromString(to, finalSearch);
  }

  return {
    ...to,
    search: finalSearch ? `?${finalSearch}` : '',
  };
};

/**
 * A hook that wraps the standard `navigate` function to
 * automatically carry over UTM parameters from the current URL.
 *
 * - Preserves existing query params on the target
 * - Does not overwrite UTM params explicitly set on the target
 * - Works with both string and object `To` values
 */
export const useNavigate = () => {
  const navigate = useRouterNavigate();
  const { search } = useLocation();

  const persistentNavigate: NavigateFunction = (to: To | number, options?: NavigateOptions) => {
    // Handle history delta (back/forward navigation)
    if (typeof to === 'number') {
      navigate(to);
      return;
    }

    const { currentUtms, hasAnyUtm } = extractCurrentUtmParams(search);

    // If there are no UTMs on the current URL, just delegate.
    if (!hasAnyUtm) {
      navigate(to, options);
      return;
    }

    const existingSearch = getExistingSearchFromTo(to);
    const targetParams = new URLSearchParams(existingSearch);

    mergeUtmParams(targetParams, currentUtms);

    const finalSearch = targetParams.toString();
    const finalTo = buildFinalToWithSearch(to, finalSearch);

    navigate(finalTo, options);
  };

  return persistentNavigate;
};

/**
 * A wrapper around react-router-dom's Link component that
 * automatically carries over UTM parameters from the current URL.
 */
export const NavLink: FC<PropsWithChildren<{ to: string }>> = ({ to, children, ...props }) => {
  const { search } = useLocation();
  const { currentUtms, hasAnyUtm } = extractCurrentUtmParams(search);

  if (!hasAnyUtm) {
    return (
      <RouterNavLink to={to} {...props}>
        {children}
      </RouterNavLink>
    );
  }

  const existingSearch = getExistingSearchFromTo(to);
  const targetParams = new URLSearchParams(existingSearch);

  mergeUtmParams(targetParams, currentUtms);

  const finalSearch = targetParams.toString();
  const finalTo = buildFinalToWithSearchFromString(to, finalSearch);

  return (
    <RouterNavLink to={finalTo} {...props}>
      {children}
    </RouterNavLink>
  );
};
