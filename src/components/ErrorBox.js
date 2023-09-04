import { useState } from 'react';
import '../styling/ErrorBox.css';

const ErrorBox = ({ title, description, setErr }) => {
  const [isOpen, setIsOpen] = useState(true);
  const closePopup = () => {
    setErr(false);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>{title}</h3>
            <hr />
            <p>{description}</p>
            <button className="error-button" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorBox;
