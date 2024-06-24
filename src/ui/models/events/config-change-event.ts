type ConfigChangeEvent = {
  scale: number;
  displayMinimap: boolean;
  displayControls: boolean;
  animateArrows: boolean;
  edgeType: "straight" | "step" | "smoothstep" | "simplebezier";
}
export default ConfigChangeEvent;