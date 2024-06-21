import { h, Fragment } from "preact";
import { Handle, Node, NodeResizer, NodeToolbar, Position } from 'reactflow';
import FlowElement from "../../models/flow/flow-element";
import NodeLayout from "../layout/node-layout";
import NodeButton from "../utility/node-button";

type FlowXmlNodeData = {
  element: FlowElement;
  onDelete: (pNodeId: string) => void
}

export default function FlowXmlNode(pProps: Node<FlowXmlNodeData>) {
 
  return (
    <>
      <NodeResizer minWidth={200} minHeight={200}/>
      <NodeLayout theme="bg-white text-black rounded-md p-2 h-full">
        <div className="h-full flex flex-col gap-2 justify-center align-middle">
          <div className="flex justify-between pb-2">
            <span>
              {pProps.data.element.name} XML
            </span>
            <button onClick={() => pProps.data.onDelete(pProps.id)} className="border-solid border rounded-md border-white p-1 bg-black text-white">
              Delete
            </button>
          </div>
          <div className="grow rounded-md overflow-auto w-full h-full">
            <pre className="bg-slate-200 p-2 w-full h-fit">
              <code className="bg-slate-200 text-black">
                {pProps.data.element.rawXml}
              </code>
            </pre>
          </div>
        </div>
      </NodeLayout>
    </>
  );
}