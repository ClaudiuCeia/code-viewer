import React from "react";
import type { NodeComponent } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";

export const NumericLiteralNode: NodeComponent = ({ children, ...props }) => (
  <span
    {...props}
    className={clsx(`${props.className} text-blue-300`, props.className)}
  >
    {children}
  </span>
);
