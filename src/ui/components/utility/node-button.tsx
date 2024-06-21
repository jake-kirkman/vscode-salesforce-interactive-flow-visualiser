import { h } from "preact";

export type NodeButtonProps = {
  label: string;
  onClick: () => void;
}

export default function NodeButton(pProps: NodeButtonProps) {

  //Render
  return (
    <button onClick={pProps.onClick} className="w-full p-2 border-t border-b border-solid border-black">
      {pProps.label}
    </button>
  );
}