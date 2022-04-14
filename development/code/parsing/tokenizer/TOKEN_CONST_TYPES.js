const TOKEN_TYPES = {
    EOF: "EOF", // END OF FILE
    WHITESPACE: "WHITESPACE",
    NEWLINE: "NEWLINE",
    SINGLE_LINE_COMMENT: "SINGLE_LINE_COMMENT",
    MULTI_LINE_COMMENT: "MULTI_LINE_COMMENT",
    SEMI_COLON: "SEMI_COLON",
    CURLY_OPEN: "CURLY_OPEN",
    CURLY_CLOSE: "CURLY_CLOSE",
    PAREN_OPEN: "PAREN_OPEN",
    PAREN_CLOSE: "PAREN_CLOSE",
    SQUARE_OPEN: "SQUARE_OPEN",
    SQUARE_CLOSE: "SQUARE_CLOSE",
    COMMA: "COMMA",
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
    WHILE: "WHILE",
    DO: "DO",
    FOR: "FOR",
    LOGICAL_AND_OPERATOR: "LOGICAL_AND_OPERATOR",
    LOGICAL_OR_OPERATOR: "LOGICAL_OR_OPERATOR",
    LOGICAL_NOT_OPERATOR: "LOGICAL_NOT_OPERATOR",
}

export default TOKEN_TYPES;