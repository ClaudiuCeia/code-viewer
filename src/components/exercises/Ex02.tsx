import { DndProvider } from "react-dnd-multi-backend";
import { FillInExercise } from "./FillInExercise";
import { HTML5toTouch } from "./HTML5ToTouch";
import type Parser from "web-tree-sitter";

const code = `
def get_top_students(scores):
    # Step 1: Filter students with passing grades
    passing_students = []
    for student, grade in scores.items():
        if grade >= 60:
            passing_students.append((student, grade))
    
    # Step 2: Sort the students by their grades (highest first)
    sorted_students = sorted(passing_students, key=lambda x: x[1], reverse=True)
    
    # Step 3: Extract student names from the sorted list
    top_names = []
    for student, grade in sorted_students:
        top_names.append(student)
    
    return top_names
`;

const paths = [[0, 5, 3, 0]];
const badAnswers = [
  { id: -2, text: "sorted_students = sorted(passing_students, key=lambda x: x[0], reverse=True)", type: "fake" },
  { id: -3, text: "sorted_students = sorted(passing_students, key=lambda (x, y): x)", type: "fake" },
];

export const Ex02: React.FC = () => (
  <DndProvider options={HTML5toTouch}>
    <FillInExercise
      badAnswers={badAnswers}
      code={code}
      paths={paths}
      filter={(n: Parser.SyntaxNode) =>
        !["expression_statement", "assignment"].includes(n.type)
      }
    />
  </DndProvider>
);
