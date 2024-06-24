import { h, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import { registerListener, unregisterListener } from "../../workers/event-worker";
import Event from "../../enums/event";

export type EventListenerUtilityProps = {
  event: Event;
  onEvent: (...pParams: any[]) => void;
}

export default function EventListenerUtility(pProps: EventListenerUtilityProps) {

  useEffect(
    () => {
      const callback = registerListener(pProps.event, pProps.onEvent);
      return () => {
        unregisterListener(callback);
      };
    },
    [pProps.onEvent]
  );

  //Render
  return <></>;
}