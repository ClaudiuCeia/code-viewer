import { useContext } from "react";
import {
    SyntaxContext,
    type SyntaxContextType,
} from "../context/SyntaxContext";

export const useSyntaxContext = (): SyntaxContextType => {
    const context = useContext(SyntaxContext);
    if (!context) {
        throw new Error(
            "useSyntaxContext must be used within a SyntaxProvider",
        );
    }
    return context;
};
