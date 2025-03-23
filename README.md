# GREEN STUDIO Portfolio Web

Remix App

- SPA Mode
- Yarn (PnP)
- Preline UI
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
