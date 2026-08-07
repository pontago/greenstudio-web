declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * dataLayerとgtagスタブだけを同期的に用意する。
 * スタブはコマンドをdataLayerへ積むだけなので、実スクリプトの読み込み前に呼ばれた計測も取りこぼさない。
 */
export const setupGtag = (trackingId?: string) => {
  if (!trackingId || typeof window === 'undefined') {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
};

/**
 * gtag.jsの読み込みはloadイベント後まで遅らせ、初期表示のメインスレッドと帯域を奪わせない。
 */
export const loadGtagScript = (trackingId?: string) => {
  if (!trackingId || typeof window === 'undefined') {
    return;
  }
  const inject = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);
  };

  if (document.readyState === 'complete') {
    inject();
  } else {
    window.addEventListener('load', inject, { once: true });
  }
};

/**
 * @example
 * https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 */
export const pageview = (url: string, trackingId?: string) => {
  if (!trackingId || typeof window.gtag !== 'function') {
    return;
  }
  window.gtag('config', trackingId, {
    page_path: url,
  });
};

/**
 * @example
 * https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
export const event = ({ action, category, label, value }: Record<string, string>) => {
  if (typeof window.gtag !== 'function') {
    return;
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
