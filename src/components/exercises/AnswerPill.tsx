import { clsx } from "../../lib/clsx";
import type { AnswerNode } from "./DraggableAnswer";

type Props = {
  node: AnswerNode;
  isDragging?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const AnswerPill: React.FC<Props> = ({
  node,
  isDragging = false,
  ...rest
}) => (
  <div
    {...rest}
    className={clsx(
      `h-8 px-4 rounded-md font-bold text-gray-900 items-center justify-center text-center content-center  cursor-move bg-gray-200`,
      isDragging ? "opacity-0" : "",
      rest.className
    )}
  >
    {node.text}
  </div>
);
