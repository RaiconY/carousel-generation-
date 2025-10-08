/**
 * Render Engine Module
 * Отрисовка слайдов на Canvas
 */

export class RenderEngine {
  constructor(layoutEngine) {
    this.layoutEngine = layoutEngine;
  }

  /**
   * Рендерит слайд
   * @param {Slide} slide - Данные слайда
   * @param {Theme} theme - Тема оформления
   * @param {RenderConfig} config - Конфигурация рендеринга
   * @returns {HTMLCanvasElement} Canvas с отрисованным слайдом
   */
  render(slide, theme, config) {
    const canvas = document.createElement('canvas');
    canvas.width = theme.canvas.width;
    canvas.height = theme.canvas.height;
    const ctx = canvas.getContext('2d');

    // 1. Background
    this.drawBackground(ctx, theme.canvas);

    // 2. Calculate layout
    const layout = this.layoutEngine.calculateLayout(slide, theme, config);

    // 3. Header (username + slide number)
    this.drawHeader(ctx, layout.header, theme, config);

    // 4. Badge (если есть highlighted text)
    if (layout.badge) {
      this.drawBadge(ctx, layout.badge, theme);
    }

    // 5. Body text
    this.drawBodyText(ctx, slide.text, layout.textBox, theme);

    // 6. Footer
    this.drawFooter(ctx, layout.footer, theme, config);

    return canvas;
  }

  /**
   * Пакетный рендеринг слайдов
   */
  renderBatch(slides, theme, baseConfig) {
    return slides.map((slide, index) => {
      const config = {
        ...baseConfig,
        slideNumber: `${index + 1}/${slides.length}`
      };
      return this.render(slide, theme, config);
    });
  }

  drawBackground(ctx, config) {
    ctx.fillStyle = config.background;
    ctx.fillRect(0, 0, config.width, config.height);
  }

  drawHeader(ctx, header, theme, config) {
    ctx.fillStyle = theme.colors.headerText;
    ctx.font = `${theme.fonts.header.weight} ${theme.fonts.header.size}px ${theme.fonts.header.family}`;
    
    // Username
    ctx.textAlign = 'left';
    ctx.fillText(config.username, header.username.x, header.username.y);
    
    // Slide number
    ctx.textAlign = 'right';
    ctx.fillText(config.slideNumber, header.slideNumber.x, header.slideNumber.y);
  }

  drawBadge(ctx, badge, theme) {
    // Measure text для правильной ширины бэджа
    ctx.font = `${theme.fonts.badge.weight} ${theme.fonts.badge.size}px ${theme.fonts.badge.family}`;
    const textWidth = ctx.measureText(badge.text).width;
    const badgeWidth = Math.min(900, textWidth + (theme.spacing.badgePadding * 2));

    // Rectangle
    ctx.fillStyle = theme.colors.badge;
    ctx.fillRect(badge.x, badge.y, badgeWidth, badge.height);

    // Text
    ctx.fillStyle = theme.colors.badgeText;
    ctx.textAlign = 'left';
    ctx.fillText(badge.text, badge.x + theme.spacing.badgePadding, badge.y + 70);
  }

  drawBodyText(ctx, text, textBox, theme) {
    ctx.fillStyle = theme.colors.bodyText;
    ctx.font = `${theme.fonts.body.weight} ${theme.fonts.body.size}px ${theme.fonts.body.family}`;
    ctx.textAlign = 'left';

    // Разбиваем текст на строки с переносом
    const lines = this.layoutEngine.wrapText(
      ctx,
      text,
      textBox.width,
      `${theme.fonts.body.weight} ${theme.fonts.body.size}px ${theme.fonts.body.family}`
    );

    const lineHeight = theme.fonts.body.size * theme.spacing.lineHeight;
    let currentY = textBox.y;

    // Рисуем каждую линию
    lines.forEach(line => {
      if (currentY + lineHeight <= textBox.y + textBox.maxHeight) {
        ctx.fillText(line, textBox.x, currentY);
        currentY += lineHeight;
      }
    });
  }

  drawFooter(ctx, footer, theme, config) {
    if (!config.footer) return;

    ctx.fillStyle = theme.colors.footerText;
    ctx.font = `${theme.fonts.footer.weight} ${theme.fonts.footer.size}px ${theme.fonts.footer.family}`;
    
    // Footer text
    ctx.textAlign = 'left';
    ctx.fillText(config.footer, footer.text.x, footer.text.y);
    
    // Arrow
    ctx.font = '40px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('→', footer.arrow.x, footer.arrow.y);
  }

  /**
   * Конвертация canvas в Data URL
   */
  toDataURL(canvas, format = 'png', quality = 1.0) {
    return canvas.toDataURL(`image/${format}`, quality);
  }

  /**
   * Конвертация canvas в Blob
   */
  toBlob(canvas, format = 'png', quality = 1.0) {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, `image/${format}`, quality);
    });
  }
}

/**
 * Layout Engine Module
 * Расчет позиций элементов на слайде
 */
export class LayoutEngine {
  /**
   * Рассчитывает макет слайда
   */
  calculateLayout(slide, theme, config) {
    const layout = {
      header: {
        username: { x: theme.spacing.padding, y: 138 },
        slideNumber: { x: 1080 - theme.spacing.padding, y: 138 }
      },
      footer: {
        text: { x: theme.spacing.padding, y: 1020 },
        arrow: { x: 1080 - theme.spacing.padding, y: 1025 }
      }
    };

    let currentY = 250;

    // Badge layout (если есть выделенный текст)
    if (slide.highlightedText) {
      layout.badge = {
        x: 90,
        y: currentY,
        height: theme.spacing.badgeHeight,
        text: slide.highlightedText.toUpperCase()
      };
      currentY += theme.spacing.badgeHeight + 40;
    }

    // Text box layout
    layout.textBox = {
      x: theme.spacing.padding,
      y: currentY,
      width: 1080 - (theme.spacing.padding * 2),
      maxHeight: 1080 - currentY - 150
    };

    return layout;
  }

  /**
   * Перенос текста по словам с учетом ширины
   */
  wrapText(ctx, text, maxWidth, font) {
    ctx.font = font;
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  /**
   * Адаптивный расчет размера шрифта
   */
  calculateOptimalFontSize(text, box, baseFontSize, minFontSize, ctx) {
    let fontSize = baseFontSize;
    const lineHeight = 1.5;

    while (fontSize >= minFontSize) {
      const font = `${fontSize}px sans-serif`;
      const lines = this.wrapText(ctx, text, box.width, font);
      const totalHeight = lines.length * fontSize * lineHeight;

      if (totalHeight <= box.height) {
        return { fontSize, lines };
      }

      fontSize -= 2;
    }

    throw new Error('Text too long for slide');
  }

  /**
   * Вертикальное центрирование текста
   */
  centerVertically(lines, box, lineHeight) {
    const totalHeight = lines.length * lineHeight;
    const startY = box.y + (box.height - totalHeight) / 2;

    return lines.map((line, i) => ({
      ...line,
      y: startY + i * lineHeight
    }));
  }
}

/**
 * @typedef {Object} RenderConfig
 * @property {string} username - Имя пользователя
 * @property {string} footer - Текст футера
 * @property {string} slideNumber - Номер слайда (X/Y)
 */

/**
 * @typedef {Object} Theme
 * @property {Object} canvas - Настройки холста
 * @property {Object} fonts - Настройки шрифтов
 * @property {Object} colors - Цветовая схема
 * @property {Object} spacing - Отступы и интервалы
 */
