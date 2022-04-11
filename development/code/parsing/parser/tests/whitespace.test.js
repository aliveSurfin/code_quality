import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [` 69;`, {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NumericLiteral",
                value: 69,
                loc: {
                    start: {
                        column: 1,
                        cursor: 1,
                        line: 0,
                    },
                    end: {
                        column: 3,
                        cursor: 3,
                        line: 0,
                    }
                }
            }
        }]
    }],
    [`\t69;`, {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NumericLiteral",
                value: 69,
                loc: {
                    start: {
                        column: 4,
                        cursor: 1,
                        line: 0,
                    },
                    end: {
                        column: 6,
                        cursor: 3,
                        line: 0,
                    }
                }
            }
        }]
    }],
]



const parser = new Parser()
describe('Testing parsing with whitespace', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})