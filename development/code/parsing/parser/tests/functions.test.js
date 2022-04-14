import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [
        `function test(a,b){return a>b}`, {
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "name": {
                    "type": "Identifier",
                    "name": "test",
                    "loc": {
                        "start": {
                            "cursor": 9,
                            "column": 9,
                            "line": 0
                        },
                        "end": {
                            "cursor": 13,
                            "column": 13,
                            "line": 0
                        }
                    }
                },
                "params": [{
                        "type": "Identifier",
                        "name": "a",
                        "loc": {
                            "start": {
                                "cursor": 14,
                                "column": 14,
                                "line": 0
                            },
                            "end": {
                                "cursor": 15,
                                "column": 15,
                                "line": 0
                            }
                        }
                    },
                    {
                        "type": "Identifier",
                        "name": "b",
                        "loc": {
                            "start": {
                                "cursor": 16,
                                "column": 16,
                                "line": 0
                            },
                            "end": {
                                "cursor": 17,
                                "column": 17,
                                "line": 0
                            }
                        }
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ReturnStatement",
                        "argument": {
                            "type": "BinaryExpression",
                            "operator": {
                                "type": "RELATIONAL_OPERATOR",
                                "value": ">",
                                "loc": {
                                    "start": {
                                        "cursor": 27,
                                        "column": 27,
                                        "line": 0
                                    },
                                    "end": {
                                        "cursor": 28,
                                        "column": 28,
                                        "line": 0
                                    }
                                }
                            },
                            "left": {
                                "type": "Identifier",
                                "name": "a",
                                "loc": {
                                    "start": {
                                        "cursor": 26,
                                        "column": 26,
                                        "line": 0
                                    },
                                    "end": {
                                        "cursor": 27,
                                        "column": 27,
                                        "line": 0
                                    }
                                }
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "b",
                                "loc": {
                                    "start": {
                                        "cursor": 28,
                                        "column": 28,
                                        "line": 0
                                    },
                                    "end": {
                                        "cursor": 29,
                                        "column": 29,
                                        "line": 0
                                    }
                                }
                            },
                            "loc": {
                                "start": {
                                    "cursor": 26,
                                    "column": 26,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 29,
                                    "column": 29,
                                    "line": 0
                                }
                            }
                        },
                        "loc": {
                            "start": {
                                "cursor": 19,
                                "column": 19,
                                "line": 0
                            },
                            "end": {
                                "cursor": 29,
                                "column": 29,
                                "line": 0
                            }
                        }
                    }],
                    "loc": {
                        "start": {
                            "cursor": 18,
                            "column": 18,
                            "line": 0
                        },
                        "end": {
                            "cursor": 30,
                            "column": 30,
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
                        "cursor": 30,
                        "column": 30,
                        "line": 0
                    }
                }
            }]
        }
    ],
    [
        `function test(){return true;}`, {
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "name": {
                    "type": "Identifier",
                    "name": "test",
                    "loc": {
                        "start": {
                            "cursor": 9,
                            "column": 9,
                            "line": 0
                        },
                        "end": {
                            "cursor": 13,
                            "column": 13,
                            "line": 0
                        }
                    }
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ReturnStatement",
                        "argument": {
                            "type": "BooleanLiteral",
                            "value": true,
                            "loc": {
                                "start": {
                                    "cursor": 23,
                                    "column": 23,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 27,
                                    "column": 27,
                                    "line": 0
                                }
                            }
                        },
                        "loc": {
                            "start": {
                                "cursor": 16,
                                "column": 16,
                                "line": 0
                            },
                            "end": {
                                "cursor": 28,
                                "column": 28,
                                "line": 0
                            }
                        }
                    }],
                    "loc": {
                        "start": {
                            "cursor": 15,
                            "column": 15,
                            "line": 0
                        },
                        "end": {
                            "cursor": 29,
                            "column": 29,
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
                        "cursor": 29,
                        "column": 29,
                        "line": 0
                    }
                }
            }]
        }
    ],
    [
        `function test(){return}`, {
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "name": {
                    "type": "Identifier",
                    "name": "test",
                    "loc": {
                        "start": {
                            "cursor": 9,
                            "column": 9,
                            "line": 0
                        },
                        "end": {
                            "cursor": 13,
                            "column": 13,
                            "line": 0
                        }
                    }
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ReturnStatement",
                        "argument": null,
                        "loc": {
                            "start": {
                                "cursor": 16,
                                "column": 16,
                                "line": 0
                            },
                            "end": {
                                "cursor": 22,
                                "column": 22,
                                "line": 0
                            }
                        }
                    }],
                    "loc": {
                        "start": {
                            "cursor": 15,
                            "column": 15,
                            "line": 0
                        },
                        "end": {
                            "cursor": 23,
                            "column": 23,
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
                        "cursor": 23,
                        "column": 23,
                        "line": 0
                    }
                }
            }]
        }
    ],

]



const parser = new Parser()
describe('Testing function declaration ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})