import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [
        `{
69;
"string";
}`, {
            type: "Program",
            body: [{
                type: "BlockStatement",
                loc: {
                    start: {
                        column: 0,
                        cursor: 0,
                        line: 0,
                    },
                    end: {
                        column: 1,
                        cursor: 17,
                        line: 3,
                    }
                },
                body: [{
                        type: "ExpressionStatement",
                        expression: {
                            type: "NumericLiteral",
                            value: 69,
                            loc: {
                                start: {
                                    column: 0,
                                    cursor: 2,
                                    line: 1,
                                },
                                end: {
                                    column: 2,
                                    cursor: 4,
                                    line: 1,
                                }
                            }
                        }
                    },
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "StringLiteral",
                            value: "string",
                            loc: {
                                start: {
                                    column: 0,
                                    cursor: 6,
                                    line: 2,
                                },
                                end: {
                                    column: 8,
                                    cursor: 14,
                                    line: 2,
                                }
                            }
                        }
                    },
                ]
            }]
        }
    ],
    [
        `{
}`, {
            type: "Program",
            body: [{
                type: "BlockStatement",
                loc: {
                    start: {
                        column: 0,
                        cursor: 0,
                        line: 0,
                    },
                    end: {
                        column: 1,
                        cursor: 3,
                        line: 1,
                    }
                },
                body: []
            }]
        }
    ],
    [
        `
{
69;
{
    420;
}
}`, {
            type: "Program",
            body: [{
                type: "BlockStatement",
                loc: {
                    start: {
                        column: 0,
                        cursor: 1,
                        line: 1,
                    },
                    end: {
                        column: 1,
                        cursor: 21,
                        line: 6,
                    }
                },
                body: [{
                    type: "ExpressionStatement",
                    expression: {
                        type: "NumericLiteral",
                        value: 69,
                        loc: {
                            start: {
                                column: 0,
                                cursor: 3,
                                line: 2,
                            },
                            end: {
                                column: 2,
                                cursor: 5,
                                line: 2,
                            }
                        }
                    }
                }, {
                    type: "BlockStatement",
                    loc: {
                        start: {
                            column: 0,
                            cursor: 7,
                            line: 3,
                        },
                        end: {
                            column: 1,
                            cursor: 19,
                            line: 5,
                        }
                    },
                    body: [{
                        type: "ExpressionStatement",
                        expression: {
                            type: "NumericLiteral",
                            value: 420,
                            loc: {
                                start: {
                                    column: 4,
                                    cursor: 13,
                                    line: 4,
                                },
                                end: {
                                    column: 7,
                                    cursor: 16,
                                    line: 4,
                                }
                            }
                        }
                    }]
                }]
            }]
        }
    ],

    [`{}`,
        {
            "type": "Program",
            "body": [{
                "type": "BlockStatement",
                "body": [],
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
            }]
        }
    ]
]




const parser = new Parser()
describe('Testing block statements', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})