import './MeerkatAvatar.css';

interface MeerkatAvatarProps {
  message: string;
  isVisible: boolean;
}

/**
 * MeerkatAvatar Component
 *
 * Displays an animated meerkat character with a speech bubble.
 * The meerkat appears from the bottom with a slide-up animation.
 *
 * Props:
 * - message: The text to display in the speech bubble
 * - isVisible: Controls the animation state
 */
export const MeerkatAvatar = ({ message, isVisible }: MeerkatAvatarProps) => {
  return (
    <div className={`meerkat-container ${isVisible ? 'visible' : ''}`}>
      {/* Speech Bubble */}
      <div className="speech-bubble">
        <p>{message}</p>
        <div className="speech-bubble-arrow"></div>
      </div>

      {/* Meerkat Character */}
      <div className="meerkat">
        {/*
          TODO: Replace this SVG placeholder with a Ghibli-style meerkat illustration
          For now, we use a simple emoji-based representation
          Consider creating or sourcing:
          - A custom SVG illustration
          - A Ghibli-style meerkat image (PNG with transparency)
          - Or using an illustration library like Humaaans, unDraw, etc.
        */}
        <div className="meerkat-body">
          <div className="meerkat-head">
            <div className="meerkat-ears">
              <div className="ear ear-left"></div>
              <div className="ear ear-right"></div>
            </div>
            <div className="meerkat-face">
              <div className="eyes">
                <div className="eye eye-left">
                  <div className="pupil"></div>
                </div>
                <div className="eye eye-right">
                  <div className="pupil"></div>
                </div>
              </div>
              <div className="nose"></div>
              <div className="mouth"></div>
            </div>
          </div>
          <div className="meerkat-torso">
            <div className="meerkat-arms">
              <div className="arm arm-left"></div>
              <div className="arm arm-right"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
