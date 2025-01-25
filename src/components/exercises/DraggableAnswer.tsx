import { useDrag, DragPreviewImage } from "react-dnd";
import type Parser from "web-tree-sitter";
import { AnswerPill } from "./AnswerPill";

export type AnswerNode = Pick<Parser.SyntaxNode, "id" | "type" | "text">;
type Props = {
  node: AnswerNode;
  onClick: (node: AnswerNode) => void;
};

export const DraggableAnswer: React.FC<Props> = ({ node, onClick }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "NODE",
    item: node,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      onClick={(e) => {
        onClick(node);
      }}
    >
      <AnswerPill node={node} isDragging={isDragging} />
    </div>
  );
};
