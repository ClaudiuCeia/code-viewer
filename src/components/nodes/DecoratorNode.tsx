import type { NodeComponent } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";
import { SyntaxProvider } from "../context/SyntaxContext";

export const DecoratorNode: NodeComponent = ({ children, ...props }) => (
  <SyntaxProvider nodeType="decorator" scope="local">
    <span {...props}>{children}</span>
  </SyntaxProvider>
);
