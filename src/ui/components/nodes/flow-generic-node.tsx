import { h, Fragment } from "preact";
import { Handle, Node, Position } from 'reactflow';
import FlowElement from "../../models/flow/flow-element";
import NodeLayout from "../layout/node-layout";
import { TYPE_CONSTANTS } from "../../constants/node-constants";
import NodeButton from "../utility/node-button";

type FlowGenericNodeData = {
  element: FlowElement;
  onOpenXml: () => void;
}

export default function FlowGenericNode(pProps: Node<FlowGenericNodeData>) {

  const typeInfo = TYPE_CONSTANTS[pProps.data.element.type] || {};
 
  return (
    <>
      <Handle 
        type="target" 
        position={Position.Top} 
      />
      <NodeLayout theme={typeInfo.theme} iconSrc={typeInfo.icon || ''}>
        <div className="w-full text-center">
          {pProps.data.element.label}
        </div>
        <div className="w-full flex flex-col gap-1 pt-1">
          <NodeButton label="Open XML" onClick={pProps.data.onOpenXml}/>
        </div>
      </NodeLayout>
      <Handle
        type="source"
        position={Position.Bottom}
        id="connector"
      />
      {
        typeInfo.canFault ? (
          <Handle
            type="source"
            position={Position.Right}
            id="fault"
          />
        ) : (
          <></>
        )
      }
    </>
  );
}