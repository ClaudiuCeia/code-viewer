import { usePreview } from "react-dnd-multi-backend";
import type { AnswerNode } from "./DraggableAnswer";
import { AnswerPill } from "./AnswerPill";

export const PreviewAnswer = () => {
  const preview = usePreview<AnswerNode>();
  if (!preview.display) {
    return null;
  }
  const { item, style } = preview;

  return <AnswerPill node={item} style={style} />
};
