import { MoodResponse } from '../services/moodService';
import './MoodResult.css';

interface MoodResultProps {
  moodResponse: MoodResponse;
  onReset: () => void;
}

/**
 * MoodResult Component
 *
 * Displays the analysis of the user's emotional state along with:
 * - A personalized message
 * - An offline activity recommendation
 * - An emotion-appropriate joke
 *
 * Props:
 * - moodResponse: The complete mood analysis result
 * - onReset: Callback to start over with new emotions
 */
export const MoodResult = ({ moodResponse, onReset }: MoodResultProps) => {
  const { mainEmotion, message, tip, joke } = moodResponse;

  return (
    <div className="mood-result">
      {/* Main Emotion Display */}
      <div className="main-emotion">
        <span className="main-emotion-icon">{mainEmotion.icon}</span>
        <h2 className="main-emotion-label">{mainEmotion.label}</h2>
        <div className="emotion-intensity">
          <div className="intensity-bar">
            <div
              className="intensity-fill"
              style={{ width: `${(mainEmotion.score / 10) * 100}%` }}
            />
          </div>
          <span className="intensity-label">
            {mainEmotion.score}/10
          </span>
        </div>
      </div>

      {/* Emotional State Message */}
      <div className="mood-message">
        <p>{message}</p>
      </div>

      {/* Offline Activity Tip */}
      <div className="mood-card tip-card">
        <div className="card-header">
          <span className="card-icon">💡</span>
          <h3>Tipp für dich</h3>
        </div>
        <p className="card-content">{tip}</p>
      </div>

      {/* Joke */}
      <div className="mood-card joke-card">
        <div className="card-header">
          <span className="card-icon">😄</span>
          <h3>Zur Auflockerung</h3>
        </div>
        <p className="card-content joke-content">{joke}</p>
      </div>

      {/* Reset Button */}
      <button className="reset-button" onClick={onReset}>
        🔄 Neue Stimmung erfassen
      </button>
    </div>
  );
};
