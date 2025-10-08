# 📦 Instagram Carousel Generator - Project Summary

## 🎯 Что создано

### React Application (MVP)
**Директория**: корень репозитория (`./`)

✅ **Полностью функциональное React-приложение**
- Модульная структура
- Zustand для state management
- 5 тем дизайна
- Автосохранение в localStorage
- Готово к деплою

**Использование:**
```bash
npm install
npm run dev
```

## 📂 Структура проекта

```text
.
├── docs/                       # Документация
│   ├── DEPLOYMENT.md           # Гайд по деплою
│   └── PROJECT_SUMMARY.md      # Этот файл
├── src/
│   ├── modules/
│   │   ├── parser.js           # Парсинг текста
│   │   ├── render.js           # Рендеринг Canvas
│   │   ├── themes.js           # Система тем (5 тем)
│   │   └── export.js           # Экспорт + валидация
│   ├── store.js                # Zustand state
│   ├── App.css                 # Стили
│   ├── App.jsx                 # Главный компонент
│   └── main.jsx                # Entry point
├── index.html                  # Vite HTML template
├── package.json                # Dependencies
├── README.md                   # Документация
└── vite.config.js              # Vite config
```

## 🚀 Quick Start

```bash
npm install
npm run dev
# Откройте http://localhost:3000
```

## ✨ Основные возможности

### 1. Парсинг текста
```javascript
// Автоматическая разбивка по параграфам
const text = `**ЗАГОЛОВОК**

Первый параграф.

Второй параграф.`;

// → 2-3 слайда с выделенным заголовком
```

### 2. Темы дизайна
- 🎨 **Денги Маркет** — классика (зелёный бэдж)
- ⚫ **Минимал** — чёрно-белый стиль
- 🌈 **Яркий** — фиолетовый акцент
- 🌙 **Тёмный** — тёмный фон
- 🎨 **Градиент** — креативный градиент

### 3. Экспорт
- 📋 Копирование в буфер (Clipboard API)
- ⬇️ Скачивание PNG (по одному)
- 📦 Пакетное скачивание (все слайды)

### 4. Валидация
- ✅ Проверка длины текста (5000 символов)
- ⚠️ Предупреждение о >10 слайдах
- 🔍 Санитизация опасных символов

## 🏗️ Архитектура

### Модули (независимые и переиспользуемые)

#### 1. TextParser
```javascript
import { TextParser } from './modules/parser';

const parser = new TextParser({
  maxCharsPerSlide: 400,
  groupParagraphs: true
});

const slides = parser.parse(text);
```

#### 2. RenderEngine
```javascript
import { RenderEngine, LayoutEngine } from './modules/render';

const layoutEngine = new LayoutEngine();
const renderEngine = new RenderEngine(layoutEngine);

const canvas = renderEngine.render(slide, theme, config);
```

#### 3. ThemeSystem
```javascript
import { ThemeSystem } from './modules/themes';

const themeSystem = new ThemeSystem();
const theme = themeSystem.getTheme('dengi_market');
```

#### 4. ExportManager
```javascript
import { ExportManager } from './modules/export';

const exportManager = new ExportManager();
await exportManager.copyToClipboard(canvas);
exportManager.download(canvas, 'slide.png');
```

#### 5. Validator
```javascript
import { Validator } from './modules/export';

const validator = new Validator();
const result = validator.validateAll(text, slides, config);
```

## 🚧 Roadmap

- [x] MVP генератор каруселей
- [x] 5 тем оформления
- [x] Экспорт PNG и копирование
- [x] Автосохранение черновиков
- [ ] Backend API
- [ ] Пользовательские аккаунты
- [ ] Платёжная система
