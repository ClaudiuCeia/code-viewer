import type { NodeComponent } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";
import { useSyntaxContext } from "../hooks/useSyntaxContext";

const StyleMapping: Record<string, string> = {
  function_definition: "text-red-500",
  class_definition: "text-red-500",
  parameters: "text-gray-200",
  decorator: "text-gray-300",
  type: "text-amber-400",
  call: "text-amber-400",
};
export const IdentifierNode: NodeComponent = ({ children, ...props }) => {
  const { nodeType, scope } = useSyntaxContext();

  const color = StyleMapping[nodeType] || "text-yellow-200";

  return (
    <span {...props} className={clsx(props.className, color)}>
      {children}
    </span>
  );
};
