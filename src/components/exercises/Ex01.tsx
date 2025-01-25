import { DndProvider } from "react-dnd-multi-backend";
import { FillInExercise } from "./FillInExercise";
import { HTML5toTouch } from "./HTML5ToTouch";

const code = `
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
`;

const paths = [[0, 4, 0]];
const badAnswers = [
  { id: -1, text: "size", type: "fake" },
  { id: -2, text: "start", type: "fake" },
  { id: -3, text: "end", type: "fake" },
  { id: -4, text: "target", type: "fake" },
  { id: -5, text: "sqrt", type: "fake" },
];

export const Ex01: React.FC = () => (
  <DndProvider options={HTML5toTouch}>
    <FillInExercise badAnswers={badAnswers} code={code} paths={paths} />
  </DndProvider>
);
