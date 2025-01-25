import React, { useState } from "react";
import type Parser from "web-tree-sitter";
import { NodeRenderer } from "./nodes/NodeRenderer";

type CodeSpanProps = {
  node: Parser.SyntaxNode;
  code: string;
  selectedNodeId: number | null;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<number | null>>;
  hoveredNodeId: number | null;
  onHover: (id: number | null) => void;
  onClick?: (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    node: Parser.SyntaxNode
  ) => void;
  container: (
    node: Parser.SyntaxNode,
    children: React.ReactNode
  ) => React.ReactNode;
};

export const CodeSpan: React.FC<CodeSpanProps> = ({
  node,
  code,
  selectedNodeId,
  setSelectedNodeId,
  hoveredNodeId,
  onHover,
  onClick,
  container = (node, children) => <>{children}</>,
}) => {
  const [hoveredNode, setHoveredNode] = useState<Parser.SyntaxNode | null>(
    null
  );

  const isSelected = selectedNodeId === node.id;
  const isHovered = hoveredNodeId === node.id;

  const renderChildren = () => {
    const children: React.ReactNode[] = [];
    let pos = node.startIndex;

    node.children.forEach((child, idx) => {
      // Preserve whitespace
      if (child.startIndex > pos) {
        const whitespace = code.slice(pos, child.startIndex);
        children.push(
          <span key={`${node.id}-ws-${idx}`} style={{ whiteSpace: "pre" }}>
            {whitespace}
          </span>
        );
      }

      // Render child node
      children.push(
        <CodeSpan
          key={`${node.id}-${idx}`}
          node={child}
          code={code}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
          onHover={onHover}
          hoveredNodeId={hoveredNodeId}
          container={container}
        />
      );

      pos = child.endIndex;
    });

    // Trailing whitespace
    if (node.endIndex > pos) {
      const trailingWhitespace = code.slice(pos, node.endIndex);
      children.push(
        <span key={`${node.id}-trailing-ws`} style={{ whiteSpace: "pre" }}>
          {trailingWhitespace}
        </span>
      );
    }

    return children;
  };

  const child = node.childCount > 0 ? renderChildren() : node.text;
  return (
    <NodeRenderer
      node={node}
      className={`
        cursor-pointer
        ${isHovered && "font-bold transition-all duration-200"}
      `}
      isSelected={isSelected}
      isHovered={isHovered}
      setSelectedNodeId={setSelectedNodeId}
      onHover={(id) => onHover(id ? node.id : null)}
      onClick={onClick}
    >
      {container(node, child)}
    </NodeRenderer>
  );
};
