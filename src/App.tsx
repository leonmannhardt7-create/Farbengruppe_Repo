import { useState, useEffect } from 'react';
import { AppHeader } from './components/AppHeader';
import { MeerkatAvatar } from './components/MeerkatAvatar';
import { EmotionSelector } from './components/EmotionSelector';
import { MoodResult } from './components/MoodResult';
import {
  EmotionScore,
  MoodResponse,
  createInitialEmotions,
  generateMoodResponse
} from './services/moodService';
import './App.css';

/**
 * Main App Component
 *
 * Manages the application state and orchestrates the mood tracking flow:
 * 1. Initial greeting from Mood-Buddy (meerkat)
 * 2. Emotion selection via buttons and sliders
 * 3. Mood analysis and personalized response
 * 4. Reset to start over
 */
function App() {
  const [emotions, setEmotions] = useState<EmotionScore[]>(createInitialEmotions());
  const [moodResponse, setMoodResponse] = useState<MoodResponse | null>(null);
  const [avatarVisible, setAvatarVisible] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Animate meerkat entrance on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAvatarVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEmotionChange = (updatedEmotions: EmotionScore[]) => {
    setEmotions(updatedEmotions);
  };

  const handleSubmit = () => {
    const response = generateMoodResponse(emotions);
    setMoodResponse(response);
    setShowResult(true);
  };

  const handleReset = () => {
    setEmotions(createInitialEmotions());
    setMoodResponse(null);
    setShowResult(false);
  };

  // Determine current message for the meerkat
  const getMeerkatMessage = (): string => {
    if (showResult && moodResponse) {
      return `${moodResponse.message}`;
    }
    return 'Wie fühlst du dich heute?';
  };

  return (
    <div className="app">
      <AppHeader />

      {/* Desert Background */}
      <div className="desert-background" />

      {/* Main Content */}
      <main className="app-content">
        {/* Meerkat Avatar */}
        <MeerkatAvatar
          message={getMeerkatMessage()}
          isVisible={avatarVisible}
        />

        {/* Conditional Rendering: Emotion Selector or Result */}
        {!showResult ? (
          <EmotionSelector
            emotions={emotions}
            onEmotionChange={handleEmotionChange}
            onSubmit={handleSubmit}
          />
        ) : moodResponse ? (
          <MoodResult
            moodResponse={moodResponse}
            onReset={handleReset}
          />
        ) : null}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Basierend auf den 6 Basisemotionen nach Paul Ekman •{' '}
          <a
            href="https://github.com/yourusername/mood-buddy"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
