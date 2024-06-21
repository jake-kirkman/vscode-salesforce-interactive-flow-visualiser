import Event from "../../enums/event"

type EventListenerIdentifier = {
  eventType: Event;
  callbackFunction: (...pParams: any) => void;
};
export default EventListenerIdentifier;