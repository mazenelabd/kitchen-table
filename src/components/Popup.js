import { useState } from 'react';
import '../styling/Popup.css';

const Popup = ({
  width,
  height,
  setWidth,
  setHeight,
  addBasket,
  closeDialog,
}) => {
  const [widthError, setWidthError] = useState('');
  const [heightError, setHeightError] = useState('');

  const validateAndAddToBasket = (e) => {
    e.preventDefault();

    // Reset previous errors
    setWidthError('');
    setHeightError('');

    // Validate width
    if (isNaN(width) || width < 10 || width > 70) {
      setWidthError('Width must be a number between 10 and 70.');
      return;
    }

    // Validate height
    if (isNaN(height) || height < 10 || height > 70) {
      setHeightError('Height must be a number between 10 and 70.');
      return;
    }

    addBasket(e);
  };

  return (
    <form className="dialog" onSubmit={validateAndAddToBasket}>
      <h3 className="dialog-title">Enter the Basket Dimensions</h3>
      <div>
        <label className="dialog-label">Width:</label>
        <input
          className={`dialog-input ${widthError && 'error-input'}`}
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          min="10"
          max="70"
          step="5"
          required
          autoFocus
        />
        <div className="dialog-error">{widthError}</div>
      </div>
      <div>
        <label className="dialog-label">Height:</label>
        <input
          className={`dialog-input ${heightError && 'error-input'}`}
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          min="10"
          max="70"
          step="5"
          required
        />
        <div className="dialog-error">{heightError}</div>
      </div>
      <div className="dialog-actions">
        <button type="submit" className="dialog-button">
          Add Basket
        </button>
        <button type="reset" onClick={closeDialog} className="dialog-button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Popup;
