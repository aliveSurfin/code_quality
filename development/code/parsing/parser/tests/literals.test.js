import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [`69;`, {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NumericLiteral",
                value: 69,
                loc: {
                    start: {
                        column: 0,
                        cursor: 0,
                        line: 0,
                    },
                    end: {
                        column: 2,
                        cursor: 2,
                        line: 0,
                    }
                }
            }
        }]


    }],
    [`6;`, {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NumericLiteral",
                value: 6,
                loc: {
                    start: {
                        column: 0,
                        cursor: 0,
                        line: 0,
                    },
                    end: {
                        column: 1,
                        cursor: 1,
                        line: 0,
                    }
                }
            }
        }]


    }],
    [`"hello";`, {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "StringLiteral",
                value: "hello",
                loc: {
                    start: {
                        column: 0,
                        cursor: 0,
                        line: 0,
                    },
                    end: {
                        column: 7,
                        cursor: 7,
                        line: 0,
                    }
                }
            }
        }]


    }],
    [`"hello with spaces";`, {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "StringLiteral",
                value: "hello with spaces",
                loc: {
                    start: {
                        column: 0,
                        cursor: 0,
                        line: 0,
                    },
                    end: {
                        column: 19,
                        cursor: 19,
                        line: 0,
                    }
                }
            }
        }]


    }],
    [`'hello with single quotes';`, {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "StringLiteral",
                value: "hello with single quotes",
                loc: {
                    start: {
                        column: 0,
                        cursor: 0,
                        line: 0,
                    },
                    end: {
                        column: 26,
                        cursor: 26,
                        line: 0,
                    }
                }
            }
        }]


    }],
]


const parser = new Parser()
describe('Testing Literal Parsing', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

    describe(`testing unclosed string |'unclosed string `, () => {

        test(`should throw syntax error`, () => {
            try {
                expect(parser.parse(`'unclosed string`)).toThrow(SyntaxError)
            } catch (e) {
                expect(e.message).toEqual(`Unexpected token: "'" at position: {"cursor":0,"column":0,"line":0}`)
            }
        })




    })

})