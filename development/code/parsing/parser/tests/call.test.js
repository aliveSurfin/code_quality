import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [`func()`, {
        "type": "Program",
        "body": [{
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": "func",
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
                "arguments": [],
                "loc": {
                    "start": {
                        "cursor": 0,
                        "column": 0,
                        "line": 0
                    },
                    "end": {
                        "cursor": 6,
                        "column": 6,
                        "line": 0
                    }
                }
            }
        }]
    }],
    [`func(arg,arg,arg)`, {
        "type": "Program",
        "body": [{
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": "func",
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
                "arguments": [{
                        "type": "Identifier",
                        "name": "arg",
                        "loc": {
                            "start": {
                                "cursor": 5,
                                "column": 5,
                                "line": 0
                            },
                            "end": {
                                "cursor": 8,
                                "column": 8,
                                "line": 0
                            }
                        }
                    },
                    {
                        "type": "Identifier",
                        "name": "arg",
                        "loc": {
                            "start": {
                                "cursor": 9,
                                "column": 9,
                                "line": 0
                            },
                            "end": {
                                "cursor": 12,
                                "column": 12,
                                "line": 0
                            }
                        }
                    },
                    {
                        "type": "Identifier",
                        "name": "arg",
                        "loc": {
                            "start": {
                                "cursor": 13,
                                "column": 13,
                                "line": 0
                            },
                            "end": {
                                "cursor": 16,
                                "column": 16,
                                "line": 0
                            }
                        }
                    }
                ],
                "loc": {
                    "start": {
                        "cursor": 0,
                        "column": 0,
                        "line": 0
                    },
                    "end": {
                        "cursor": 17,
                        "column": 17,
                        "line": 0
                    }
                }
            }
        }]
    }],
    [`func(arg,arg,arg)()`, {
        "type": "Program",
        "body": [{
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "CallExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": "func",
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
                    "arguments": [{
                            "type": "Identifier",
                            "name": "arg",
                            "loc": {
                                "start": {
                                    "cursor": 5,
                                    "column": 5,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 8,
                                    "column": 8,
                                    "line": 0
                                }
                            }
                        },
                        {
                            "type": "Identifier",
                            "name": "arg",
                            "loc": {
                                "start": {
                                    "cursor": 9,
                                    "column": 9,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 12,
                                    "column": 12,
                                    "line": 0
                                }
                            }
                        },
                        {
                            "type": "Identifier",
                            "name": "arg",
                            "loc": {
                                "start": {
                                    "cursor": 13,
                                    "column": 13,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 16,
                                    "column": 16,
                                    "line": 0
                                }
                            }
                        }
                    ],
                    "loc": {
                        "start": {
                            "cursor": 0,
                            "column": 0,
                            "line": 0
                        },
                        "end": {
                            "cursor": 17,
                            "column": 17,
                            "line": 0
                        }
                    }
                },
                "arguments": [],
                "loc": {
                    "start": {
                        "cursor": 0,
                        "column": 0,
                        "line": 0
                    },
                    "end": {
                        "cursor": 19,
                        "column": 19,
                        "line": 0
                    }
                }
            }
        }]
    }],

]



const parser = new Parser()
describe('Testing function calls', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})