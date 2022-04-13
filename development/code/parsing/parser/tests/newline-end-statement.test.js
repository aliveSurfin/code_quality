import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [`69
70`, {
        "type": "Program",
        "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "NumericLiteral",
                    "value": 69,
                    "loc": {
                        "start": {
                            "cursor": 0,
                            "column": 0,
                            "line": 0
                        },
                        "end": {
                            "cursor": 2,
                            "column": 2,
                            "line": 0
                        }
                    }
                }
            },
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "NumericLiteral",
                    "value": 70,
                    "loc": {
                        "start": {
                            "cursor": 3,
                            "column": 0,
                            "line": 1
                        },
                        "end": {
                            "cursor": 5,
                            "column": 2,
                            "line": 1
                        }
                    }
                }
            }
        ]
    }]

]




const parser = new Parser()
describe('Testing newline as statement end ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})