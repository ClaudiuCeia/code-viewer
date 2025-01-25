import { useEffect, useMemo, useState } from "react";
import Parser from "web-tree-sitter";
import { PythonCodeViewer } from "../PythonCodeViewer";
import { shuffle } from "../../lib/shuffle";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { DraggableAnswer } from "./DraggableAnswer";
import { DroppableContainer } from "./DroppableContainer";

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

const blankNodePaths = [[0, 4, 0]];
const badAnswers = [
  { id: -1, text: "size", type: "fake" },
  { id: -2, text: "start", type: "fake" },
  { id: -3, text: "end", type: "fake" },
  { id: -4, text: "target", type: "fake" },
  { id: -5, text: "sqrt", type: "fake" },
];

export const Ex01: React.FC = () => {
  const [nodes, setNodes] = useState<Parser.SyntaxNode[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!isLoading && nodes.length === 0) {
      setFinished(true);
    }
  }, [nodes, isLoading]);

  const handleNodeClick = (
    node: Parser.SyntaxNode | (typeof badAnswers)[number]
  ) => {
    setNodes((nodes) =>
      nodes.reduce(
        (acc, n) => (n.id === node.id ? acc : [...acc, n]),
        [] as Parser.SyntaxNode[]
      )
    );
  };

  const answers = useMemo(() => shuffle([...nodes, ...badAnswers]), [nodes]);

  return (
    <div className="flex w-full flex-col md:flex-row">
      <PythonCodeViewer
        code={code}
        paths={blankNodePaths}
        onParse={(_path, node) => {
          setIsloading(false);
          setNodes((prev) => [...prev, node]);
        }}
        onClick={(ev, path, node) => {
          console.log(ev, path, node);
        }}
        container={(node, children) =>
          !nodes.find((n) => n.id === node.id) ? (
            <>{children}</>
          ) : (
            <DroppableContainer node={node} onMatch={handleNodeClick}>
              {children}
            </DroppableContainer>
          )
        }
        filter={(n: Parser.SyntaxNode) => !["identifier"].includes(n.type)}
        className="text-md md:text-lg"
      />

      {!finished && !isLoading && (
        <div className="ml-8 mt-2 grid grid-cols-4 gap-4 content-start">
          {answers.map((answer) => (
            <DraggableAnswer
              key={answer.id}
              node={answer}
              onClick={handleNodeClick}
            />
          ))}
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center">
          <ArrowPathIcon className="animate-spin w-8 h-8 text-sky-500 ml-24" />
        </div>
      )}
      {finished && (
        <div className="flex flex-grow items-center justify-center">
          <span>Congratulations!</span>
        </div>
      )}
    </div>
  );
};
