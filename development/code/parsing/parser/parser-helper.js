import TOKEN_TYPES from "../tokenizer/TOKEN_CONST_TYPES.js";
import AST_TYPES from "./AST_CONST_TYPES.js";
import ParseSyntaxError from "./parser-error.js";
export function isLiteral(type) {
    return type !== TOKEN_TYPES.EOF && (
        type === TOKEN_TYPES.NUMBER ||
        type === TOKEN_TYPES.STRING ||
        type === TOKEN_TYPES.TRUE ||
        type === TOKEN_TYPES.FALSE ||
        type === TOKEN_TYPES.NULL);
}

export function isValidAssignmentTarget(node) {
    if (node.type === AST_TYPES.Identifier || node.type == AST_TYPES.MemberExpression) {
        return node
    }
    throw new ParseSyntaxError(`Incorrect assignment to type: ${node.type} : ${node.value} | ${node.loc.start.line}:${node.loc.start.column}`, node)
}
export function isAssignmentOperator(type) {
    return type === TOKEN_TYPES.ASSIGNMENT_OPERATOR || type === TOKEN_TYPES.ASSIGNMENT_COMBO_OPERATOR;
}

export function BooleanTypeToValue(type) {
    switch (type) {
        case TOKEN_TYPES.TRUE:
            return true;
        case TOKEN_TYPES.FALSE:
            return false;
            /* istanbul ignore next */
        default:
            /* istanbul ignore next */
            throw new SyntaxError(`Unexpected token in boolean production "${type}"`)
    }
}