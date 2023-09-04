import { useState } from 'react';
import Popup from './components/Popup';
import ErrorBox from './components/ErrorBox';
import SideNav from './components/SideNav';
import { getCirclesPerRaw, getNumberOfRaws } from './helpers';
import { TABLE_SIZE } from './constants';
import MainPanel from './components/MainPanel';
import './styling/App.css';

const App = () => {
  const [mainPanelContent, setMainPanelContent] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [widthInput, setWidthInput] = useState(70);
  const [heightInput, setHeightInput] = useState(70);
  const [dropIndex, setDropIndex] = useState(null);
  const [basketIsFullErr, setBasketIsFullErr] = useState(false);
  const [tableIsFullErr, setTableIsFullErr] = useState(false);

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('type', type);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    if (type === 'ThreeScene') {
      if (mainPanelContent.length === TABLE_SIZE) {
        setTableIsFullErr(true);
        return;
      }
      setDialogOpen(true);
    }
  };

  const handleDropIndex = (e, index) => {
    e.preventDefault();
    const dataType = e.dataTransfer.getData('type');
    if (dataType === 'ThreeScene') {
      setDropIndex(index);
    } else if (dataType === 'AddApple') {
      const circlesPerRaw = getCirclesPerRaw(mainPanelContent[index]['width']);
      const rawsCount = getNumberOfRaws(mainPanelContent[index]['height']);
      if (
        mainPanelContent[index]['circlesCount'] ===
        circlesPerRaw * rawsCount
      ) {
        setBasketIsFullErr(true);
        return;
      }
      const updatedContent = [...mainPanelContent];
      updatedContent[index]['circlesCount'] += 1;
      setMainPanelContent(updatedContent);
    }
  };

  const addBasket = (e) => {
    e.preventDefault();
    const newThreeScene = {
      width: widthInput,
      height: heightInput,
      circlesCount: 0,
    };
    if (dropIndex != null) {
      const updatedContent = [...mainPanelContent];
      updatedContent.splice(dropIndex, 0, newThreeScene);
      setMainPanelContent(updatedContent);
    } else {
      const updatedContent = [...mainPanelContent, newThreeScene];
      setMainPanelContent(updatedContent);
    }
    closeDialog();
    setDropIndex(null);
  };

  const sortBaskets = () => {
    const updatedContent = [...mainPanelContent].sort(
      (a, b) => b.circlesCount - a.circlesCount
    );
    setMainPanelContent(updatedContent);
  };

  return (
    <div className="container">
      <SideNav handleDragStart={handleDragStart} sortBaskets={sortBaskets} />

      <MainPanel
        mainPanelContent={mainPanelContent}
        handleDropIndex={handleDropIndex}
        handleDrop={handleDrop}
      />

      {isDialogOpen && (
        <Popup
          width={widthInput}
          height={heightInput}
          setWidth={setWidthInput}
          setHeight={setHeightInput}
          addBasket={addBasket}
          closeDialog={closeDialog}
        />
      )}

      {basketIsFullErr && (
        <ErrorBox
          title="The Basket is Full"
          description="You can't add any more apples"
          setErr={setBasketIsFullErr}
        />
      )}

      {tableIsFullErr && (
        <ErrorBox
          title="The Kitchen Table is Full"
          description="You can't add any more baskets"
          setErr={setTableIsFullErr}
        />
      )}
    </div>
  );
};

export default App;
