import { useDrop } from "react-dnd";
import type Parser from "web-tree-sitter";
import { type AnswerNode } from "./DraggableAnswer";
import { clsx } from "../../lib/clsx";

type Props = {
  node: Parser.SyntaxNode;
  onMatch: (node: Parser.SyntaxNode) => void;
  children: React.ReactNode;
};

export const DroppableContainer: React.FC<Props> = ({
  node,
  children,
  onMatch,
}) => {
  const [{ isOver, candidate }, drop] = useDrop<
    AnswerNode,
    unknown,
    { isOver: boolean; candidate: AnswerNode | null }
  >(() => ({
    accept: "NODE",
    drop: (item, _monitor) => {
      if (item.id === node.id) {
        onMatch(node);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      candidate: monitor.getItem(),
    }),
  }));

  return (
    <span
      ref={drop}
      className={clsx(
        "px-4 py-1 border border-dashed border-gray-200 rounded-md relative duration-300 transition-all",
        isOver && ""
      )}
    >
      {isOver ? candidate?.text : <span className="blur-sm">{children}</span>}
    </span>
  );
};
