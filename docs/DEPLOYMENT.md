# 🚀 Deployment Guide

## Быстрый деплой на Netlify

### 1. Через Netlify CLI (рекомендуется)

```bash
# Установить Netlify CLI
npm install -g netlify-cli

# Войти в аккаунт
netlify login

# Build проекта
npm run build

# Деплой
netlify deploy --prod --dir=dist
```

### 2. Через GitHub Integration

1. Запушить код на GitHub
2. Зайти в [Netlify](https://app.netlify.com)
3. **New site from Git** → выбрать репозиторий
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. **Deploy site**

## Деплой на Vercel

```bash
# Установить Vercel CLI
npm install -g vercel

# Деплой
vercel --prod
```

Или через [Vercel Dashboard](https://vercel.com/new):
1. Import Git Repository
2. Framework Preset: **Vite**
3. **Deploy**

## Деплой на Cloudflare Pages

```bash
# Установить Wrangler
npm install -g wrangler

# Build
npm run build

# Деплой
wrangler pages deploy dist
```

## Environment Variables

Для продакшена создайте `.env.production`:

```env
VITE_APP_NAME=Instagram Carousel Generator
VITE_API_URL=https://api.yourapp.com
VITE_SENTRY_DSN=your-sentry-dsn
```

## Custom Domain

### Netlify
```bash
netlify domains:add yourdomain.com
```

### Vercel
```bash
vercel domains add yourdomain.com
```

## Мониторинг и аналитика

### Добавить Sentry (ошибки)

```bash
npm install @sentry/react
```

```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
});
```

### Добавить PostHog (аналитика)

```bash
npm install posthog-js
```

```javascript
// src/main.jsx
import posthog from 'posthog-js';

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: 'https://app.posthog.com'
});
```

## Performance оптимизация

### 1. Code Splitting
Уже настроено в `vite.config.js`

### 2. Image Optimization
```bash
npm install vite-plugin-imagemin -D
```

### 3. Compression
```bash
npm install vite-plugin-compression -D
```

## CI/CD Pipeline (GitHub Actions)

Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Rollback

### Netlify
```bash
# Список деплоев
netlify deploy:list

# Rollback к предыдущему
netlify deploy:restore <deploy-id>
```

### Vercel
```bash
vercel rollback
```

## Troubleshooting

### Проблема: "Module not found"
```bash
# Очистить кэш
rm -rf node_modules package-lock.json
npm install
```

### Проблема: Build fails
```bash
# Проверить локально
npm run build
npm run preview
```

### Проблема: Clipboard API не работает
Убедитесь что сайт работает по HTTPS:
- Netlify/Vercel автоматически дают HTTPS
- Для custom domain настройте SSL

## Checklist перед деплоем

- [ ] Все тесты проходят (`npm test`)
- [ ] Build успешен (`npm run build`)
- [ ] Нет console.errors в production
- [ ] Environment variables настроены
- [ ] Analytics подключена
- [ ] Error tracking (Sentry) настроен
- [ ] Custom domain настроен (опционально)
- [ ] SSL сертификат активен
- [ ] SEO meta tags добавлены
- [ ] Performance проверен (Lighthouse > 90)

---

**Готово!** 🎉 Ваш генератор каруселей теперь в продакшене!
