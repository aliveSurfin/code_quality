/**
 * @module Parser
 */
import TOKEN_TYPES from "../tokenizer/TOKEN_CONST_TYPES.js";
import AST_TYPES from "./AST_CONST_TYPES.js";
import ParseSyntaxError from "./parser-error.js";

/**
 * isLiteral
 * 
 * function to check if a type is a literal
 * @param {String} type - Token Type
 * @returns {Boolean} true/false is it a literal
 */
export function isLiteral(type) {
    return type !== TOKEN_TYPES.EOF && (
        type === TOKEN_TYPES.NUMBER ||
        type === TOKEN_TYPES.STRING ||
        type === TOKEN_TYPES.TRUE ||
        type === TOKEN_TYPES.FALSE ||
        type === TOKEN_TYPES.NULL);
}

/**
 * function to check if a node is a valid assignment type.
 * @param {Object} node - AST NODE
 * @throws {ParseSyntaxError} - throws error when passed an invalid assignment type
 * @returns {Node} - Returns Node if valid assignment
 */
export function isValidAssignmentTarget(node) {
    if (node.type === AST_TYPES.Identifier || node.type === AST_TYPES.MemberExpression) {
        return node
    }
    throw new ParseSyntaxError(`Incorrect assignment to type: ${node.type} : ${node.value} | ${node.loc.start.line}:${node.loc.start.column}`, node)
}

/**
 * Function to check if token type is assignment operator
 * @param {String} type - Token Type
 * @returns {Boolean} true/false is assignment operator
 */
export function isAssignmentOperator(type) {
    return type === TOKEN_TYPES.ASSIGNMENT_OPERATOR || type === TOKEN_TYPES.ASSIGNMENT_COMBO_OPERATOR;
}

/**
 * Function to convert BooleanLiteral token type to value
 * @param {String} type Token Type
 * @returns {Boolean} true/false
 */
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

/**
 * function to check if token type is end of statement 
 * 
 * in javascript a statement can be ended by a newline or a semi colon
 * @param {String} type 
 * @returns {Boolean} yes/no is end of statement 
 */
export function isEndOfStatementType(type) {
    return type === TOKEN_TYPES.SEMI_COLON || type === TOKEN_TYPES.NEWLINE;
}