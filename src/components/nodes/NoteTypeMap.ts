import type Parser from "web-tree-sitter";
import { FunctionDefinitionNode } from "./FunctionDefinitionNode";
import { IdentifierNode } from "./IdentifierNode";
import { WhileStatementNode } from "./WhileStatementNode";
import { KeywordNode } from "./KeywordNode";
import { CommentNode } from "./CommentNode";
import { NumericLiteralNode } from "./NumericLiteralNode";
import { BooleanLiteralNode } from "./BooleanLiteralNode";
import { ParametersNode } from "./ParametersNode";
import { TypeNode } from "./TypeNode";
import { StringLiteralNode } from "./StringLiteralNode";
import { BlockNode } from "./BlockNode";
import { CallNode } from "./CallNode";
import { ArgumentListNode } from "./ArgumentListNode";
import { ClassDefinitionNode } from "./ClassDefinitionNode";
import { DecoratorNode } from "./DecoratorNode";
import { StringNode } from "./StringNode";
import { EscapeSequenceNode } from "./EscapeSequenceNode";

export type NodeComponent = React.FC<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
    >
>;

export const NodeTypeMap: Partial<Record<string, NodeComponent>> = {
    function_definition: FunctionDefinitionNode,
    identifier: IdentifierNode,
    while_statement: WhileStatementNode,

    // keywords
    def: KeywordNode,
    if: KeywordNode,
    else: KeywordNode,
    elif: KeywordNode,
    for: KeywordNode,
    while: KeywordNode,
    return: KeywordNode,
    in: KeywordNode,
    class: KeywordNode,
    lambda: KeywordNode,
    try: KeywordNode,
    except: KeywordNode,
    as: KeywordNode,
    finally: KeywordNode,
    with: KeywordNode,
    and: KeywordNode,
    not: KeywordNode,

    comment: CommentNode,

    integer: NumericLiteralNode,
    float: NumericLiteralNode,

    true: BooleanLiteralNode,
    false: BooleanLiteralNode,
    none: BooleanLiteralNode,

    string_start: StringLiteralNode,
    string_end: StringLiteralNode,
    string: StringNode,
    string_content: StringLiteralNode,
    escape_sequence: EscapeSequenceNode,

    parameters: ParametersNode,

    type: TypeNode,

    // Syntax context providers
    block: BlockNode,
    call: CallNode,
    argument_list: ArgumentListNode,
    class_definition: ClassDefinitionNode,
    decorator: DecoratorNode,
};
