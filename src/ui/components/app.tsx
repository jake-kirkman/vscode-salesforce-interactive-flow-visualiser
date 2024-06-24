import { h } from "preact";
import { useEffect } from "preact/hooks";
import FlowVisualiser from "./flow-visualiser";
import { fireEvent } from "../workers/event-worker";
import Event from "../enums/event";

export default function App() {

  //Startup
  useEffect(() => {
    // @ts-ignore
    const vscode = acquireVsCodeApi();
    window.addEventListener("message", (pEvent) => {
      const messageType = pEvent.data.type;

      switch(messageType) {
        case 'flow-data':
          fireEvent(Event.flowLoaded, pEvent.data);
          break;
        case 'config-change':
          fireEvent(Event.configChange, pEvent.data.configs);
          break;
        default:
          break;
      }
    });
    vscode.postMessage({
      command: 'load'
    });
  }, []);

  //Render
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <FlowVisualiser/>
    </div>
  )
}