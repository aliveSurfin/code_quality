import TOKEN_TYPES from "./TOKEN_CONST_TYPES.js";
const TOKEN_SPEC = [
    [/^\n/, TOKEN_TYPES.NEWLINE], // caught by below, must come before
    [/^\s/, TOKEN_TYPES.WHITESPACE],
    [/^\/\/.*/, TOKEN_TYPES.SINGLE_LINE_COMMENT],
    [/^\/\*[\s\S]*?\*\//, TOKEN_TYPES.MULTI_LINE_COMMENT],
    [/^;/, TOKEN_TYPES.SEMI_COLON],
    [/^\{/, TOKEN_TYPES.CURLY_OPEN],
    [/^\}/, TOKEN_TYPES.CURLY_CLOSE],
    [/^\(/, TOKEN_TYPES.PAREN_OPEN],
    [/^\)/, TOKEN_TYPES.PAREN_CLOSE],
    [/^,/, TOKEN_TYPES.COMMA],
    [/^\./, TOKEN_TYPES.DOT],

    [/^\bif\b/, TOKEN_TYPES.IF],
    [/^\belse\b/, TOKEN_TYPES.ELSE],
    [/^\bvar\b/, TOKEN_TYPES.VARIABLE_DECLARATION],
    [/^\blet\b/, TOKEN_TYPES.VARIABLE_DECLARATION],
    [/^\bconst\b/, TOKEN_TYPES.VARIABLE_DECLARATION],
    [/^\btrue\b/, TOKEN_TYPES.TRUE],
    [/^\bfalse\b/, TOKEN_TYPES.FALSE],
    [/^\bnull\b/, TOKEN_TYPES.NULL],
    [/^\bwhile\b/, TOKEN_TYPES.WHILE],
    [/^\bdo\b/, TOKEN_TYPES.DO],
    [/^\bfor\b/, TOKEN_TYPES.FOR],
    [/^\bfunction\b/, TOKEN_TYPES.FUNCTION_DECLARATION],
    [/^\breturn\b/, TOKEN_TYPES.RETURN],

    [/^\[/, TOKEN_TYPES.SQUARE_OPEN],
    [/^\]/, TOKEN_TYPES.SQUARE_CLOSE],
    [/^\d+/, TOKEN_TYPES.NUMBER],
    [/^\w+/, TOKEN_TYPES.IDENTIFIER], // https://stackoverflow.com/questions/2008279/validate-a-javascript-function-name#:~:text=An%20identifier%20must%20start%20with,Letter%20number%20(Nl)%E2%80%9D.
    [/^[=!]==/, TOKEN_TYPES.EQUALITY_OPERATOR],
    [/^[=!]=/, TOKEN_TYPES.EQUALITY_OPERATOR],
    [/^=/, TOKEN_TYPES.ASSIGNMENT_OPERATOR],
    [/^[\*\/\+\-]=/, TOKEN_TYPES.ASSIGNMENT_COMBO_OPERATOR], // *= /= += -=
    [/^[+\-]/, TOKEN_TYPES.ARITHMETIC_OPERATOR], // + -
    [/^[*\/]/, TOKEN_TYPES.MULTIPLICATIVE_OPERATOR], // * /
    [/^[><]=?/, TOKEN_TYPES.RELATIONAL_OPERATOR],
    [/^&&/, TOKEN_TYPES.LOGICAL_AND_OPERATOR],
    [/^\|\|/, TOKEN_TYPES.LOGICAL_OR_OPERATOR],
    [/^!/, TOKEN_TYPES.LOGICAL_NOT_OPERATOR],

    // [/^\d+(\.\d+)?$/, TOKEN_TYPES."NUMBER"], // https://stackoverflow.com/a/10256077 // float and int
    [/'[^']*'/, TOKEN_TYPES.STRING],
    [/"[^"]*"/, TOKEN_TYPES.STRING],
    [/\`[^\`]*\`/, TOKEN_TYPES.MULTI_LINE_STRING],
    //TODO: multi line string
]

export default TOKEN_SPEC;