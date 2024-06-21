/*=========================================================
    Imports
=========================================================*/

import { h, render } from 'preact';
import App from './components/app';
import 'reactflow/dist/style.css';

/*=========================================================
    Entry Method
=========================================================*/

console.log('Script loaded');
window.onload = () => {
  console.log('Attempting to render');
  //Render
  const bodyElement = document.getElementById('app')!;
  render(<App />, bodyElement);
  //Wait 5ms to set the height to max
  window.setTimeout(
    () => {
      bodyElement.style.height = '100%';
    }, 5
  )
};
