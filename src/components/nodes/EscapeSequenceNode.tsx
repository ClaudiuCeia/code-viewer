import type { NodeComponent } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";
import { useSyntaxContext } from "../hooks/useSyntaxContext";

const StyleMapping: Record<string, string> = {
  string: "text-green-500",
};
export const EscapeSequenceNode: NodeComponent = ({ children, ...props }) => {
  const { nodeType, scope } = useSyntaxContext();

  const color = StyleMapping[nodeType] || "text-yellow-200";

  return (
    <span {...props} className={clsx(props.className, color)}>
      {children}
    </span>
  );
};
