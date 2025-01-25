import { useEffect, useMemo, useState } from "react";
import Parser from "web-tree-sitter";
import { PythonCodeViewer, type ASTPath } from "../PythonCodeViewer";
import { shuffle } from "../../lib/shuffle";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { DraggableAnswer, type AnswerNode } from "./DraggableAnswer";
import { DroppableContainer } from "./DroppableContainer";

type Props = {
  badAnswers: AnswerNode[];
  paths: ASTPath[];
  code: string;
  filter?: (node: Parser.SyntaxNode) => boolean;
};

export const FillInExercise: React.FC<Props> = ({
  badAnswers,
  paths,
  code,
  filter = (n: Parser.SyntaxNode) => !["identifier"].includes(n.type),
}) => {
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
      <div>
        <PythonCodeViewer
          code={code}
          paths={paths}
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
          filter={filter}
          className="text-md md:text-lg"
        />
      </div>

      <div className="flex flex-wrap content-start pl-8">
        {!finished && !isLoading && (
          <>
            {answers.map((answer) => (
              <DraggableAnswer
                key={answer.id}
                node={answer}
                onClick={handleNodeClick}
                className="m-2"
              />
            ))}
          </>
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
    </div>
  );
};
