import type { NodeComponent } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";
import { SyntaxProvider } from "../context/SyntaxContext";

export const TypeNode: NodeComponent = ({ children, ...props }) => {
  return (
    <SyntaxProvider nodeType="type" scope="local">
      <span
        {...props}
        className={clsx(`${props.className} text-blue-500`, props.className)}
      >
        {children}
      </span>
    </SyntaxProvider>
  );
};
