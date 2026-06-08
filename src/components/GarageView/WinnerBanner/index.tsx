import { useEffect } from 'react';
import './styles.css';

interface WinnerBannerProps {
  name: string;
  onClose: () => void;
}

function WinnerBanner({ name, onClose }: WinnerBannerProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="winner-banner"
      role="dialog"
      aria-modal="true"
      aria-labelledby="winner-title"
    >
      <button
        className="winner-backdrop"
        type="button"
        aria-label="Close winner message"
        onClick={onClose}
      />
      <div className="winner-card">
        <button
          type="button"
          onClick={onClose}
          className="ui-button ui-button--icon winner-close"
          aria-label="Close winner message"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="winner-title" id="winner-title">
          Winner
        </h2>
        <div className="winner-name">{name}</div>
      </div>
    </div>
  );
}

export default WinnerBanner;
