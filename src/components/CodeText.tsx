import React from "react";
import type Parser from "web-tree-sitter";

type CodeTextProps = {
  node: Parser.SyntaxNode;
  isSelected: boolean;
  onMouseOver: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onMouseOut: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

export const CodeText: React.FC<CodeTextProps> = ({
  node,
  isSelected,
  onMouseOver,
  onMouseOut,
}) => {
  const baseClasses = "whitespace-pre"; // Preserves whitespace and line breaks
  const selectionClass = isSelected ? "bg-yellow-300" : "bg-transparent";

  const className = `${baseClasses} ${selectionClass}`;

  return (
    <span
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={className}
    >
      {node.text}???
    </span>
  );
};
