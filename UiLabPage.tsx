import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Tokens } from './StyleRegistry';
import initialTokens from './tokens.json';

const APP_URL = 'http://localhost:3000'; // Укажите порт вашего приложения
const SYNC_SERVER_URL = 'http://localhost:3001/save-tokens';

export const UiLabPage: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [liveTokens, setLiveTokens] = useState<Tokens>(initialTokens as Tokens);

  const controls = {
    Colors: {
      background: initialTokens.colors.background,
      text: initialTokens.colors.text,
      border: initialTokens.colors.border,
      primary: initialTokens.colors.primary,
      secondary: initialTokens.colors.secondary,
    },
    Spacing: {
      md: parseInt(initialTokens.spacing.md),
      lg: parseInt(initialTokens.spacing.lg),
    },
    Typography: {
      fontSizeBase: parseInt(String(initialTokens.typography.fontSizeBase).replace('px','')),
      heading1Size: parseInt(String(initialTokens.typography.heading1Size).replace('px','')),
    },
  };

  // Обработка кликов из iframe (Инспектор)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'UI_LAB_CLICK') {
        const [category, name] = event.data.dataTokenId.split('-');
        // Фокусируемся на нужном контроле в Leva
        console.log(`Focusing on: ${category}.${name}`);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const res = await fetch(SYNC_SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(liveTokens),
      });
      if (res.ok) alert('Стили сохранены в tokens.json!');
    } catch (e) {
      alert('Ошибка при сохранении. Проверьте, запущен ли sync-server.');
    }
  }, [liveTokens]);

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#111' }}>
      {/* Панель инструментов */}
      <div style={{ width: '320px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #333' }}>
        <div style={{ padding: '16px', color: 'white', borderBottom: '1px solid #333' }}>
          <h2 style={{ margin: 0, fontSize: '18px' }}>UI Lab Configurator</h2>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: 16, color: '#fff' }}>
          <div>UI Lab controls are not available in this build.</div>
        </div>

        <div style={{ padding: '16px' }}>
          <button 
            onClick={handleSave}
            style={{
              width: '100%', padding: '12px', background: '#2ecc71', color: 'white',
              border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            Сохранить в проект
          </button>
        </div>
      </div>

      {/* Область предпросмотра */}
      <div style={{ flex: 1, position: 'relative', background: '#f0f2f5' }}>
        <iframe
          ref={iframeRef}
          src={APP_URL}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Preview"
        />
      </div>
    </div>
  );
};