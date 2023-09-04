import * as THREE from "three";
import { CIRCLE_RADIUS } from "./constants";

export const getCirclesPerRaw = (width) =>
  Math.floor(width / (CIRCLE_RADIUS * 2));

export const getNumberOfRaws = (height) =>
  Math.floor(height / (CIRCLE_RADIUS * 2));

export const createRectangle = (scene, width, height) => {
  const geometry = new THREE.BoxGeometry(width, height, 0);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  const rectangle = new THREE.Mesh(geometry, material);
  rectangle.position.set(0, 0, 0);
  scene.add(rectangle);
};

export const addCircles = (
  scene,
  circlesCount,
  width,
  height,
  CIRCLE_RADIUS
) => {
  if (circlesCount === 0) return;
  const circlesPerRaw = getCirclesPerRaw(width);
  const rawsCount = getNumberOfRaws(height);
  let counter = 0;
  for (let rawNumber = 0; rawNumber < rawsCount; rawNumber++) {
    for (let circleNumber = 0; circleNumber < circlesPerRaw; circleNumber++) {
      const circleGeometry = new THREE.CircleGeometry(CIRCLE_RADIUS, 32);
      circleGeometry.translate(
        -width / 2 + CIRCLE_RADIUS,
        height / 2 - CIRCLE_RADIUS,
        0
      );
      const circleMaterial = new THREE.MeshBasicMaterial({
        color: "blue",
      });
      const circle = new THREE.Mesh(circleGeometry, circleMaterial);

      circle.position.set(
        2 * CIRCLE_RADIUS * circleNumber,
        -2 * CIRCLE_RADIUS * rawNumber,
        0
      );

      scene.add(circle);
      counter++;
      if (counter >= circlesCount) return;
    }
  }
};
