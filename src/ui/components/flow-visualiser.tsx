import { h, Fragment } from "preact";
import ReactFlow, { Node, Edge, applyNodeChanges, Controls, MiniMap, NodeChange, Panel, Position } from "reactflow";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import FlowElement from "../models/flow/flow-element";
import FlowLoopNode from "./nodes/flow-loop-node";
import { convertFlowToReactFlow } from "../workers/flow-conversion-worker";
import FlowGenericNode from "./nodes/flow-generic-node";
import FlowXmlNode from "./nodes/flow-xml-node";
import Flow from "../models/flow/flow";
import { registerListener, unregisterListener } from "../workers/event-worker";
import Event from "../enums/event";
import Toolbar from "./overlays/toolbar";

const NODE_TYPES = {
  loop: FlowLoopNode,
  screen: FlowGenericNode,
  action: FlowGenericNode,
  subflow: FlowGenericNode,
  assignment: FlowGenericNode,
  decision: FlowGenericNode,
  transform: FlowGenericNode,
  sort: FlowGenericNode,
  filter: FlowGenericNode,
  recordCreate: FlowGenericNode,
  recordUpdate: FlowGenericNode,
  recordDelete: FlowGenericNode,
  recordLookup: FlowGenericNode,
  recordRollback: FlowGenericNode,
  start: FlowGenericNode,
  xml: FlowXmlNode
};

export default function FlowVisualiser() {

  //State
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  console.log('##Item : render : ');

  //Useful Data
  const nodeMap = useMemo(() => {
    return nodes.reduce(
      (pMap: Record<string, Node>, pVal: Node) => {
        pMap[pVal.id] = pVal;
        return pMap;
      },
      {}
    )
  }, [nodes]);

  //Functions
  const onNodeChange = useCallback((e: NodeChange[]) => {
    e = e.filter(
      pEvent => {
        const element = pEvent.type === 'dimensions' ? nodeMap[pEvent.id] : undefined;
        return pEvent.type !== 'dimensions' || pEvent.dimensions?.width !== element?.width || pEvent.dimensions?.height !== element?.height;
      }
    );
    if(e.length > 0) {
      setNodes((pCurrentNodes) => applyNodeChanges(e, pCurrentNodes));
    }
  }, [nodes]);

  const removeNode = useCallback(
    (pNodeId: string) => {
      setNodes(
        (pCurrentNodes) => {
          const index = pCurrentNodes.findIndex(pNodeInArray => pNodeInArray.id === pNodeId);
          if(index !== -1) {
            pCurrentNodes.splice(index, 1);
          }
          return [...pCurrentNodes];
        }
      )
    }, [nodes]
  )

  const onOpenXml = useCallback(
    (pNodeId: string) => {
      const node = nodeMap[pNodeId];
      setNodes(
        (pCurrentNodes) => {
          pCurrentNodes.push({
            id: `xml-${node.id}`,
            position: {
              x: node.position.x + (node.width || 100) + 10,
              y: node.position.y
            },
            data: {
              element: node.data.element,
              onDelete: (pXmlNodeId: string) => removeNode(pXmlNodeId)
            },
            deletable: true,
            type: 'xml'
          });
          return [...pCurrentNodes];
        }
      )
    },
    [nodes]
  );

  //Startup
  useEffect(
    () => {
      nodes.forEach(
        pNode => {
          pNode.data.onOpenXml = () => onOpenXml(pNode.id);
        }
      );
    },
    [nodes]
  );

  //Setup listeners
  useEffect(
    () => {
      const disposables = [
        registerListener(Event.flowLoaded, (pFlowData) => {
          try {
            console.log('##Item : Loading Flow : ');
            const result = convertFlowToReactFlow(pFlowData);
            setNodes(result.nodes);
            setEdges(result.edges);
          } catch(ex) {
            console.error(ex);
          }
        }),
        registerListener(Event.animateArrows, () => {
          setEdges(
            (pCurrentEdges) => {
              const newEdges: Edge[] = [];
              pCurrentEdges.forEach(
                pEdge => {
                  pEdge.animated = !pEdge.animated;
                  newEdges.push(pEdge);
                }
              );
              return newEdges;
            }
          );
        })
      ];
      return () => {
        disposables.forEach(
          pDisposable => unregisterListener(pDisposable)
        );
      };
    },
    []
  );


  return (
    <div 
      className="w-full h-full relative overflow-clip"
    >
      {
        nodes.length > 0 ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodeChange}
            nodesConnectable={false}
            nodeTypes={NODE_TYPES}
          >
            <Controls/>
            <MiniMap pannable zoomable/>
            <Panel position={Position.Right}>
              <Toolbar/>
            </Panel>
          </ReactFlow>
        ) : (
          <>Loading...</>
        )
      }
    </div>
  )
}