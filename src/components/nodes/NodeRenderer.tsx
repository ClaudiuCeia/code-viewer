import React from "react";
import type Parser from "web-tree-sitter";
import { DefaultNode } from "./DefaultNode";
import { NodeTypeMap } from "./NoteTypeMap";
import { clsx } from "../../lib/clsx";
import type { ASTPath } from "../PythonCodeViewer";

type NodeRendererProps = {
  node: Parser.SyntaxNode;
  className?: string;
  children: React.ReactNode;
  isSelected?: boolean;
  isHovered?: boolean;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<number | null>>;
  onHover?: (id: number | null) => void;
  onClick?: (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    node: Parser.SyntaxNode,
  ) => void;
};

export const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  className,
  setSelectedNodeId,
  children,
  onHover,
  onClick,
}) => {
  const Component = NodeTypeMap[node.type] || DefaultNode;

  return (
    <Component
      data-node={node}
      className={clsx(className)}
      onClick={(ev) => {
        setSelectedNodeId(node.id);
        onClick?.(ev, node);
      }}
      onMouseOver={(e) => {
        e.stopPropagation();
        onHover?.(node.id);
      }}
      onMouseOut={(e) => {
        e.stopPropagation();
        onHover?.(null);
      }}
    >
      {children}
    </Component>
  );
};
