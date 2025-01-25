import React from "react";
import type { NodeComponent } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";

export const StringLiteralNode: NodeComponent = ({ children, ...props }) => (
  <span
    {...props}
    className={clsx(`${props.className} text-green-500`, props.className)}
  >
    {children}
  </span>
);
