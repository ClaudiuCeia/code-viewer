import React from "react";
import type { NodeComponent } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";

export const DefaultNode: NodeComponent = ({ children, ...props }) => (
  <span
    {...props}
    className={clsx(`${props.className} text-gray-200`, props.className)}
  >
    {children}
  </span>
);
