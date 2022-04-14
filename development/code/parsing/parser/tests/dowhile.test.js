import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [
        `do {
    x+=1;
} while(x <=10)`, {
            "type": "Program",
            "body": [{
                "type": "DoWhileStatement",
                "test": {
                    "type": "BinaryExpression",
                    "operator": {
                        "type": "RELATIONAL_OPERATOR",
                        "value": "<=",
                        "loc": {
                            "start": {
                                "cursor": 25,
                                "column": 10,
                                "line": 2
                            },
                            "end": {
                                "cursor": 27,
                                "column": 12,
                                "line": 2
                            }
                        }
                    },
                    "left": {
                        "type": "Identifier",
                        "name": "x",
                        "loc": {
                            "start": {
                                "cursor": 23,
                                "column": 8,
                                "line": 2
                            },
                            "end": {
                                "cursor": 24,
                                "column": 9,
                                "line": 2
                            }
                        }
                    },
                    "right": {
                        "type": "NumericLiteral",
                        "value": 10,
                        "loc": {
                            "start": {
                                "cursor": 27,
                                "column": 12,
                                "line": 2
                            },
                            "end": {
                                "cursor": 29,
                                "column": 14,
                                "line": 2
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "cursor": 23,
                            "column": 8,
                            "line": 2
                        },
                        "end": {
                            "cursor": 29,
                            "column": 14,
                            "line": 2
                        }
                    }
                },
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": {
                                "type": "ASSIGNMENT_COMBO_OPERATOR",
                                "value": "+=",
                                "loc": {
                                    "start": {
                                        "cursor": 10,
                                        "column": 5,
                                        "line": 1
                                    },
                                    "end": {
                                        "cursor": 12,
                                        "column": 7,
                                        "line": 1
                                    }
                                }
                            },
                            "left": {
                                "type": "Identifier",
                                "name": "x",
                                "loc": {
                                    "start": {
                                        "cursor": 9,
                                        "column": 4,
                                        "line": 1
                                    },
                                    "end": {
                                        "cursor": 10,
                                        "column": 5,
                                        "line": 1
                                    }
                                }
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 1,
                                "loc": {
                                    "start": {
                                        "cursor": 12,
                                        "column": 7,
                                        "line": 1
                                    },
                                    "end": {
                                        "cursor": 13,
                                        "column": 8,
                                        "line": 1
                                    }
                                }
                            },
                            "loc": {
                                "start": {
                                    "cursor": 9,
                                    "column": 4,
                                    "line": 1
                                },
                                "end": {
                                    "cursor": 13,
                                    "column": 8,
                                    "line": 1
                                }
                            }
                        }
                    }],
                    "loc": {
                        "start": {
                            "cursor": 3,
                            "column": 3,
                            "line": 0
                        },
                        "end": {
                            "cursor": 16,
                            "column": 1,
                            "line": 2
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
                        "cursor": 30,
                        "column": 15,
                        "line": 2
                    }
                }
            }]
        }
    ],

]



const parser = new Parser()
describe('Testing do while statement ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})