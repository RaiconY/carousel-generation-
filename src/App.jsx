import React, { useEffect } from 'react';
import { useCarouselStore } from './store';
import './App.css';

function App() {
  const {
    text,
    config,
    slides,
    canvases,
    isGenerating,
    validation,
    stats,
    setText,
    updateConfig,
    setTheme,
    setFormat,
    generate,
    copySlide,
    downloadSlide,
    downloadAll,
    getThemes,
    loadDraft
  } = useCarouselStore();

  const themes = getThemes();

  // Загрузка черновика при монтировании
  useEffect(() => {
    loadDraft();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>📱 Instagram Carousel Generator</h1>
        <p className="subtitle">Создавайте профессиональные карусели за минуты</p>
      </header>

      <div className="layout">
        {/* Левая колонка: Ввод */}
        <div className="input-panel">
          <div className="card">
            <h2 className="card-title">Контент</h2>

            <div className="quick-tips">
              <h4>💡 Быстрые подсказки:</h4>
              <ul>
                <li>Используйте **текст** для зелёного бэджа</li>
                <li>Разделяйте параграфы пустой строкой</li>
                <li>Текст в бэдже будет ЗАГЛАВНЫМИ</li>
              </ul>
            </div>

            <div className="form-group">
              <label>Текст карусели</label>
              <span className="help-text">
                Разделяйте параграфы пустой строкой (Enter два раза)
              </span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`**не включаем** устройство после приема.

Перед сдачей просим убрать пароль с устройства — это единственное требование.

**важно** После проверки телефон остается выключенным с момента приема до момента выкупа.`}
                rows={12}
              />
              <div className={`char-counter ${text.length > 5000 ? 'warning' : ''}`}>
                {text.length} / 5000 символов
              </div>
            </div>

            <div className="settings-grid">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={config.username}
                  onChange={(e) => updateConfig({ username: e.target.value })}
                  placeholder="@username"
                />
              </div>

              <div className="form-group">
                <label>Подпись внизу</label>
                <input
                  type="text"
                  value={config.footer}
                  onChange={(e) => updateConfig({ footer: e.target.value })}
                  placeholder="Текст"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Шаблон дизайна</label>
              <div className="theme-selector">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`theme-option ${config.theme === theme.id ? 'active' : ''}`}
                    onClick={() => setTheme(theme.id)}
                  >
                    <div
                      className="theme-preview"
                      style={{ background: theme.preview.badge }}
                    />
                    <div className="theme-name">{theme.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Формат слайдов</label>
              <div className="format-selector">
                <button
                  className={`format-option ${config.format === 'square' ? 'active' : ''}`}
                  onClick={() => setFormat('square')}
                  type="button"
                >
                  <div className="format-preview square">
                    <div className="format-icon">1:1</div>
                  </div>
                  <span>Квадрат</span>
                  <span className="format-size">1080×1080</span>
                </button>

                <button
                  className={`format-option ${config.format === 'portrait' ? 'active' : ''}`}
                  onClick={() => setFormat('portrait')}
                  type="button"
                >
                  <div className="format-preview portrait">
                    <div className="format-icon">4:5</div>
                  </div>
                  <span>Вертикальный</span>
                  <span className="format-size">1080×1350</span>
                </button>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={generate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="loading"></span> Генерируем...
                </>
              ) : (
                'Сгенерировать карусель'
              )}
            </button>
          </div>
        </div>

        {/* Правая колонка: Превью */}
        <div className="output-panel">
          <div className="card">
            <h2 className="card-title">Превью</h2>

            {/* Validation Messages */}
            {(validation.errors.length > 0 || validation.warnings.length > 0) && (
              <div className="validation-messages">
                {validation.errors.map((error, i) => (
                  <div key={i} className="validation-message error">
                    ❌ {error}
                  </div>
                ))}
                {validation.warnings.map((warning, i) => (
                  <div key={i} className="validation-message warning">
                    ⚠️ {warning}
                  </div>
                ))}
              </div>
            )}

            {/* Stats */}
            {canvases.length > 0 && (
              <div className="stats">
                <div className="stat-card">
                  <div className="stat-value">{stats.slideCount}</div>
                  <div className="stat-label">Слайдов</div>
                </div>
              </div>
            )}

            {/* Slides Preview */}
            {canvases.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📝</div>
                <p>Введите текст и нажмите "Сгенерировать"</p>
              </div>
            ) : (
              <>
                <div className="slides-preview">
                  {canvases.map((canvas, index) => (
                    <SlideCard
                      key={index}
                      canvas={canvas}
                      index={index}
                      onCopy={() => copySlide(index)}
                      onDownload={() => downloadSlide(index)}
                    />
                  ))}
                </div>

                <button
                  className="btn btn-secondary"
                  onClick={downloadAll}
                  style={{ marginTop: '20px' }}
                >
                  📦 Скачать все слайды
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Компонент карточки слайда
function SlideCard({ canvas, index, onCopy, onDownload }) {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (canvasRef.current && canvas) {
      const ctx = canvasRef.current.getContext('2d');
      canvasRef.current.width = canvas.width;
      canvasRef.current.height = canvas.height;
      ctx.drawImage(canvas, 0, 0);
    }
  }, [canvas]);

  const handleCopy = async () => {
    const result = await onCopy();
    if (result?.success) {
      showToast('✓ Изображение скопировано!', 'success');
    } else {
      showToast('⚠️ Копирование недоступно. Используйте "Скачать"', 'warning');
      onDownload();
    }
  };

  return (
    <div className="slide-item">
      <canvas ref={canvasRef} />
      <div className="slide-actions">
        <button onClick={handleCopy}>📋 Копировать</button>
        <button onClick={onDownload}>⬇️ Скачать</button>
      </div>
    </div>
  );
}

// Toast уведомления
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

export default App;
