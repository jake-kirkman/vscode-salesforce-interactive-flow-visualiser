import Flow from '../models/flow/flow';
import FlowElement from '../models/flow/flow-element';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

function arrayify<T>(pItem: T | T[]): T[] {
  return pItem ? (Array.isArray(pItem) ? pItem : [pItem]) : [];
}

export function parseFlowXml(pFileName: string, pFlowXml: string): Flow {
  const xml = new XMLParser().parse(pFlowXml);
  console.log(`## XML : `, xml);

  if(!xml.Flow) {
    throw new Error('XML is not a valid Salesforce Flow');
  }
  
  return {
    fileName: pFileName,
    elements: [
      ...arrayify(xml.Flow.start).map(convertStartObject),
      ...arrayify(xml.Flow.actionCalls).map(convertActionObject),
      ...arrayify(xml.Flow.assignments).map(convertAssignmentObject),
      ...arrayify(xml.Flow.subflows).map(convertSubFlowObject),
      ...arrayify(xml.Flow.collectionProcessors).map(convertCollectionObject),
      ...arrayify(xml.Flow.loops).map(convertLoopObject),
      ...arrayify(xml.Flow.decisions).map(convertDecisionObject),
      ...arrayify(xml.Flow.recordLookups).map(convertLookupObject),
      ...arrayify(xml.Flow.recordUpdates).map(convertUpdateObject),
      ...arrayify(xml.Flow.recordCreates).map(convertCreateObject),
      ...arrayify(xml.Flow.recordDeletes).map(convertDeleteObject),
      ...arrayify(xml.Flow.recordRollbacks).map(convertRollbackObject),
      ...arrayify(xml.Flow.screens).map(convertScreenObject)
    ].reduce(
      (pObj: {[key: string]: FlowElement}, pElement: FlowElement) => {
        pObj[pElement.name] = pElement;
        return pObj;
      },
      {}
    )
  }
}

/*=========================================================
    Helper Methods
=========================================================*/

function toXml(pObject: any): string {
  return new XMLBuilder({format: true}).build(pObject);
}

/*=========================================================
    Types
=========================================================*/

function convertScreenObject(pUpdate: any): FlowElement {
  return {
    name: pUpdate.name,
    label: pUpdate.label,
    type: 'screen',
    x: pUpdate.locationX,
    y: pUpdate.locationY,
    rawXml: toXml(pUpdate),
    connectors: [
      {element: pUpdate.connector?.targetReference, type: 'connector'}
    ]
  };
}

function convertActionObject(pAction: any): FlowElement {
  return {
    name: pAction.name,
    label: pAction.label,
    type: 'action',
    x: pAction.locationX,
    y: pAction.locationY,
    rawXml: toXml(pAction),
    connectors: [
      {element: pAction.connector?.targetReference, type: 'connector'},
      {element: pAction.faultConnector?.targetReference, label: 'On Fault', type: 'fault'}
    ]
  };
}

function convertSubFlowObject(pSubFlow: any): FlowElement {
  return {
    name: pSubFlow.name,
    label: pSubFlow.label,
    type: 'subflow',
    x: pSubFlow.locationX,
    y: pSubFlow.locationY,
    rawXml: toXml(pSubFlow),
    connectors: [
      {element: pSubFlow.connector?.targetReference, type: 'connector'},
      {element: pSubFlow.faultConnector?.targetReference, label: 'On Fault', type: 'fault'}
    ]
  };
}

function convertCollectionObject(pCollection: any): FlowElement {
  return {
    name: pCollection.name,
    label: pCollection.label,
    type: pCollection.collectionProcessorType === 'SortCollectionProcessor' ? 'sort' : 'filter',
    x: pCollection.locationX,
    y: pCollection.locationY,
    rawXml: toXml(pCollection),
    connectors: [
      {element: pCollection.connector?.targetReference, type: 'connector'}
    ]
  };
}

function convertDecisionObject(pDecision: any): FlowElement {
  return {
    name: pDecision.name,
    label: pDecision.label,
    type: 'decision',
    x: pDecision.locationX,
    y: pDecision.locationY,
    rawXml: toXml(pDecision),
    connectors: [
      {element: pDecision.defaultConnector?.targetReference, label: 'Default', type: 'connector'},
      ...arrayify(pDecision.rules).map(
        (pRule: any) => ({
          element: pRule.connector?.targetReference,
          label: pRule.label, 
          type: 'connector'
        }) as any
      )
    ]
  };
}

function convertStartObject(pStart: any): FlowElement {
  return {
    name: 'start',
    label: 'Start',
    type: 'start',
    x: pStart.locationX,
    y: pStart.locationY,
    rawXml: toXml(pStart),
    connectors: [
      {element: pStart.connector?.targetReference, type: 'connector'},
      ...arrayify(pStart.scheduledPath).map(
        pConnector => ({
          element: pConnector.connector?.targetReference,
          label: pConnector.label,
          type: 'connector'
        }) as any
      )
    ]
  };
}

function convertAssignmentObject(pAssignment: any): FlowElement {
  return {
    name: pAssignment.name,
    label: pAssignment.label,
    type: 'assignment',
    x: pAssignment.locationX,
    y: pAssignment.locationY,
    rawXml: toXml(pAssignment),
    connectors: [
      {element: pAssignment.connector?.targetReference, type: 'connector'}
    ]
  };
}

function convertLoopObject(pLoop: any): FlowElement {
  return {
    name: pLoop.name,
    label: pLoop.label,
    type: 'loop',
    x: pLoop.locationX,
    y: pLoop.locationY,
    rawXml: toXml(pLoop),
    connectors: [
      {element: pLoop.nextValueConnector?.targetReference, type: 'connector'}, 
      {element: pLoop.noMoreValuesConnector?.targetReference, label: 'On Loop Finish', type: 'loopEnd'}
    ]
  };
}

function convertLookupObject(pLookup: any): FlowElement {
  return {
    name: pLookup.name,
    label: pLookup.label,
    type: 'recordLookup',
    x: pLookup.locationX,
    y: pLookup.locationY,
    rawXml: toXml(pLookup),
    connectors: [
      {element: pLookup.connector?.targetReference, type: 'connector'},
      {element: pLookup.faultConnector?.targetReference, label: 'On Fault', type: 'fault'}
    ]
  };
}

function convertUpdateObject(pRecordUpdate: any): FlowElement {
  return {
    name: pRecordUpdate.name,
    label: pRecordUpdate.label,
    type: 'recordUpdate',
    x: pRecordUpdate.locationX,
    y: pRecordUpdate.locationY,
    rawXml: toXml(pRecordUpdate),
    connectors: [
      {element: pRecordUpdate.connector?.targetReference, type: 'connector'},
      {element: pRecordUpdate.faultConnector?.targetReference, label: 'On Fault', type: 'fault'}
    ]
  };
}

function convertCreateObject(pRecordCreate: any): FlowElement {
  return {
    name: pRecordCreate.name,
    label: pRecordCreate.label,
    type: 'recordCreate',
    x: pRecordCreate.locationX,
    y: pRecordCreate.locationY,
    rawXml: toXml(pRecordCreate),
    connectors: [
      {element: pRecordCreate.connector?.targetReference, type: 'connector'},
      {element: pRecordCreate.faultConnector?.targetReference, label: 'On Fault', type: 'fault'}
    ]
  };
}

function convertDeleteObject(pRecordDelete: any): FlowElement {
  return {
    name: pRecordDelete.name,
    label: pRecordDelete.label,
    type: 'recordDelete',
    x: pRecordDelete.locationX,
    y: pRecordDelete.locationY,
    rawXml: toXml(pRecordDelete),
    connectors: [
      {element: pRecordDelete.connector?.targetReference, type: 'connector'},
      {element: pRecordDelete.faultConnector?.targetReference, label: 'On Fault', type: 'fault'}
    ]
  };
}

function convertRollbackObject(pRecordRollback: any): FlowElement {
  return {
    name: pRecordRollback.name,
    label: pRecordRollback.label,
    type: 'recordRollback',
    x: pRecordRollback.locationX,
    y: pRecordRollback.locationY,
    rawXml: toXml(pRecordRollback),
    connectors: [
      {element: pRecordRollback.connector?.targetReference, type: 'connector'},
      {element: pRecordRollback.faultConnector?.targetReference, label: 'On Fault', type: 'fault'}
    ]
  };
}