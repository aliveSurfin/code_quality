import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [
        `[];`,
        {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrayExpression",
                    "elements": [],
                    "loc": {
                        "start": {
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
                        },
                        "end": {
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
                    }
                }
            }]
        }
    ],
    [
        `[69,69];`,
        {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrayExpression",
                    "elements": [{
                            "type": "NumericLiteral",
                            "value": 69,
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
                        {
                            "type": "NumericLiteral",
                            "value": 69,
                            "loc": {
                                "start": {
                                    "cursor": 4,
                                    "column": 4,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 6,
                                    "column": 6,
                                    "line": 0
                                }
                            }
                        }
                    ],
                    "loc": {
                        "start": {
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
                        },
                        "end": {
                            "start": {
                                "cursor": 6,
                                "column": 6,
                                "line": 0
                            },
                            "end": {
                                "cursor": 7,
                                "column": 7,
                                "line": 0
                            }
                        }
                    }
                }
            }]
        }
    ],
    [
        `[[],69];`,
        {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrayExpression",
                    "elements": [{
                            "type": "ArrayExpression",
                            "elements": [],
                            "loc": {
                                "start": {
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
                                },
                                "end": {
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
                            }
                        },
                        {
                            "type": "NumericLiteral",
                            "value": 69,
                            "loc": {
                                "start": {
                                    "cursor": 4,
                                    "column": 4,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 6,
                                    "column": 6,
                                    "line": 0
                                }
                            }
                        }
                    ],
                    "loc": {
                        "start": {
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
                        },
                        "end": {
                            "start": {
                                "cursor": 6,
                                "column": 6,
                                "line": 0
                            },
                            "end": {
                                "cursor": 7,
                                "column": 7,
                                "line": 0
                            }
                        }
                    }
                }
            }]
        }
    ],
]



const parser = new Parser()
describe('Testing arrays ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})