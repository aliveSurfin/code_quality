/**
 * @module Parser
 */
/**
 * Abstract Syntax Tree Types
 */
const AST_TYPES = {
    Program: 'Program',
    VariableStatement: "VariableStatement",
    VariableDeclaration: "VariableDeclaration",
    EmptyStatement: "EmptyStatement",
    BlockStatement: "BlockStatement",
    ExpressionStatement: "ExpressionStatement",
    AssignmentExpression: "AssignmentExpression",
    Identifier: "Identifier",
    BinaryExpression: "BinaryExpression",
    NumericLiteral: "NumericLiteral",
    StringLiteral: "StringLiteral",
    IfStatement: "IfStatement",
    MultiplicativeExpression: "MultiplicativeExpression",
    EqualityExpression: "EqualityExpression",
    BooleanLiteral: "BooleanLiteral",
    NullLiteral: "NullLiteral",
    ArrayExpression: "ArrayExpression",
    UnaryExpression: "UnaryExpression",
    WhileStatement: "WhileStatement",
    DoWhileStatement: "DoWhileStatement",
    ForStatement: "ForStatement",
    FunctionDeclaration: "FunctionDeclaration",
    ReturnStatement: "ReturnStatement",
    MemberExpression: "MemberExpression",
    CallExpression: "CallExpression",
    ClassDeclaration: "ClassDeclaration",
    ThisExpression: "ThisExpression",
    Super: "Super",
    NewExpression: "NewExpression",
    LogicalExpression: "LogicalExpression",

};

export default AST_TYPES;