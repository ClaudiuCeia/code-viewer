import { DndProvider, TouchTransition, MouseTransition } from "react-dnd-multi-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { Ex01 } from "./exercises/Ex01";
import { PreviewAnswer } from "./exercises/PreviewAnswer";

export const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
      preview: false,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: false,
      transition: TouchTransition,
    },
  ],
};
export const Exercise01: React.FC = () => {
  return (
    <DndProvider options={HTML5toTouch}>
      <Ex01 />
      <PreviewAnswer />
    </DndProvider>
  );
};
