import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [`test == true;`, {
        "type": "Program",
        "body": [{
            "type": "ExpressionStatement",
            "expression": {
                "type": "EqualityExpression",
                "operator": {
                    "type": "EQUALITY_OPERATOR",
                    "value": "==",
                    "loc": {
                        "start": {
                            "cursor": 5,
                            "column": 5,
                            "line": 0
                        },
                        "end": {
                            "cursor": 7,
                            "column": 7,
                            "line": 0
                        }
                    }
                },
                "left": {
                    "type": "Identifier",
                    "name": "test",
                    "loc": {
                        "start": {
                            "cursor": 0,
                            "column": 0,
                            "line": 0
                        },
                        "end": {
                            "cursor": 4,
                            "column": 4,
                            "line": 0
                        }
                    }
                },
                "right": {
                    "type": "BooleanLiteral",
                    "value": true,
                    "loc": {
                        "start": {
                            "cursor": 8,
                            "column": 8,
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
                        "cursor": 0,
                        "column": 0,
                        "line": 0
                    },
                    "end": {
                        "cursor": 12,
                        "column": 12,
                        "line": 0
                    }
                }
            }
        }]
    }],
    [`test == false;`,
        {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "EqualityExpression",
                    "operator": {
                        "type": "EQUALITY_OPERATOR",
                        "value": "==",
                        "loc": {
                            "start": {
                                "cursor": 5,
                                "column": 5,
                                "line": 0
                            },
                            "end": {
                                "cursor": 7,
                                "column": 7,
                                "line": 0
                            }
                        }
                    },
                    "left": {
                        "type": "Identifier",
                        "name": "test",
                        "loc": {
                            "start": {
                                "cursor": 0,
                                "column": 0,
                                "line": 0
                            },
                            "end": {
                                "cursor": 4,
                                "column": 4,
                                "line": 0
                            }
                        }
                    },
                    "right": {
                        "type": "BooleanLiteral",
                        "value": false,
                        "loc": {
                            "start": {
                                "cursor": 8,
                                "column": 8,
                                "line": 0
                            },
                            "end": {
                                "cursor": 13,
                                "column": 13,
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
                            "cursor": 13,
                            "column": 13,
                            "line": 0
                        }
                    }
                }
            }]
        }
    ],
    [`test == null;`,
        {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "EqualityExpression",
                    "operator": {
                        "type": "EQUALITY_OPERATOR",
                        "value": "==",
                        "loc": {
                            "start": {
                                "cursor": 5,
                                "column": 5,
                                "line": 0
                            },
                            "end": {
                                "cursor": 7,
                                "column": 7,
                                "line": 0
                            }
                        }
                    },
                    "left": {
                        "type": "Identifier",
                        "name": "test",
                        "loc": {
                            "start": {
                                "cursor": 0,
                                "column": 0,
                                "line": 0
                            },
                            "end": {
                                "cursor": 4,
                                "column": 4,
                                "line": 0
                            }
                        }
                    },
                    "right": {
                        "type": "NullLiteral",
                        "value": null,
                        "loc": {
                            "start": {
                                "cursor": 8,
                                "column": 8,
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
                            "cursor": 0,
                            "column": 0,
                            "line": 0
                        },
                        "end": {
                            "cursor": 12,
                            "column": 12,
                            "line": 0
                        }
                    }
                }
            }]
        }
    ]
]


const parser = new Parser()
describe('Testing equality operator ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))
})