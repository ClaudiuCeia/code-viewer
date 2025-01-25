import React from "react";
import type { NodeComponent } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";
import { SyntaxProvider } from "../context/SyntaxContext";

export const ParametersNode: NodeComponent = ({ children, ...props }) => {
  return (
    <SyntaxProvider nodeType="parameters" scope="local">
      <span
        {...props}
        className={clsx(`${props.className} text-purple-300`, props.className)}
      >
        {children}
      </span>
    </SyntaxProvider>
  );
};
