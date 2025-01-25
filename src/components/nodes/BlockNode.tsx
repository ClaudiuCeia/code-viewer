import type { NodeComponent } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";
import { SyntaxProvider } from "../context/SyntaxContext";

export const BlockNode: NodeComponent = ({ children, ...props }) => (
  <SyntaxProvider nodeType="block" scope="local">
    <span {...props}>{children}</span>
  </SyntaxProvider>
);
