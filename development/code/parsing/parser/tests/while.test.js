import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [
        `while(x <=10){
    x+=1;
}`, {
            "type": "Program",
            "body": [{
                "type": "WhileStatement",
                "test": {
                    "type": "BinaryExpression",
                    "operator": {
                        "type": "RELATIONAL_OPERATOR",
                        "value": "<=",
                        "loc": {
                            "start": {
                                "cursor": 8,
                                "column": 8,
                                "line": 0
                            },
                            "end": {
                                "cursor": 10,
                                "column": 10,
                                "line": 0
                            }
                        }
                    },
                    "left": {
                        "type": "Identifier",
                        "name": "x",
                        "loc": {
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
                    },
                    "right": {
                        "type": "NumericLiteral",
                        "value": 10,
                        "loc": {
                            "start": {
                                "cursor": 10,
                                "column": 10,
                                "line": 0
                            },
                            "end": {
                                "cursor": 12,
                                "column": 12,
                                "line": 0
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "cursor": 6,
                            "column": 6,
                            "line": 0
                        },
                        "end": {
                            "cursor": 12,
                            "column": 12,
                            "line": 0
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
                                        "cursor": 20,
                                        "column": 5,
                                        "line": 1
                                    },
                                    "end": {
                                        "cursor": 22,
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
                                        "cursor": 19,
                                        "column": 4,
                                        "line": 1
                                    },
                                    "end": {
                                        "cursor": 20,
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
                                        "cursor": 22,
                                        "column": 7,
                                        "line": 1
                                    },
                                    "end": {
                                        "cursor": 23,
                                        "column": 8,
                                        "line": 1
                                    }
                                }
                            },
                            "loc": {
                                "start": {
                                    "cursor": 19,
                                    "column": 4,
                                    "line": 1
                                },
                                "end": {
                                    "cursor": 23,
                                    "column": 8,
                                    "line": 1
                                }
                            }
                        }
                    }],
                    "loc": {
                        "start": {
                            "cursor": 13,
                            "column": 13,
                            "line": 0
                        },
                        "end": {
                            "cursor": 26,
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
                        "cursor": 26,
                        "column": 1,
                        "line": 2
                    }
                }
            }]
        }
    ],

]



const parser = new Parser()
describe('Testing while statement ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})