/**
 * Application State Management
 * Zustand store для управления состоянием приложения
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TextParser } from './modules/parser';
import { LayoutEngine, RenderEngine } from './modules/render';
import { ThemeSystem } from './modules/themes';
import { ExportManager, Validator, StorageManager } from './modules/export';

// Инициализация модулей
const parser = new TextParser();
const layoutEngine = new LayoutEngine();
const renderEngine = new RenderEngine(layoutEngine);
const themeSystem = new ThemeSystem();
const exportManager = new ExportManager();
const validator = new Validator();
const storage = new StorageManager();

export const useCarouselStore = create(
  persist(
    (set, get) => ({
      // ============= STATE =============
      
      // Текст и слайды
      text: '',
      slides: [],
      canvases: [],
      
      // Конфигурация
      config: {
        username: '@dengi_market',
        footer: 'ваш любимый ломбард',
        theme: 'dengi_market',
        format: 'square'
      },
      
      // UI состояние
      isGenerating: false,
      validation: { errors: [], warnings: [], isValid: true },
      
      // Статистика
      stats: {
        slideCount: 0,
        charCount: 0,
        timeEstimate: 0
      },

      // ============= ACTIONS =============
      
      /**
       * Установить текст
       */
      setText: (text) => {
        set({ text });
        
        // Валидация при вводе
        const validation = validator.validateText(text);
        set({ validation });
        
        // Обновление статистики
        get().updateStats();
      },

      /**
       * Обновить конфигурацию
       */
      updateConfig: (updates) => {
        set((state) => ({
          config: { ...state.config, ...updates }
        }));
      },

      /**
       * Установить тему
       */
      setTheme: (themeId) => {
        themeSystem.setTheme(themeId);
        set((state) => ({
          config: { ...state.config, theme: themeId }
        }));
      },

      /**
       * Установить формат
       */
      setFormat: (format) => {
        set((state) => ({
          config: { ...state.config, format: format || 'square' }
        }));
      },

      /**
       * Генерация карусели
       */
      generate: async () => {
        const { text, config } = get();

        // Валидация
        let validation = validator.validateAll(text, [], config);
        set({ validation });

        if (!validation.isValid) {
          return;
        }

        set({ isGenerating: true });

        try {
          // Парсинг текста
          const slides = parser.parse(text);
          set({ slides });

          validation = validator.adjustSlideWarnings(validation, slides.length);
          set({ validation });

          // Получение темы
          const theme = themeSystem.getTheme(config.theme);

          // Рендеринг слайдов
          const canvases = slides.map((slide, index) => {
            const renderConfig = {
              ...config,
              slideNumber: `${index + 1}/${slides.length}`
            };
            return renderEngine.render(slide, theme, renderConfig);
          });

          set({ canvases });
          get().updateStats();

          // Автосохранение черновика
          storage.saveDraft(text, config);

        } catch (error) {
          console.error('Generation error:', error);
          set({
            validation: {
              errors: [error.message],
              warnings: [],
              isValid: false
            }
          });
        } finally {
          set({ isGenerating: false });
        }
      },

      /**
       * Копирование слайда
       */
      copySlide: async (index) => {
        const { canvases } = get();
        try {
          await exportManager.copyToClipboard(canvases[index]);
          return { success: true };
        } catch (error) {
          console.error('Copy error:', error);
          return { success: false, error: error.message };
        }
      },

      /**
       * Скачивание слайда
       */
      downloadSlide: (index) => {
        const { canvases } = get();
        exportManager.download(canvases[index], `slide-${index + 1}.png`);
      },

      /**
       * Скачивание всех слайдов
       */
      downloadAll: async () => {
        const { canvases } = get();
        await exportManager.downloadBatch(canvases, 'carousel-slide');
      },

      /**
       * Скачивание ZIP
       */
      downloadZip: async () => {
        const { canvases } = get();
        await exportManager.downloadZip(canvases, 'carousel');
      },

      /**
       * Обновление статистики
       */
      updateStats: () => {
        const { text, slides } = get();
        
        set({
          stats: {
            slideCount: slides.length,
            charCount: text.length,
            timeEstimate: Math.max(1, Math.ceil(slides.length / 3)) // ~3 мин
          }
        });
      },

      /**
       * Загрузка черновика
       */
      loadDraft: () => {
        const draft = storage.loadDraft();
        if (draft) {
          set({
            text: draft.text,
            config: draft.config
          });
          return true;
        }
        return false;
      },

      /**
       * Очистка
       */
      reset: () => {
        set({
          text: '',
          slides: [],
          canvases: [],
          validation: { errors: [], warnings: [], isValid: true }
        });
      },

      /**
       * Получить список тем
       */
      getThemes: () => {
        return themeSystem.listThemes();
      },

      /**
       * Экспорт статистики
       */
      exportStats: () => {
        const { slides, canvases } = get();
        return exportManager.exportStats(slides, canvases);
      }
    }),
    {
      name: 'carousel-storage',
      partialize: (state) => ({
        config: state.config,
        text: state.text
      })
    }
  )
);
