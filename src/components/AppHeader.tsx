import './AppHeader.css';

/**
 * AppHeader Component
 *
 * Displays the application title and subtitle
 */
export const AppHeader = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">
        <span className="title-icon">🦡</span>
        Mood-Buddy
      </h1>
      <p className="app-subtitle">Dein emotionaler Begleiter</p>
    </header>
  );
};
