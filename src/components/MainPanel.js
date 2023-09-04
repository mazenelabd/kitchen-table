import ThreeScene from './ThreeScene';
import '../styling/MainPanel.css';

const MainPanel = ({ handleDrop, handleDropIndex, mainPanelContent }) => {
  return (
    <div
      className="main-panel"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {mainPanelContent.map((item, index) => (
        <div
          key={index}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDropIndex(e, index)}
          className="center-boxes"
        >
          <ThreeScene
            height={item.height}
            width={item.width}
            circlesCount={item.circlesCount}
          />
        </div>
      ))}
    </div>
  );
};

export default MainPanel;
