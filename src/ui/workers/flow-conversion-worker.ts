/*=========================================================
    Imports
=========================================================*/

import { Node, Edge, MarkerType } from "reactflow";
import FlowElement from "../models/flow/flow-element";
import Flow from "../models/flow/flow";

/*=========================================================
    Functions
=========================================================*/

export function convertFlowToReactFlow(pFlow: Flow): {nodes: Node[], edges: Edge[]} {
  if(pFlow?.elements) {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    Object.values(pFlow.elements).forEach(
      (pElement) => {
        newNodes.push(
          convertFlowNodeToReactNode(pElement)
        );
        newEdges.push(
          ...convertConnectionToReactEdge(pElement, pFlow.elements)
        );
      }
    );
    return {
      nodes: newNodes,
      edges: newEdges
    };
  } else {
    return {
      nodes: [],
      edges: []
    };
  }
}

function convertFlowNodeToReactNode(pElement: FlowElement): Node {
  return {
    id: pElement.name,
    data: {
      element: pElement
    },
    position: {
      x: pElement.x * 1.5,
      y: pElement.y * 1.5
    },
    resizing: false,
    type: pElement.type
  };
}

function convertConnectionToReactEdge(pElement: FlowElement, pFlowMap: Record<string, FlowElement>): Edge[] {
  const ret: Edge[] = [];
  pElement.connectors.forEach(
    (pConnector) => {
      if(pConnector.element) {
        const connectingElement = pFlowMap[pConnector.element];
        const newEdge: Edge = {
          id: `e${pElement.name}-${pConnector.element}`,
          source: pElement.name,
          target: pConnector.element,
          label: pConnector.label,
          type: "step",
          markerEnd: {
            type: MarkerType.ArrowClosed
          },
          sourceHandle: pConnector.type
        };
        ret.push(newEdge);
      }
    }
  );
  return ret;
}