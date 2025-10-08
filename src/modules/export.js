/**
 * Export Module
 * Экспорт результата в различных форматах
 */

export class ExportManager {
  /**
   * Конвертация canvas в Blob
   */
  async toBlob(canvas, format = 'png', quality = 1.0) {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, `image/${format}`, quality);
    });
  }

  /**
   * Конвертация canvas в Data URL
   */
  toDataURL(canvas, format = 'png', quality = 1.0) {
    return canvas.toDataURL(`image/${format}`, quality);
  }

  /**
   * Копирование в буфер обмена
   */
  async copyToClipboard(canvas) {
    if (!navigator.clipboard?.write) {
      throw new Error('Clipboard API not supported in this browser');
    }

    const blob = await this.toBlob(canvas, 'png');
    
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
  }

  /**
   * Скачивание одного файла
   */
  download(canvas, filename) {
    const url = this.toDataURL(canvas);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Пакетное скачивание
   */
  async downloadBatch(canvases, basename = 'slide') {
    for (let i = 0; i < canvases.length; i++) {
      this.download(canvases[i], `${basename}-${i + 1}.png`);
      // Небольшая задержка между скачиваниями
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  /**
   * Создание ZIP архива (требует библиотеку JSZip)
   */
  async createZip(canvases, basename = 'slide') {
    // Проверяем наличие JSZip
    if (typeof JSZip === 'undefined') {
      throw new Error('JSZip library not loaded');
    }

    const zip = new JSZip();
    
    for (let i = 0; i < canvases.length; i++) {
      const blob = await this.toBlob(canvases[i]);
      zip.file(`${basename}-${i + 1}.png`, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    return content;
  }

  /**
   * Скачивание ZIP
   */
  async downloadZip(canvases, basename = 'carousel') {
    const zipBlob = await this.createZip(canvases, basename);
    const url = URL.createObjectURL(zipBlob);
    
    const link = document.createElement('a');
    link.download = `${basename}.zip`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Освобождаем память
    URL.revokeObjectURL(url);
  }

  /**
   * Экспорт в PDF (требует библиотеку jsPDF)
   */
  async exportToPDF(canvases, filename = 'carousel.pdf') {
    if (typeof jspdf === 'undefined') {
      throw new Error('jsPDF library not loaded');
    }

    const { jsPDF } = jspdf;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [1080, 1080]
    });

    for (let i = 0; i < canvases.length; i++) {
      if (i > 0) pdf.addPage();
      const imgData = this.toDataURL(canvases[i]);
      pdf.addImage(imgData, 'PNG', 0, 0, 1080, 1080);
    }

    pdf.save(filename);
  }

  /**
   * Получить превью (уменьшенное изображение)
   */
  async getThumbnail(canvas, size = 200) {
    const thumbnailCanvas = document.createElement('canvas');
    thumbnailCanvas.width = size;
    thumbnailCanvas.height = size;
    const ctx = thumbnailCanvas.getContext('2d');
    
    ctx.drawImage(canvas, 0, 0, size, size);
    
    return thumbnailCanvas;
  }

  /**
   * Экспорт статистики
   */
  exportStats(slides, canvases) {
    const stats = {
      totalSlides: slides.length,
      totalChars: slides.reduce((sum, s) => sum + s.charCount, 0),
      averageCharsPerSlide: Math.round(
        slides.reduce((sum, s) => sum + s.charCount, 0) / slides.length
      ),
      slidesWithBadge: slides.filter(s => s.highlightedText).length,
      canvasSize: `${canvases[0].width}x${canvases[0].height}`,
      estimatedFileSize: this._estimateFileSize(canvases),
      timestamp: new Date().toISOString()
    };

    return stats;
  }

  /**
   * Оценка размера файлов
   */
  _estimateFileSize(canvases) {
    // Примерная оценка: 1080x1080 PNG ≈ 300-500KB
    const avgSizeKB = 400;
    const totalMB = (canvases.length * avgSizeKB) / 1024;
    return `~${totalMB.toFixed(1)} MB`;
  }
}

/**
 * Validation Module
 * Валидация входных данных
 */

export class Validator {
  constructor(options = {}) {
    this.maxTextLength = options.maxTextLength || 5000;
    this.minTextLength = options.minTextLength || 10;
    this.maxSlides = options.maxSlides || 10;
    this.maxImageSize = options.maxImageSize || 10 * 1024 * 1024; // 10MB
    this.allowedImageTypes = options.allowedImageTypes || [
      'image/jpeg',
      'image/png',
      'image/webp'
    ];
    this.slideLimitWarning = `Больше ${this.maxSlides} слайдов (Instagram ограничивает карусель ${this.maxSlides} слайдами)`;
  }

  /**
   * Валидация текста
   */
  validateText(text) {
    const errors = [];
    const warnings = [];

    if (!text || text.trim().length === 0) {
      errors.push('Введите текст для карусели');
      return { errors, warnings, isValid: false };
    }

    if (text.length > this.maxTextLength) {
      errors.push(`Текст превышает максимальную длину (${this.maxTextLength} символов)`);
    }

    if (text.length < this.minTextLength) {
      warnings.push('Слишком короткий текст для карусели');
    }

    // Проверка на количество параграфов
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    if (paragraphs.length > this.maxSlides) {
      warnings.push(this.slideLimitWarning);
    }

    // Проверка на подозрительные символы
    if (/[<>{}]/.test(text)) {
      warnings.push('Текст содержит специальные символы, которые могут отобразиться некорректно');
    }

    return {
      errors,
      warnings,
      isValid: errors.length === 0,
      charCount: text.length,
      paragraphCount: paragraphs.length
    };
  }

  /**
   * Валидация изображения
   */
  validateImage(file) {
    const errors = [];
    const warnings = [];

    if (!file) {
      errors.push('Файл не выбран');
      return { errors, warnings, isValid: false };
    }

    // Проверка типа
    if (!this.allowedImageTypes.includes(file.type)) {
      errors.push(
        `Недопустимый формат файла. Разрешены: ${this.allowedImageTypes.join(', ')}`
      );
    }

    // Проверка размера
    if (file.size > this.maxImageSize) {
      errors.push(
        `Файл слишком большой. Максимум: ${this.maxImageSize / 1024 / 1024}MB`
      );
    }

    if (file.size < 1024) {
      warnings.push('Файл очень маленький, качество может быть низким');
    }

    return {
      errors,
      warnings,
      isValid: errors.length === 0,
      fileSize: file.size,
      fileType: file.type
    };
  }

  /**
   * Валидация набора изображений
   */
  validateImages(files) {
    const results = [];
    const allErrors = [];
    const allWarnings = [];

    files.forEach((file, index) => {
      const result = this.validateImage(file);
      results.push({ index, ...result });
      
      if (result.errors.length > 0) {
        allErrors.push(`Файл ${index + 1}: ${result.errors.join(', ')}`);
      }
      
      if (result.warnings.length > 0) {
        allWarnings.push(`Файл ${index + 1}: ${result.warnings.join(', ')}`);
      }
    });

    return {
      results,
      errors: allErrors,
      warnings: allWarnings,
      isValid: allErrors.length === 0
    };
  }

  /**
   * Валидация конфигурации
   */
  validateConfig(config) {
    const errors = [];
    const warnings = [];

    if (!config.username || config.username.trim().length === 0) {
      warnings.push('Username не указан');
    }

    if (config.username && config.username.length > 30) {
      errors.push('Username слишком длинный (максимум 30 символов)');
    }

    if (!config.footer || config.footer.trim().length === 0) {
      warnings.push('Текст футера не указан');
    }

    if (config.footer && config.footer.length > 100) {
      errors.push('Текст футера слишком длинный (максимум 100 символов)');
    }

    return {
      errors,
      warnings,
      isValid: errors.length === 0
    };
  }

  /**
   * Полная валидация всех данных
   */
  validateAll(text, images = [], config = {}) {
    const textValidation = this.validateText(text);
    const imagesValidation = images.length > 0 
      ? this.validateImages(images) 
      : { errors: [], warnings: [], isValid: true };
    const configValidation = this.validateConfig(config);

    const allErrors = [
      ...textValidation.errors,
      ...imagesValidation.errors,
      ...configValidation.errors
    ];

    const allWarnings = [
      ...textValidation.warnings,
      ...imagesValidation.warnings,
      ...configValidation.warnings
    ];

    return {
      text: textValidation,
      images: imagesValidation,
      config: configValidation,
      errors: allErrors,
      warnings: allWarnings,
      isValid: allErrors.length === 0
    };
  }

  /**
   * Санитизация текста
   */
  sanitize(text) {
    return text
      .replace(/[<>]/g, '')           // Удаляем потенциально опасные символы
      .replace(/javascript:/gi, '')    // Удаляем JS инъекции
      .trim();
  }

  adjustSlideWarnings(validation, slideCount) {
    if (!validation) {
      return validation;
    }

    const shouldWarn = slideCount > this.maxSlides;
    const warning = this.slideLimitWarning;

    const updateWarnings = (warnings = []) => {
      const filtered = warnings.filter(message => message !== warning);
      if (shouldWarn) {
        filtered.push(warning);
      }
      return filtered;
    };

    const updatedText = validation.text
      ? {
          ...validation.text,
          warnings: updateWarnings(validation.text.warnings)
        }
      : validation.text;

    const updatedWarnings = updateWarnings(validation.warnings);

    return {
      ...validation,
      warnings: updatedWarnings,
      text: updatedText
    };
  }
}

/**
 * Storage Module
 * Сохранение и восстановление данных
 */

export class StorageManager {
  constructor(namespace = 'carousel') {
    this.namespace = namespace;
  }

  /**
   * Сохранить в localStorage
   */
  save(key, data) {
    try {
      const fullKey = `${this.namespace}:${key}`;
      localStorage.setItem(fullKey, JSON.stringify(data));
      return true;
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error('Storage quota exceeded');
        this.clearOldDrafts();
      }
      return false;
    }
  }

  /**
   * Загрузить из localStorage
   */
  load(key) {
    try {
      const fullKey = `${this.namespace}:${key}`;
      const data = localStorage.getItem(fullKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading from storage:', error);
      return null;
    }
  }

  /**
   * Удалить из localStorage
   */
  remove(key) {
    const fullKey = `${this.namespace}:${key}`;
    localStorage.removeItem(fullKey);
  }

  /**
   * Очистить старые черновики
   */
  clearOldDrafts(maxAgeDays = 7) {
    const now = Date.now();
    const maxAge = maxAgeDays * 24 * 60 * 60 * 1000;

    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(`${this.namespace}:draft-`)) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          if (data.timestamp && now - data.timestamp > maxAge) {
            localStorage.removeItem(key);
          }
        } catch (error) {
          // Если не можем прочитать - удаляем
          localStorage.removeItem(key);
        }
      }
    });
  }

  /**
   * Сохранить черновик
   */
  saveDraft(text, config) {
    const draft = {
      text,
      config,
      timestamp: Date.now()
    };
    
    return this.save('draft-current', draft);
  }

  /**
   * Загрузить черновик
   */
  loadDraft() {
    return this.load('draft-current');
  }

  /**
   * Сохранить настройки
   */
  saveSettings(settings) {
    return this.save('settings', settings);
  }

  /**
   * Загрузить настройки
   */
  loadSettings() {
    return this.load('settings') || this.getDefaultSettings();
  }

  /**
   * Настройки по умолчанию
   */
  getDefaultSettings() {
    return {
      theme: 'dengi_market',
      username: '@dengi_market',
      footer: 'ваш любимый ломбард',
      autosave: true
    };
  }

  /**
   * Экспорт всех данных
   */
  exportAll() {
    const data = {};
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.namespace)) {
        const shortKey = key.replace(`${this.namespace}:`, '');
        data[shortKey] = JSON.parse(localStorage.getItem(key));
      }
    });

    return data;
  }

  /**
   * Импорт данных
   */
  importAll(data) {
    Object.entries(data).forEach(([key, value]) => {
      this.save(key, value);
    });
  }

  /**
   * Очистить всё хранилище
   */
  clearAll() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.namespace)) {
        localStorage.removeItem(key);
      }
    });
  }
}
