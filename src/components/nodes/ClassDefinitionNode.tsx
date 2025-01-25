import type { NodeComponent } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";
import { SyntaxProvider } from "../context/SyntaxContext";

export const ClassDefinitionNode: NodeComponent = ({ children, ...props }) => (
  <SyntaxProvider nodeType="class_definition" scope="local">
    <span {...props}>{children}</span>
  </SyntaxProvider>
);
