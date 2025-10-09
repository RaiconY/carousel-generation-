// src/modules/themes.js - Professional Instagram Themes

export const themes = {
  // НОВАЯ ТЕМА 1: Modern Gradient (как первый референс)
  modern_gradient: {
    id: 'modern_gradient',
    name: 'Modern Gradient',
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
        family: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif', 
        size: 24, 
        weight: '500' 
      },
      badge: { 
        family: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif', 
        size: 80, 
        weight: '900' 
      },
      body: { 
        family: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif', 
        size: 72, 
        weight: '700' 
      },
      footer: { 
        family: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif', 
        size: 28, 
        weight: '500' 
      }
    },
    colors: {
      badge: 'transparent',
      badgeText: '#FFFFFF',
      bodyText: '#FFFFFF',
      headerText: 'rgba(255,255,255,0.7)',
      footerText: 'rgba(255,255,255,0.6)'
    },
    spacing: {
      padding: 80,
      lineHeight: 1.2,
      badgeHeight: 0, // Без фона у бэджа
      badgePadding: 0,
      badgeLineHeight: 1.1
    }
  },

  // НОВАЯ ТЕМА 2: Editorial (как второй референс)
  editorial: {
    id: 'editorial',
    name: 'Editorial',
    canvas: {
      formats: {
        square: { width: 1080, height: 1080 },
        portrait: { width: 1080, height: 1350 }
      },
      defaultFormat: 'square',
      background: '#f5f3f0',
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
        family: 'Georgia, serif', 
        size: 22, 
        weight: 'normal' 
      },
      badge: { 
        family: '-apple-system, BlinkMacSystemFont, sans-serif', 
        size: 90, 
        weight: '900' 
      },
      body: { 
        family: '-apple-system, BlinkMacSystemFont, sans-serif', 
        size: 68, 
        weight: '300' 
      },
      footer: { 
        family: 'Georgia, serif', 
        size: 24, 
        weight: 'normal' 
      }
    },
    colors: {
      badge: 'transparent',
      badgeText: '#000000',
      bodyText: '#000000',
      headerText: '#666666',
      footerText: '#999999'
    },
    spacing: {
      padding: 100,
      lineHeight: 1.3,
      badgeHeight: 0,
      badgePadding: 0,
      badgeLineHeight: 1.1
    }
  },

  // НОВАЯ ТЕМА 3: Bold Statement
  bold_statement: {
    id: 'bold_statement',
    name: 'Bold Statement',
    canvas: {
      formats: {
        square: { width: 1080, height: 1080 },
        portrait: { width: 1080, height: 1350 }
      },
      defaultFormat: 'square',
      background: '#000000',
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
        family: '-apple-system, BlinkMacSystemFont, sans-serif', 
        size: 20, 
        weight: '400' 
      },
      badge: { 
        family: '-apple-system, BlinkMacSystemFont, "Impact", sans-serif', 
        size: 100, 
        weight: '900' 
      },
      body: { 
        family: '-apple-system, BlinkMacSystemFont, sans-serif', 
        size: 76, 
        weight: '800' 
      },
      footer: { 
        family: '-apple-system, BlinkMacSystemFont, sans-serif', 
        size: 26, 
        weight: '400' 
      }
    },
    colors: {
      badge: '#FFFF00',
      badgeText: '#000000',
      bodyText: '#FFFFFF',
      headerText: '#666666',
      footerText: '#666666'
    },
    spacing: {
      padding: 70,
      lineHeight: 1.1,
      badgeHeight: 120,
      badgePadding: 40,
      badgeLineHeight: 1.0
    }
  },

  // НОВАЯ ТЕМА 4: Neon Glow
  neon_glow: {
    id: 'neon_glow',
    name: 'Neon Glow',
    canvas: {
      formats: {
        square: { width: 1080, height: 1080 },
        portrait: { width: 1080, height: 1350 }
      },
      defaultFormat: 'square',
      background: '#0a0a0a',
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
        family: 'Courier New, monospace', 
        size: 22, 
        weight: 'normal' 
      },
      badge: { 
        family: '-apple-system, BlinkMacSystemFont, sans-serif', 
        size: 85, 
        weight: '900' 
      },
      body: { 
        family: '-apple-system, BlinkMacSystemFont, sans-serif', 
        size: 70, 
        weight: '600' 
      },
      footer: { 
        family: 'Courier New, monospace', 
        size: 24, 
        weight: 'normal' 
      }
    },
    colors: {
      badge: 'linear-gradient(90deg, #00ffff, #ff00ff)',
      badgeText: '#FFFFFF',
      bodyText: '#FFFFFF',
      headerText: '#00ffff',
      footerText: '#ff00ff'
    },
    spacing: {
      padding: 80,
      lineHeight: 1.25,
      badgeHeight: 110,
      badgePadding: 50,
      badgeLineHeight: 1.0
    }
  },

  // НОВАЯ ТЕМА 5: Minimal Swiss
  minimal_swiss: {
    id: 'minimal_swiss',
    name: 'Minimal Swiss',
    canvas: {
      formats: {
        square: { width: 1080, height: 1080 },
        portrait: { width: 1080, height: 1350 }
      },
      defaultFormat: 'square',
      background: '#ffffff',
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
        family: 'Helvetica Neue, Helvetica, Arial, sans-serif', 
        size: 18, 
        weight: '400' 
      },
      badge: { 
        family: 'Helvetica Neue, Helvetica, Arial, sans-serif', 
        size: 120, 
        weight: '700' 
      },
      body: { 
        family: 'Helvetica Neue, Helvetica, Arial, sans-serif', 
        size: 64, 
        weight: '400' 
      },
      footer: { 
        family: 'Helvetica Neue, Helvetica, Arial, sans-serif', 
        size: 22, 
        weight: '300' 
      }
    },
    colors: {
      badge: '#FF0000',
      badgeText: '#FFFFFF',
      bodyText: '#000000',
      headerText: '#FF0000',
      footerText: '#000000'
    },
    spacing: {
      padding: 120,
      lineHeight: 1.4,
      badgeHeight: 140,
      badgePadding: 60,
      badgeLineHeight: 1.0
    }
  },

  // Оставляем старую тему для совместимости
  dengi_market: {
    id: 'dengi_market',
    name: 'Classic Green',
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
        family: '-apple-system, BlinkMacSystemFont, sans-serif', 
        size: 28, 
        weight: 'normal' 
      },
      badge: { 
        family: '-apple-system, BlinkMacSystemFont, sans-serif', 
        size: 58, 
        weight: '900' 
      },
      body: { 
        family: '-apple-system, BlinkMacSystemFont, sans-serif', 
        size: 38, 
        weight: 'normal' 
      },
      footer: { 
        family: '-apple-system, BlinkMacSystemFont, sans-serif', 
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
      badgePadding: 60,
      badgeLineHeight: 1.2
    }
  }
};

export class ThemeSystem {
  constructor() {
    this.themes = themes;
    this.currentTheme = 'modern_gradient'; // Новая тема по умолчанию
  }

  getTheme(id) {
    const theme = this.themes[id];
    if (!theme) {
      throw new Error(`Theme '${id}' not found`);
    }
    return theme;
  }

  getCurrentTheme() {
    return this.getTheme(this.currentTheme);
  }

  setTheme(id) {
    if (!this.themes[id]) {
      throw new Error(`Theme '${id}' not found`);
    }
    this.currentTheme = id;
    return this.getTheme(id);
  }

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
}
