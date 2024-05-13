/*=========================================================
    Imports
=========================================================*/

import { h, render } from 'preact';

/*=========================================================
    Entry Method
=========================================================*/

const App = () => (
  <div>Hello World</div>
);

console.log('Script loaded');
window.onload = () => {
  console.log('Attempting to render');
  render(<App />, document.getElementById('app')!);
};