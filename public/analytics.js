const GA_MEASUREMENT_ID = 'G-XDC8NYV5WF';

// EEA, UK and Switzerland need consent before analytics cookies; with no
// banner, visitors there stay on cookieless pings. Google resolves the region.
const CONSENT_REQUIRED_REGIONS = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
  'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES',
  'SE', 'IS', 'LI', 'NO', 'GB', 'CH',
];

if (GA_MEASUREMENT_ID) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { dataLayer.push(arguments); };
  const NO_ADS = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
  gtag('consent', 'default', { ...NO_ADS, analytics_storage: 'granted' });
  gtag('consent', 'default', { ...NO_ADS, analytics_storage: 'denied', region: CONSENT_REQUIRED_REGIONS });
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  const gaLibrary = document.createElement('script');
  gaLibrary.async = true;
  gaLibrary.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(gaLibrary);
}

function track(eventName, params) {
  if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
}
