import TOKEN_TYPES from "./TOKEN_CONST_TYPES.js";
const TOKEN_SPEC = [
    [/^\s/, TOKEN_TYPES.WHITESPACE], // we are taking whitespace one at a time to track line/cols
    [/^\/\/.*/, TOKEN_TYPES.SINGLE_LINE_COMMENT],
    [/^\/\*[\s\S]*?\*\//, TOKEN_TYPES.MULTI_LINE_COMMENT],
    [/^;/, ';'],
    [/^\{/, '{'],
    [/^\}/, '}'],
    [/^\(/, '('],
    [/^\)/, ')'],
    [/^,/, ','],
    [/^\bif\b/, TOKEN_TYPES.IF],
    [/^\belse\b/, TOKEN_TYPES.ELSE],
    [/^\bvar\b/, TOKEN_TYPES.VARIABLE_DECLARATION],
    [/^\blet\b/, TOKEN_TYPES.VARIABLE_DECLARATION],
    [/^\bconst\b/, TOKEN_TYPES.VARIABLE_DECLARATION],
    [/^\btrue\b/, TOKEN_TYPES.TRUE],
    [/^\bfalse\b/, TOKEN_TYPES.FALSE],
    [/^\bnull\b/, TOKEN_TYPES.NULL],
    [/^\d+/, TOKEN_TYPES.NUMBER],
    [/^\w+/, TOKEN_TYPES.IDENTIFIER],
    [/^[=!]==/, TOKEN_TYPES.EQUALITY_OPERATOR],
    [/^[=!]=/, TOKEN_TYPES.EQUALITY_OPERATOR],
    [/^=/, TOKEN_TYPES.ASSIGNMENT_OPERATOR],
    [/^[\*\/\+\-]=/, TOKEN_TYPES.ASSIGNMENT_COMBO_OPERATOR], // *= /= += -=
    [/^[+\-]/, TOKEN_TYPES.ARITHMETIC_OPERATOR], // + -
    [/^[*\/]/, TOKEN_TYPES.MULTIPLICATIVE_OPERATOR], // * /
    [/^[><]=?/, TOKEN_TYPES.RELATIONAL_OPERATOR],
    [/^&&/, TOKEN_TYPES.LOGICAL_AND_OPERATOR],
    [/^\|\|/, TOKEN_TYPES.LOGICAL_OR_OPERATOR],

    // [/^\d+(\.\d+)?$/, TOKEN_TYPES."NUMBER"], // https://stackoverflow.com/a/10256077 // float and int
    [/'[^']*'/, TOKEN_TYPES.STRING],
    [/"[^"]*"/, TOKEN_TYPES.STRING],
    [/\`[^\`]*\`/, TOKEN_TYPES.MULTI_LINE_STRING],
    //TODO: multi line string
]

export default TOKEN_SPEC;