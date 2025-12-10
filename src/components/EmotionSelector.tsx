import { useState } from 'react';
import { EmotionScore, EMOTIONS } from '../services/moodService';
import './EmotionSelector.css';

interface EmotionSelectorProps {
  emotions: EmotionScore[];
  onEmotionChange: (emotions: EmotionScore[]) => void;
  onSubmit: () => void;
}

/**
 * EmotionSelector Component
 *
 * Allows users to select emotions and set their intensity via sliders.
 * Based on Ekman's 6 basic emotions.
 *
 * Props:
 * - emotions: Current emotion scores
 * - onEmotionChange: Callback when emotions are updated
 * - onSubmit: Callback when user submits their emotional state
 */
export const EmotionSelector = ({
  emotions,
  onEmotionChange,
  onSubmit
}: EmotionSelectorProps) => {
  const [activeEmotions, setActiveEmotions] = useState<Set<string>>(new Set());

  const toggleEmotion = (emotionKey: string) => {
    const newActiveEmotions = new Set(activeEmotions);

    if (newActiveEmotions.has(emotionKey)) {
      newActiveEmotions.delete(emotionKey);
      // Reset score to 0 when deactivating
      const updatedEmotions = emotions.map(e =>
        e.key === emotionKey ? { ...e, score: 0 } : e
      );
      onEmotionChange(updatedEmotions);
    } else {
      newActiveEmotions.add(emotionKey);
      // Set default score to 5 when activating
      const updatedEmotions = emotions.map(e =>
        e.key === emotionKey ? { ...e, score: 5 } : e
      );
      onEmotionChange(updatedEmotions);
    }

    setActiveEmotions(newActiveEmotions);
  };

  const handleSliderChange = (emotionKey: string, value: number) => {
    const updatedEmotions = emotions.map(e =>
      e.key === emotionKey ? { ...e, score: value } : e
    );
    onEmotionChange(updatedEmotions);
  };

  const hasActiveEmotions = emotions.some(e => e.score > 0);

  return (
    <div className="emotion-selector">
      <h2>Wähle deine Emotionen:</h2>

      <div className="emotion-grid">
        {EMOTIONS.map((emotion) => {
          const currentEmotion = emotions.find(e => e.key === emotion.key);
          const isActive = activeEmotions.has(emotion.key);
          const score = currentEmotion?.score || 0;

          return (
            <div key={emotion.key} className="emotion-item">
              {/* Emotion Button */}
              <button
                className={`emotion-button ${isActive ? 'active' : ''}`}
                onClick={() => toggleEmotion(emotion.key)}
                aria-label={`${emotion.label} ${isActive ? 'abwählen' : 'auswählen'}`}
              >
                <span className="emotion-icon">{emotion.icon}</span>
                <span className="emotion-label">{emotion.label}</span>
              </button>

              {/* Slider (appears when active) */}
              {isActive && (
                <div className="slider-container">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={score}
                    onChange={(e) => handleSliderChange(emotion.key, parseInt(e.target.value))}
                    className="emotion-slider"
                    aria-label={`Intensität für ${emotion.label}`}
                  />
                  <div className="slider-value">
                    <span className="value-number">{score}</span>
                    <span className="value-label">/10</span>
                  </div>
                  <div className="slider-labels">
                    <span>leicht</span>
                    <span>stark</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      <button
        className="submit-button"
        onClick={onSubmit}
        disabled={!hasActiveEmotions}
        aria-label="Stimmung anzeigen"
      >
        {hasActiveEmotions
          ? '✨ Stimmung anzeigen'
          : '← Wähle mindestens eine Emotion'}
      </button>
    </div>
  );
};
