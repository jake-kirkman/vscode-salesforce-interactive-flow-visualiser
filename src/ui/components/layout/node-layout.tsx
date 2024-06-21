import { h, Fragment } from "preact";
import { PropsWithChildren } from "preact/compat";
import { NodeResizer } from "reactflow";

export type NodeLayoutProps = {
  iconSrc?: string;
  theme: string
}

export default function NodeLayout(pProps: PropsWithChildren<NodeLayoutProps>) {

  //Render
  return (
    <div className={pProps.theme}>
      {
        pProps.iconSrc ? (
          <img src={pProps.iconSrc} className="w-6 h-6 mx-auto"/>
        ) : (
          <></>
        )
      }
      <div className="grow h-full">
        {pProps.children}
      </div>
    </div>
  )
}