/**
 * Theme System Module
 * Управление визуальными стилями
 */

export const themes = {
  dengi_market: {
    id: 'dengi_market',
    name: 'Денги Маркет',
    canvas: {
      formats: {
        square: { width: 1080, height: 1080 },
        portrait: { width: 1080, height: 1350 }
      },
      defaultFormat: 'square',
      background: '#FFFFFF',
      get width() {
        const format = this.formats[this.defaultFormat];
        return format?.width ?? 1080;
      },
      get height() {
        const format = this.formats[this.defaultFormat];
        return format?.height ?? 1080;
      }
    },
    fonts: {
      header: { 
        family: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', 
        size: 28, 
        weight: 'normal' 
      },
      badge: { 
        family: 'System, -apple-system, BlinkMacSystemFont, sans-serif', 
        size: 58, 
        weight: '900' 
      },
      body: { 
        family: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', 
        size: 38, 
        weight: 'normal' 
      },
      footer: { 
        family: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', 
        size: 32, 
        weight: '300' 
      }
    },
    colors: {
      badge: '#00B341',
      badgeText: '#FFFFFF',
      bodyText: '#000000',
      headerText: '#999999',
      footerText: '#AAAAAA'
    },
    spacing: {
      padding: 86,
      lineHeight: 1.5,
      badgeHeight: 100,
      badgePadding: 60
    }
  },

  minimal: {
    id: 'minimal',
    name: 'Минимализм',
    canvas: {
      formats: {
        square: { width: 1080, height: 1080 },
        portrait: { width: 1080, height: 1350 }
      },
      defaultFormat: 'square',
      background: '#F5F5F5',
      get width() {
        const format = this.formats[this.defaultFormat];
        return format?.width ?? 1080;
      },
      get height() {
        const format = this.formats[this.defaultFormat];
        return format?.height ?? 1080;
      }
    },
    fonts: {
      header: { 
        family: 'Inter, -apple-system, sans-serif', 
        size: 24, 
        weight: 'normal' 
      },
      badge: { 
        family: 'Inter, -apple-system, sans-serif', 
        size: 48, 
        weight: 'bold' 
      },
      body: { 
        family: 'Inter, -apple-system, sans-serif', 
        size: 32, 
        weight: 'normal' 
      },
      footer: { 
        family: 'Inter, -apple-system, sans-serif', 
        size: 28, 
        weight: '300' 
      }
    },
    colors: {
      badge: '#000000',
      badgeText: '#FFFFFF',
      bodyText: '#1A1A1A',
      headerText: '#666666',
      footerText: '#999999'
    },
    spacing: {
      padding: 64,
      lineHeight: 1.6,
      badgeHeight: 80,
      badgePadding: 50
    }
  },

  vibrant: {
    id: 'vibrant',
    name: 'Яркий',
    canvas: {
      formats: {
        square: { width: 1080, height: 1080 },
        portrait: { width: 1080, height: 1350 }
      },
      defaultFormat: 'square',
      background: '#FFFFFF',
      get width() {
        const format = this.formats[this.defaultFormat];
        return format?.width ?? 1080;
      },
      get height() {
        const format = this.formats[this.defaultFormat];
        return format?.height ?? 1080;
      }
    },
    fonts: {
      header: { 
        family: 'Montserrat, -apple-system, sans-serif', 
        size: 28, 
        weight: 'normal' 
      },
      badge: { 
        family: 'Montserrat, -apple-system, sans-serif', 
        size: 52, 
        weight: '900' 
      },
      body: { 
        family: 'Open Sans, -apple-system, sans-serif', 
        size: 36, 
        weight: 'normal' 
      },
      footer: { 
        family: 'Open Sans, -apple-system, sans-serif', 
        size: 30, 
        weight: '300' 
      }
    },
    colors: {
      badge: '#667eea',
      badgeText: '#FFFFFF',
      bodyText: '#2D3748',
      headerText: '#718096',
      footerText: '#A0AEC0'
    },
    spacing: {
      padding: 80,
      lineHeight: 1.5,
      badgeHeight: 90,
      badgePadding: 55
    }
  },

  dark: {
    id: 'dark',
    name: 'Тёмный',
    canvas: {
      formats: {
        square: { width: 1080, height: 1080 },
        portrait: { width: 1080, height: 1350 }
      },
      defaultFormat: 'square',
      background: '#1A202C',
      get width() {
        const format = this.formats[this.defaultFormat];
        return format?.width ?? 1080;
      },
      get height() {
        const format = this.formats[this.defaultFormat];
        return format?.height ?? 1080;
      }
    },
    fonts: {
      header: { 
        family: 'SF Pro, -apple-system, sans-serif', 
        size: 28, 
        weight: 'normal' 
      },
      badge: { 
        family: 'SF Pro, -apple-system, sans-serif', 
        size: 54, 
        weight: '900' 
      },
      body: { 
        family: 'SF Pro, -apple-system, sans-serif', 
        size: 38, 
        weight: 'normal' 
      },
      footer: { 
        family: 'SF Pro, -apple-system, sans-serif', 
        size: 32, 
        weight: '300' 
      }
    },
    colors: {
      badge: '#48BB78',
      badgeText: '#FFFFFF',
      bodyText: '#F7FAFC',
      headerText: '#A0AEC0',
      footerText: '#718096'
    },
    spacing: {
      padding: 86,
      lineHeight: 1.5,
      badgeHeight: 95,
      badgePadding: 58
    }
  },

  gradient: {
    id: 'gradient',
    name: 'Градиент',
    canvas: {
      formats: {
        square: { width: 1080, height: 1080 },
        portrait: { width: 1080, height: 1350 }
      },
      defaultFormat: 'square',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      get width() {
        const format = this.formats[this.defaultFormat];
        return format?.width ?? 1080;
      },
      get height() {
        const format = this.formats[this.defaultFormat];
        return format?.height ?? 1080;
      }
    },
    fonts: {
      header: { 
        family: 'Poppins, -apple-system, sans-serif', 
        size: 26, 
        weight: 'normal' 
      },
      badge: { 
        family: 'Poppins, -apple-system, sans-serif', 
        size: 50, 
        weight: 'bold' 
      },
      body: { 
        family: 'Poppins, -apple-system, sans-serif', 
        size: 36, 
        weight: 'normal' 
      },
      footer: { 
        family: 'Poppins, -apple-system, sans-serif', 
        size: 30, 
        weight: '300' 
      }
    },
    colors: {
      badge: '#FFFFFF',
      badgeText: '#667eea',
      bodyText: '#FFFFFF',
      headerText: 'rgba(255,255,255,0.8)',
      footerText: 'rgba(255,255,255,0.7)'
    },
    spacing: {
      padding: 80,
      lineHeight: 1.5,
      badgeHeight: 85,
      badgePadding: 52
    }
  }
};

export class ThemeSystem {
  constructor() {
    this.themes = themes;
    this.currentTheme = 'dengi_market';
  }

  /**
   * Получить тему по ID
   */
  getTheme(id) {
    const theme = this.themes[id];
    if (!theme) {
      throw new Error(`Theme '${id}' not found`);
    }
    return theme;
  }

  /**
   * Получить текущую тему
   */
  getCurrentTheme() {
    return this.getTheme(this.currentTheme);
  }

  /**
   * Установить текущую тему
   */
  setTheme(id) {
    if (!this.themes[id]) {
      throw new Error(`Theme '${id}' not found`);
    }
    this.currentTheme = id;
    return this.getTheme(id);
  }

  /**
   * Список всех тем
   */
  listThemes() {
    return Object.values(this.themes).map(theme => ({
      id: theme.id,
      name: theme.name,
      preview: {
        background: theme.canvas.background,
        badge: theme.colors.badge
      }
    }));
  }

  getCanvasSize(theme, format = 'square') {
    const selectedTheme = typeof theme === 'string' ? this.getTheme(theme) : theme;
    const formatKey = format || selectedTheme.canvas.defaultFormat || 'square';
    return (
      selectedTheme.canvas.formats[formatKey] ||
      selectedTheme.canvas.formats[selectedTheme.canvas.defaultFormat] ||
      selectedTheme.canvas.formats.square
    );
  }

  /**
   * Создать кастомную тему
   */
  createTheme(id, config) {
    if (this.themes[id]) {
      throw new Error(`Theme '${id}' already exists`);
    }

    this.themes[id] = {
      id,
      ...config
    };

    return this.themes[id];
  }

  /**
   * Обновить существующую тему
   */
  updateTheme(id, updates) {
    if (!this.themes[id]) {
      throw new Error(`Theme '${id}' not found`);
    }

    this.themes[id] = {
      ...this.themes[id],
      ...updates
    };

    return this.themes[id];
  }

  /**
   * Удалить тему
   */
  deleteTheme(id) {
    if (!this.themes[id]) {
      throw new Error(`Theme '${id}' not found`);
    }

    if (this.currentTheme === id) {
      this.currentTheme = 'dengi_market';
    }

    delete this.themes[id];
  }

  /**
   * Экспорт темы в JSON
   */
  exportTheme(id) {
    const theme = this.getTheme(id);
    return JSON.stringify(theme, null, 2);
  }

  /**
   * Импорт темы из JSON
   */
  importTheme(json) {
    const theme = JSON.parse(json);
    
    if (!theme.id) {
      throw new Error('Theme must have an id');
    }

    this.themes[theme.id] = theme;
    return theme;
  }

  /**
   * Валидация темы
   */
  validateTheme(theme) {
    const required = ['id', 'name', 'canvas', 'fonts', 'colors', 'spacing'];
    const missing = required.filter(key => !theme[key]);

    if (missing.length > 0) {
      throw new Error(`Theme missing required fields: ${missing.join(', ')}`);
    }

    return true;
  }
}
