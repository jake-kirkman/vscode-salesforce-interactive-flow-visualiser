import { h, Fragment } from "preact";
import { useState } from "preact/hooks";

import CHEVRON_RIGHT from '../../assets/chevronright.svg';
import CHEVRON_DOWN from '../../assets/chevrondown.svg';
import { fireEvent } from "../../workers/event-worker";
import Event from "../../enums/event";
import AnimateArrowsEvent from "../../models/events/animate-arrows-event";

export default function Toolbar() {

  //Vars
  const [expanded, setExpanded] = useState<boolean>(true);

  //Render
  return (
    <div className="w-48 p-1 flex flex-col gap-2 rounded border dark:border-white border-black bg-vscode-background">
      <button onClick={() => setExpanded(!expanded)} className="flex gap-2 w-full p-1 items-center">
        <img src={expanded ? CHEVRON_DOWN : CHEVRON_RIGHT} className="dark:text-white text-black" width={12} height={12}/>
        Tools
      </button>
      {
        expanded ? (
          <>
            <hr/>
            <button 
              className="p-1 w-full rounded border dark:border-white border-black"
              onClick={() => fireEvent(Event.animateArrows, {})}
            >
              Animate Arrows
            </button>
            {/* <button 
              className="p-1 w-full rounded border dark:border-white border-black"
            >
              Show Flow Variables
            </button> */}
          </>
        ) : (
          <></>
        )
      }
    </div>
  );
}