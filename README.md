# GREEN STUDIO Portfolio Web

Remix App

- SPA Mode + ビルド時プリレンダリング（`react-router.config.ts` の `prerender`）
- Yarn (PnP)
- Preline UI（ポートフォリオのモーダル / カルーセルのみ。ヘッダーとテーマ切替は自前実装）
- Sakura Internet Shared Server
- PHP 7.4.x（お問い合わせメール送信箇所）

## Requirement

- Node.js 20.x
- Yarn (PnP)
- ZipFS (VSCode)

## Environment Variables and Secrets

### Environment

- VITE_CONTACT_URL=お問い合わせフォームPHPのURL
- VITE_RECAPTCHA_SITE_KEY=reCAPTCHAのサイトキー
- VITE_GA_TRACKING_ID=Google AnalyticsのトラッキングID

### Secrets for Actions

- FTP_SERVER=アップロード先FTPサーバ
- FTP_USERNAME=アップロード先FTPユーザー名
- FTP_UPLOAD_DIRECTORY=アップロード先ディレクトリ
- SSH_PRIVATE_KEY=接続時のプライベートキー
- RECAPTCHA_SECRET_KEY=reCAPTCHAのシークレットキー

## Build and Install

```shellscript
yarn install
yarn dlx @yarnpkg/sdks vscode
yarn run dev
(or yarn run build)
```

## Assets

### フォント

`public/fonts/inter-latin.woff2` は Inter 可変フォントのサブセット。日本語はシステムフォントへフォールバックするため、Basic Latin + 常用記号、ウェイト軸 300..700 のみ残している（73KB → 44KB）。`app/tailwind.css` の `@font-face` の `unicode-range` と対になっているので、片方だけ変えないこと。

再生成する場合:

```shellscript
# Google Fontsから元のlatinサブセットを取得
curl -A "Mozilla/5.0" "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap"
# 出力された latin ブロックの woff2 URL を保存してから
npx --yes subset-font  # もしくは下記スクリプトを利用
```

```javascript
const subsetFont = require('subset-font');
const fs = require('fs');
let chars = '';
for (let c = 0x20; c <= 0x7e; c++) chars += String.fromCharCode(c);
chars += '©—–…‘’“”→←↑↓×÷°±€¥£';
subsetFont(fs.readFileSync('inter-latin-full.woff2'), chars, {
  targetFormat: 'woff2',
  variationAxes: { wght: { min: 300, max: 700 } },
}).then((out) => fs.writeFileSync('public/fonts/inter-latin.woff2', out));
```

### 画像

配信用は WebP、**原本の png / jpg はそのまま残す**（`cover.png` が原本、`cover.webp` が配信用）。参照しているのは `app/assets/data/portfolios.json` の webp 側。

ポートフォリオのカバーは**原本のアスペクト比を保ったまま**長辺 768px 以内に縮小する（`>` は拡大しないフラグ）。トリミングしてはいけない。表示枠の縦横比はブレークポイントで変わり（1カラム時は約 361x192、3カラム時は 288x192）、一覧は `object-cover`、印刷用ページは `object-contain` と扱いが異なるため、書き出し時に切り抜くと二重にトリミングされて見切れる。切り抜きはCSS側に任せる。

```shellscript
magick cover.png -resize '768x768>' -quality 75 -define webp:method=6 cover.webp
```

アバターは表示サイズ 64x64 の2倍で書き出す（`avatar.png` が原本、`avatar.webp` が配信用）。

```shellscript
magick avatar.png -resize 128x128 -quality 82 -define webp:method=6 avatar.webp
```
