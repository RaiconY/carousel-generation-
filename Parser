/**
 * Text Parser Module
 * Преобразует текст в структурированные данные для слайдов
 */

export class TextParser {
  constructor(options = {}) {
    this.maxCharsPerSlide = options.maxCharsPerSlide || 400;
    this.groupParagraphs = options.groupParagraphs !== false;
    this.normalizeTypography = options.normalizeTypography !== false;
  }

  /**
   * Парсит текст и возвращает массив слайдов
   * @param {string} rawText - Исходный текст
   * @returns {Array<Slide>} Массив слайдов
   */
  parse(rawText) {
    if (!rawText || typeof rawText !== 'string') {
      throw new Error('Text must be a string');
    }

    // 1. Нормализация
    const normalized = this.normalizeText(rawText);
    
    // 2. Разбивка на параграфы
    const paragraphs = normalized
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);
    
    // 3. Парсинг каждого параграфа
    const slides = paragraphs.map(para => this.parseParagraph(para));
    
    // 4. Группировка (если параграфы короткие)
    if (this.groupParagraphs) {
      return this.groupSlides(slides);
    }
    
    return slides;
  }

  /**
   * Нормализует текст (переносы строк, типографика)
   */
  normalizeText(text) {
    let normalized = text
      .replace(/\r\n/g, '\n')  // Windows line breaks
      .replace(/\t/g, ' ')      // Tabs to spaces
      .trim();

    // Нормализация типографики
    if (this.normalizeTypography) {
      normalized = normalized
        .replace(/--/g, '—')    // Двойной дефис в тире
        .replace(/\.\.\./g, '…') // Троеточие
        .replace(/<<|>>/g, '«»'); // Кавычки
    }

    return normalized;
  }

  /**
   * Парсит один параграф
   */
  parseParagraph(para) {
    // Извлекаем **выделенный** текст
    const highlightRegex = /\*\*(.*?)\*\*/;
    const match = para.match(highlightRegex);

    return {
      id: this.generateId(),
      text: para.replace(highlightRegex, '').trim(),
      highlightedText: match ? match[1] : null,
      originalText: para,
      charCount: para.length
    };
  }

  /**
   * Группирует короткие слайды вместе
   */
  groupSlides(slides) {
    const grouped = [];
    let currentGroup = [];
    let currentLength = 0;

    slides.forEach(slide => {
      const slideLength = slide.text.length;
      
      // Если слайд с выделением - он идёт отдельно
      if (slide.highlightedText) {
        if (currentGroup.length > 0) {
          grouped.push(this.mergeSlides(currentGroup));
          currentGroup = [];
          currentLength = 0;
        }
        grouped.push(slide);
        return;
      }

      // Проверяем, влезает ли в группу
      if (currentLength + slideLength <= this.maxCharsPerSlide) {
        currentGroup.push(slide);
        currentLength += slideLength;
      } else {
        if (currentGroup.length > 0) {
          grouped.push(this.mergeSlides(currentGroup));
        }
        currentGroup = [slide];
        currentLength = slideLength;
      }
    });

    // Добавляем последнюю группу
    if (currentGroup.length > 0) {
      grouped.push(this.mergeSlides(currentGroup));
    }

    return grouped;
  }

  /**
   * Объединяет несколько слайдов в один
   */
  mergeSlides(slides) {
    return {
      id: this.generateId(),
      text: slides.map(s => s.text).join('\n\n'),
      highlightedText: null,
      originalText: slides.map(s => s.originalText).join('\n\n'),
      charCount: slides.reduce((sum, s) => sum + s.charCount, 0)
    };
  }

  /**
   * Генерирует уникальный ID
   */
  generateId() {
    return 'slide_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Извлекает заголовок для обложки (первое предложение или 100 символов)
   */
  extractTitle(text) {
    const firstParagraph = text.split('\n\n')[0];
    const firstSentence = firstParagraph.split('.')[0];
    
    if (firstSentence.length <= 100) {
      return firstSentence;
    }
    
    return firstParagraph.substring(0, 97) + '...';
  }
}

/**
 * @typedef {Object} Slide
 * @property {string} id - Уникальный ID слайда
 * @property {string} text - Основной текст
 * @property {string|null} highlightedText - Выделенный текст (из **)
 * @property {string} originalText - Исходный текст параграфа
 * @property {number} charCount - Количество символов
 */
