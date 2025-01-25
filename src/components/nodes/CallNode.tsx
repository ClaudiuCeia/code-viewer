import type { NodeComponent } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";
import { SyntaxProvider } from "../context/SyntaxContext";

export const CallNode: NodeComponent = ({ children, ...props }) => (
  <SyntaxProvider nodeType="call" scope="local">
    <span {...props}>{children}</span>
  </SyntaxProvider>
);
