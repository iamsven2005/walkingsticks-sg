import { ensureStartsWith } from './utils';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL;

const FALLBACK_SITE_URL = 'https://walkingsticks.sg';

const resolveSiteUrl = (urlValue?: string) => {
  if (!urlValue) {
    return FALLBACK_SITE_URL;
  }

  const normalized = ensureStartsWith(urlValue, 'https://');

  try {
    const parsed = new URL(normalized);
    const isLocalhost =
      parsed.hostname === 'localhost' ||
      parsed.hostname === '127.0.0.1' ||
      parsed.hostname === '0.0.0.0';

    return isLocalhost ? FALLBACK_SITE_URL : normalized;
  } catch {
    return FALLBACK_SITE_URL;
  }
};

export const siteUrl = resolveSiteUrl(configuredSiteUrl);

export const siteName = process.env.SITE_NAME || 'Walking Sticks SG';
