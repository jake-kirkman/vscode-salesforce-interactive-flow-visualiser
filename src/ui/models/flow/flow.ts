import FlowElement from "./flow-element";

type Flow = {
  elements: Record<string, FlowElement>;
  fileName: string;
}
export default Flow;