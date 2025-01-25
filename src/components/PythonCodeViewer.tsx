import React, { useEffect, useState, type ReactElement } from "react";
import Parser from "web-tree-sitter";
import { CodeSpan } from "./CodeSpan";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { clsx } from "../lib/clsx";

export type ASTPath = number[];
type ASTPathMapping = Map<ASTPath, React.FC>;

type Props = {
  code: string;
  paths?: ASTPath[];
  className?: string;
  onParse?: (path: ASTPath, node: Parser.SyntaxNode) => void;
  onClick?: (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    path: ASTPath,
    node: Parser.SyntaxNode
  ) => void;
  filter?: (node: Parser.SyntaxNode) => boolean;
  container?: (node: Parser.SyntaxNode, children: React.ReactNode) => React.ReactNode;
};

function getNodeByPath(
  node: Parser.SyntaxNode,
  path: number[]
): Parser.SyntaxNode | null {
  let currentNode = node;
  for (const index of path) {
    if (!currentNode.children || index >= currentNode.children.length) {
      return null;
    }
    currentNode = currentNode.children[index];
  }
  return currentNode;
}

const defaultFilter = (node: Parser.SyntaxNode) =>
  !["identifier"].includes(node.type);

export const PythonCodeViewer = ({
  code,
  paths,
  className,
  onParse = (_path: ASTPath, _node: Parser.SyntaxNode) => {},
  onClick,
  filter = defaultFilter,
  container = (_node: Parser.SyntaxNode, children: React.ReactNode) => <>{children}</>,
}: Props) => {
  const [tree, setTree] = useState<Parser.Tree>();
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const [nodes, setNodes] = useState<Map<ASTPath, Parser.SyntaxNode>>();

  useEffect(() => {
    const parse = async () => {
      await Parser.init();
      const parser = new Parser();
      const python = await Parser.Language.load("/tree-sitter-python.wasm");
      parser.setLanguage(python);
      const tree = parser.parse(code);
      setTree(tree);

      if (!paths) {
        return;
      }

      const pathsMap: Map<ASTPath, Parser.SyntaxNode> = new Map();
      const addNodesAtPath = (path: ASTPath, node: Parser.SyntaxNode) => {
        if (!filter(node)) {
          console.log("Added", node.toString());
          pathsMap.set(path, node);
          onParse(path, node);
        }

        node.children.forEach((child, index) => {
          const childPath = [...path, index];
          console.log("Adding children", child.toString(), childPath);
          addNodesAtPath(childPath, child);
        });
      };

      console.log("Parsing paths", paths);
      paths.forEach((path) => {
        const node = getNodeByPath(tree.rootNode, path);
        if (!node) {
          console.warn("no node found at", path);
          return;
        }

        addNodesAtPath(path, node);
      });

      setNodes(pathsMap);
    };

    parse();
  }, [code]);

  const handleClick = (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    node: Parser.SyntaxNode
  ) => {
    const [path] = nodes?.entries().find(([p, n]) => n.id === node.id) || [];
    if (!path) {
      return;
    }

    onClick?.(ev, path, node);
  };

  function getNodeById(tree: Parser.Tree, id: number): Parser.SyntaxNode | null {
    const findNode = (node: Parser.SyntaxNode): Parser.SyntaxNode | null => {
      if (node.id === id) {
        return node;
      }
      for (const child of node.children) {
        const found = findNode(child);
        if (found) {
          return found;
        }
      }
      return null;
    };
  
    return findNode(tree.rootNode);
  }
  
  const getPathToNode = (node: Parser.SyntaxNode): ASTPath => {
    const path: ASTPath = [];
    let currentNode = node;

    while (currentNode.parent) {
      const parent = currentNode.parent;
      const index = parent.children.findIndex((child) => child.id === currentNode.id);
      path.unshift(index);
      currentNode = parent;
    }

    return path;
  };

  return (
    <div
      className={clsx("font-mono whitespace-pre bg-gray-900 rounded-lg inline-block p-4 md:p-20 pl-4 md:pl-14", className)}
      style={{ fontFamily: "Fira Code" }}
    >
      {tree ? (
        <CodeSpan
          node={tree.rootNode}
          code={code}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
          onHover={(id: number | null) => {
            setHoveredNodeId(id);
            const node = getNodeById(tree!, id!);
            node && console.log(getPathToNode(node))
          }}
          hoveredNodeId={hoveredNodeId}
          onClick={handleClick}
          container={container}
        />
      ) : <div className="flex items-center justify-center w-48 h-48"><ArrowPathIcon className="animate-spin text-white h-8 w-8" /></div>}
    </div>
  );
};
