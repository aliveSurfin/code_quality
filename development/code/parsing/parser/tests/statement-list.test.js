import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [
        `"a normal string";
69;
`, {
            type: "Program",
            body: [{
                    type: "ExpressionStatement",
                    expression: {
                        type: "StringLiteral",
                        value: "a normal string",
                        loc: {
                            start: {
                                column: 0,
                                cursor: 0,
                                line: 0,
                            },
                            end: {
                                column: 17,
                                cursor: 17,
                                line: 0,
                            }
                        }
                    }
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NumericLiteral",
                        value: 69,
                        loc: {
                            start: {
                                column: 0,
                                cursor: 19,
                                line: 1,
                            },
                            end: {
                                column: 2,
                                cursor: 21,
                                line: 1,
                            }
                        }
                    }
                }
            ]
        }
    ],

]



const parser = new Parser()
describe('Testing multiple statements', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})