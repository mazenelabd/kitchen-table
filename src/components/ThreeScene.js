import { useEffect, useRef } from "react";
import * as THREE from "three";

import { addCircles, createRectangle } from "../helpers";
import { CIRCLE_RADIUS } from "../constants";
import "../styling/ThreeScene.css";

const ThreeScene = ({ width, height, circlesCount }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0.1,
      1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentContainerRef.appendChild(renderer.domElement);

    // Create the Rectangle
    createRectangle(scene, width, height);

    // Add Circles to the Rectangle
    addCircles(scene, circlesCount, width, height, CIRCLE_RADIUS);

    const renderScene = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(renderScene);
    };

    renderScene();
    return () => {
      renderer.dispose();
      renderer.forceContextLoss();
      currentContainerRef.removeChild(renderer.domElement);
    };
  }, [width, height, circlesCount]);

  return <div ref={containerRef} className="scene"></div>;
};

export default ThreeScene;
