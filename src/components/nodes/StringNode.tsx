import type { NodeComponent } from "./NoteTypeMap";
import { SyntaxProvider } from "../context/SyntaxContext";

export const StringNode: NodeComponent = ({ children, ...props }) => (
  <SyntaxProvider nodeType="string" scope="local">
    <span {...props}>{children}</span>
  </SyntaxProvider>
);
