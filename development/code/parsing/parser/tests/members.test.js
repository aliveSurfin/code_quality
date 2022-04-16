import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [
        `ident.member`, {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "Identifier",
                        "name": "ident",
                        "loc": {
                            "start": {
                                "cursor": 0,
                                "column": 0,
                                "line": 0
                            },
                            "end": {
                                "cursor": 5,
                                "column": 5,
                                "line": 0
                            }
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "member",
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
    ],
    [
        `array["access"]`, {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "MemberExpression",
                    "computed": true,
                    "object": {
                        "type": "Identifier",
                        "name": "array",
                        "loc": {
                            "start": {
                                "cursor": 0,
                                "column": 0,
                                "line": 0
                            },
                            "end": {
                                "cursor": 5,
                                "column": 5,
                                "line": 0
                            }
                        }
                    },
                    "property": {
                        "type": "StringLiteral",
                        "value": "access",
                        "loc": {
                            "start": {
                                "cursor": 6,
                                "column": 6,
                                "line": 0
                            },
                            "end": {
                                "cursor": 14,
                                "column": 14,
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
                            "cursor": 15,
                            "column": 15,
                            "line": 0
                        }
                    }
                }
            }]
        }
    ],
    [
        `[1,2,3][0]`, {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "MemberExpression",
                    "computed": true,
                    "object": {
                        "type": "ArrayExpression",
                        "elements": [{
                                "type": "NumericLiteral",
                                "value": 1,
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
                            {
                                "type": "NumericLiteral",
                                "value": 2,
                                "loc": {
                                    "start": {
                                        "cursor": 3,
                                        "column": 3,
                                        "line": 0
                                    },
                                    "end": {
                                        "cursor": 4,
                                        "column": 4,
                                        "line": 0
                                    }
                                }
                            },
                            {
                                "type": "NumericLiteral",
                                "value": 3,
                                "loc": {
                                    "start": {
                                        "cursor": 5,
                                        "column": 5,
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
                    },
                    "property": {
                        "type": "NumericLiteral",
                        "value": 0,
                        "loc": {
                            "start": {
                                "cursor": 8,
                                "column": 8,
                                "line": 0
                            },
                            "end": {
                                "cursor": 9,
                                "column": 9,
                                "line": 0
                            }
                        }
                    },
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
                            "cursor": 10,
                            "column": 10,
                            "line": 0
                        }
                    }
                }
            }]
        }
    ],



]



const parser = new Parser()
describe('Testing member expression ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})