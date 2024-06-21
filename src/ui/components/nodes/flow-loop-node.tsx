import { h, Fragment } from "preact";
import { Handle, Node, Position } from 'reactflow';
import NodeLayout from "../layout/node-layout";
import LoopIcon from '../../assets/loop.svg';
import FlowElement from "../../models/flow/flow-element";
import { TYPE_CONSTANTS } from "../../constants/node-constants";
import NodeButton from "../utility/node-button";

type FlowLoopNodeData = {
  element: FlowElement;
  onOpenXml: () => void;
}
 
export default function FlowLoopNode(pProps: Node<FlowLoopNodeData>) {

  const typeInfo = TYPE_CONSTANTS[pProps.data.element.type] || {};
 
  return (
    <>
      <Handle 
        type="target" 
        position={Position.Top} 
      />
      <NodeLayout theme={typeInfo.theme} iconSrc={typeInfo.icon || ''}>
        {pProps.data.element.label}
        <div className="w-full flex flex-col gap-1">
          <NodeButton label="Open XML" onClick={pProps.data.onOpenXml}/>
        </div>
      </NodeLayout>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="loopEnd" 
        style={{
          left: '25%'
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="connector"
        style={{
          left: '75%'
        }}
      />
    </>
  );
}