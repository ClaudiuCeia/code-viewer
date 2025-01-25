import React, { createContext } from "react";

export type SyntaxContextType = {
  nodeType: string; // Type of the current node (e.g., "function_definition", "identifier")
  scope: string; // Current scope (e.g., "global", "local", "parameter")
  parentType?: string; // Optional: Type of the parent node
  metadata?: Record<string, any>; // Optional: Additional metadata
};

const defaultSyntaxContext: SyntaxContextType = {
  nodeType: "default",
  scope: "global",
};

const SyntaxContext = createContext<SyntaxContextType>(defaultSyntaxContext);

const SyntaxProvider: React.FC<React.PropsWithChildren<SyntaxContextType>> = ({
  children,
  ...contextValue
}) => {
  return (
    <SyntaxContext.Provider value={contextValue}>
      {children}
    </SyntaxContext.Provider>
  );
};

export { SyntaxContext, SyntaxProvider };
