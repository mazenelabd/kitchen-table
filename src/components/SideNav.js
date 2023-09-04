import StaticCircle from './StaticCircle';
import StaticRectangle from './StaticRectangle';
import '../styling/SideNav.css';

const SideNav = ({ handleDragStart, sortBaskets }) => {
  return (
    <div className="side-nav">
      <div draggable onDragStart={(e) => handleDragStart(e, 'ThreeScene')}>
        <StaticRectangle />
      </div>
      <div draggable onDragStart={(e) => handleDragStart(e, 'AddApple')}>
        <StaticCircle />
      </div>
      <button className="sidenav-button" onClick={sortBaskets}>
        Sort
      </button>
    </div>
  );
};

export default SideNav;
