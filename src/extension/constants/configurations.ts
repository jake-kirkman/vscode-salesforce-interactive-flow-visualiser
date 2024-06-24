export const CONFIG_KEY_SCALING = 'salesforce-interactive-flow-visualiser.webview.nodePositionScaling';
export const CONFIG_KEY_DISPLAY_MINIMAP = 'salesforce-interactive-flow-visualiser.webview.displayMinimap';
export const CONFIG_KEY_DISPLAY_CONTROLS = 'salesforce-interactive-flow-visualiser.webview.displayControls';
export const CONFIG_KEY_ANIMATE_ARROWS = 'salesforce-interactive-flow-visualiser.webview.animateArrowsByDefault';
export const CONFIG_KEY_EDGE_TYPE = 'salesforce-interactive-flow-visualiser.webview.edgeType';

//Configs to pass through to the UI
//Be sure to update `/models/events/config-change-event` in UI
export const WEBVIEW_CONFIGS = [
  {propertyName: 'scale', key: CONFIG_KEY_SCALING},
  {propertyName: 'displayMinimap', key: CONFIG_KEY_DISPLAY_MINIMAP},
  {propertyName: 'displayControls', key: CONFIG_KEY_DISPLAY_CONTROLS},
  {propertyName: 'animateArrows', key: CONFIG_KEY_ANIMATE_ARROWS},
  {propertyName: 'edgeType', key: CONFIG_KEY_EDGE_TYPE}
];