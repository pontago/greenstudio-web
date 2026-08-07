export type Theme = 'light' | 'dark';

// 既存ユーザーの設定を引き継ぐため、prelineが使っていたキーをそのまま使う
const STORAGE_KEY = 'hs_theme';

export const applyTheme = (theme: Theme) => {
  const html = document.documentElement;
  html.classList.toggle('dark', theme === 'dark');
  html.style.colorScheme = theme;
};

const listeners = new Set<() => void>();

export const setTheme = (theme: Theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorageが使えない環境では永続化を諦めて表示だけ切り替える
  }
  applyTheme(theme);
  listeners.forEach((listener) => listener());
};

/** useSyncExternalStore用。テーマは<html>のclassという外部状態なのでそこから読む。 */
export const subscribeTheme = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getThemeSnapshot = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

/** プリレンダリング時は<head>スクリプトが走る前なので常にlight。 */
export const getServerThemeSnapshot = (): Theme => 'light';

/**
 * FOUCを避けるため、Reactのhydrationより前に<head>で同期実行するスクリプト。
 * applyThemeと同じ挙動を素のJSで再現している。
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');var d=t==='dark';document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;
