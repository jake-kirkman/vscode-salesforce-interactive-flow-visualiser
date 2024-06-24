/*=========================================================
    Imports
=========================================================*/

import Event from "../enums/event";
import EventListenerIdentifier from "../models/utility/event-listener-identifier";

/*=========================================================
    Constants
=========================================================*/

const EVENT_LISTENERS: Record<Event, ((...pParams: any) => void)[]> = {
  [Event.flowLoaded]: [],
  [Event.configLoaded]: [],
  [Event.animateArrows]: [],
  [Event.configChange]: []
};

/*=========================================================
    Methods
=========================================================*/

export function registerListener(pEvent: Event, pCallback: (...pParams: any) => void): EventListenerIdentifier {
  let callbacks = EVENT_LISTENERS[pEvent];
  if(undefined === callbacks) {
    callbacks = [];
    EVENT_LISTENERS[pEvent] = (callbacks);
  }
  callbacks.push(pCallback);
  return {
    eventType: pEvent,
    callbackFunction: pCallback
  };
}

export function unregisterListener(pIdentifier: EventListenerIdentifier): void {
  const index = EVENT_LISTENERS[pIdentifier.eventType]?.indexOf(pIdentifier.callbackFunction);
  if(index != null && index !== -1) {
    EVENT_LISTENERS[pIdentifier.eventType].splice(index, 1);
  }
}

export function fireEvent(pEvent: Event, ...pPayLoad: any[]) {
  let callbacks = EVENT_LISTENERS[pEvent];
  if(undefined !== callbacks) {
    callbacks.forEach(
      (pCallback) => {
        try {
          pCallback(...pPayLoad);
        } catch(ex) {
          console.error(`Error whilst handling callbacks for ${pEvent}`, ex);
        }
      }
    )
  }
}
