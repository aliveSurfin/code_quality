import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [
        `-x`, {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": {
                        "type": "ARITHMETIC_OPERATOR",
                        "value": "-",
                        "loc": {
                            "start": {
                                "cursor": 0,
                                "column": 0,
                                "line": 0
                            },
                            "end": {
                                "cursor": 1,
                                "column": 1,
                                "line": 0
                            }
                        }
                    },
                    "argument": {
                        "type": "Identifier",
                        "name": "x",
                        "loc": {
                            "start": {
                                "cursor": 1,
                                "column": 1,
                                "line": 0
                            },
                            "end": {
                                "cursor": 2,
                                "column": 2,
                                "line": 0
                            }
                        }
                    },
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
            }]
        }
    ],
    [
        `!-x`, {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": {
                        "type": "LOGICAL_NOT_OPERATOR",
                        "value": "!",
                        "loc": {
                            "start": {
                                "cursor": 0,
                                "column": 0,
                                "line": 0
                            },
                            "end": {
                                "cursor": 1,
                                "column": 1,
                                "line": 0
                            }
                        }
                    },
                    "argument": {
                        "type": "UnaryExpression",
                        "operator": {
                            "type": "ARITHMETIC_OPERATOR",
                            "value": "-",
                            "loc": {
                                "start": {
                                    "cursor": 1,
                                    "column": 1,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 2,
                                    "column": 2,
                                    "line": 0
                                }
                            }
                        },
                        "argument": {
                            "type": "Identifier",
                            "name": "x",
                            "loc": {
                                "start": {
                                    "cursor": 2,
                                    "column": 2,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 3,
                                    "column": 3,
                                    "line": 0
                                }
                            }
                        },
                        "loc": {
                            "start": {
                                "cursor": 1,
                                "column": 1,
                                "line": 0
                            },
                            "end": {
                                "cursor": 3,
                                "column": 3,
                                "line": 0
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "cursor": 0,
                            "column": 0,
                            "line": 0
                        },
                        "end": {
                            "cursor": 3,
                            "column": 3,
                            "line": 0
                        }
                    }
                }
            }]
        }
    ],

]



const parser = new Parser()
describe('Testing unary expressions', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})