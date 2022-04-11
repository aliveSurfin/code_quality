const TOKEN_TYPES = {
    WHITESPACE: "WHITESPACE",
    SINGLE_LINE_COMMENT: "SINGLE_LINE_COMMENT",
    MULTI_LINE_COMMENT: "MULTI_LINE_COMMENT",
    SEMI_COLON: ";",
    CURLY_OPEN: "{",
    CURLY_CLOSE: "}",
    PAREN_OPEN: "(",
    PAREN_CLOSE: ")",
    COMMA: ",",
    IF: "IF",
    ELSE: "ELSE",
    VARIABLE_DECLARATION: "VARIABLE_DECLARATION",
    NUMBER: "NUMBER",
    IDENTIFIER: "IDENTIFIER",
    ASSIGNMENT_OPERATOR: "ASSIGNMENT_OPERATOR",
    ASSIGNMENT_COMBO_OPERATOR: "ASSIGNMENT_COMBO_OPERATOR",
    ARITHMETIC_OPERATOR: "ARITHMETIC_OPERATOR",
    MULTIPLICATIVE_OPERATOR: "MULTIPLICATIVE_OPERATOR",
    STRING: "STRING",
    MULTI_LINE_STRING: "STRING",
    RELATIONAL_OPERATOR: "RELATIONAL_OPERATOR",
    EQUALITY_OPERATOR: "EQUALITY_OPERATOR",
    TRUE: "TRUE",
    FALSE: "FALSE",
    NULL: "NULL",
    LOGICAL_AND_OPERATOR: "LOGICAL_AND_OPERATOR",
    LOGICAL_OR_OPERATOR: "LOGICAL_OR_OPERATOR",
}

export default TOKEN_TYPES;