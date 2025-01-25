/* // Base types for location and range
interface Position {
    line: number;
    column: number;
}

interface SourceLocation {
    start: Position;
    end: Position;
}

type AstRange = [number, number];

// Base AST Node
interface BaseNode {
    type: string;
    loc: SourceLocation;
    range: AstRange;
}

// Program node (root)
interface Program extends BaseNode {
    type: "Program";
    body: Statement[];
}

// Statements
interface FunctionDeclaration extends BaseNode {
    type: "FunctionDeclaration";
    id: Identifier;
    params: Identifier[];
    body: BlockStatement;
}

interface VariableDeclaration extends BaseNode {
    type: "VariableDeclaration";
    kind: "var" | "let" | "const";
    declarations: VariableDeclarator[];
}

interface BlockStatement extends BaseNode {
    type: "BlockStatement";
    body: Statement[];
}

interface ExpressionStatement extends BaseNode {
    type: "ExpressionStatement";
    expression: Expression;
}

interface ReturnStatement extends BaseNode {
    type: "ReturnStatement";
    argument: Expression;
}

interface IfStatement extends BaseNode {
    type: "IfStatement";
    test: Expression;
    consequent: Statement;
    alternate?: Statement;
}

interface WhileStatement extends BaseNode {
    type: "WhileStatement";
    test: Expression;
    body: BlockStatement;
}

// Declarations and Expressions
interface VariableDeclarator extends BaseNode {
    type: "VariableDeclarator";
    id: Identifier;
    init: Expression | null;
}

interface Identifier extends BaseNode {
    type: "Identifier";
    name: string;
}

interface Literal extends BaseNode {
    type: "Literal";
    value: string | number | boolean | null;
}

interface BinaryExpression extends BaseNode {
    type: "BinaryExpression";
    operator: string;
    left: Expression;
    right: Expression;
}

interface LogicalExpression extends BaseNode {
    type: "LogicalExpression";
    operator: string;
    left: Expression;
    right: Expression;
}

interface MemberExpression extends BaseNode {
    type: "MemberExpression";
    object: Expression;
    property: Expression;
    computed: boolean;
}

interface CallExpression extends BaseNode {
    type: "CallExpression";
    callee: Expression;
    arguments: Expression[];
}

interface AssignmentExpression extends BaseNode {
    type: "AssignmentExpression";
    operator: string;
    left: Expression;
    right: Expression;
}

interface ConditionalExpression extends BaseNode {
    type: "ConditionalExpression";
    test: Expression;
    consequent: Expression;
    alternate: Expression;
}

interface UnaryExpression extends BaseNode {
    type: "UnaryExpression";
    operator: string;
    prefix: boolean;
    argument: Expression;
}

// Type Unions for Statements and Expressions
type Statement =
    | FunctionDeclaration
    | VariableDeclaration
    | BlockStatement
    | ExpressionStatement
    | ReturnStatement
    | IfStatement
    | WhileStatement;

type Expression =
    | Identifier
    | Literal
    | BinaryExpression
    | LogicalExpression
    | MemberExpression
    | CallExpression
    | AssignmentExpression
    | ConditionalExpression
    | UnaryExpression;

// Root type for AST
type ASTNode = Program | Statement | Expression;
 */