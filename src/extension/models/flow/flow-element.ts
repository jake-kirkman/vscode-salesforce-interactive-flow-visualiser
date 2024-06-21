type FlowElement = {
  type: (
    'screen'
    | 'action'
    | 'subflow'
    | 'assignment'
    | 'decision'
    | 'loop'
    | 'transform'
    | 'sort'
    | 'filter'
    | 'recordCreate'
    | 'recordUpdate'
    | 'recordDelete'
    | 'recordLookup'
    | 'recordRollback'
    | 'start'
  );
  name: string;
  label?: string;
  connectors: {element: string, label?: string, type: 'connector' | 'fault' | 'loopEnd'}[];
  x: number;
  y: number;
  rawXml: string;
}
export default FlowElement;