import type { NodeComponent } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";
import { SyntaxProvider } from "../context/SyntaxContext";

export const ArgumentListNode: NodeComponent = ({ children, ...props }) => (
  <SyntaxProvider nodeType="argument_list" scope="local">
    <span {...props}>{children}</span>
  </SyntaxProvider>
);
