import React, { useEffect, useState } from 'react';
import { StyleRegistry, Tokens } from './StyleRegistry';
import { UiLabPage } from './UiLabPage';

function App() {
  // Простая проверка URL: если в адресе есть /lab, показываем конфигуратор
  const isLabMode = window.location.pathname === '/lab';

  // Состояние для динамических токенов, получаемых из iframe
  const [dynamicTokens, setDynamicTokens] = useState<Tokens | undefined>(undefined);

  // Слушатель для сообщений из UiLabPage (когда она в iframe)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'UI_LAB_UPDATE') {
        setDynamicTokens(event.data.tokens);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (isLabMode) {
    return <UiLabPage />;
  }

  return (
    <StyleRegistry dynamicTokens={dynamicTokens}>
      <div className="App">
        <h1 style={{ color: 'var(--colors-primary)' }}>Мое приложение</h1>
        <p style={{ padding: 'var(--spacing-md)' }}>Этот текст будет менять стиль на лету!</p>
      </div>
    </StyleRegistry>
  );
}

export default App;