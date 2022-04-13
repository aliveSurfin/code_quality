import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [`test == true && test == false;`,
        {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "LogicalExpression",
                    "operator": {
                        "type": "LOGICAL_AND_OPERATOR",
                        "value": "&&",
                        "loc": {
                            "start": {
                                "cursor": 13,
                                "column": 13,
                                "line": 0
                            },
                            "end": {
                                "cursor": 15,
                                "column": 15,
                                "line": 0
                            }
                        }
                    },
                    "left": {
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
                    },
                    "right": {
                        "type": "EqualityExpression",
                        "operator": {
                            "type": "EQUALITY_OPERATOR",
                            "value": "==",
                            "loc": {
                                "start": {
                                    "cursor": 21,
                                    "column": 21,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 23,
                                    "column": 23,
                                    "line": 0
                                }
                            }
                        },
                        "left": {
                            "type": "Identifier",
                            "name": "test",
                            "loc": {
                                "start": {
                                    "cursor": 16,
                                    "column": 16,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 20,
                                    "column": 20,
                                    "line": 0
                                }
                            }
                        },
                        "right": {
                            "type": "BooleanLiteral",
                            "value": false,
                            "loc": {
                                "start": {
                                    "cursor": 24,
                                    "column": 24,
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
                                "cursor": 16,
                                "column": 16,
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
                }
            }]
        }
    ],
    [`test == true && test == false || test=="hello";`,
        {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "LogicalExpression",
                    "operator": {
                        "type": "LOGICAL_OR_OPERATOR",
                        "value": "||",
                        "loc": {
                            "start": {
                                "cursor": 30,
                                "column": 30,
                                "line": 0
                            },
                            "end": {
                                "cursor": 32,
                                "column": 32,
                                "line": 0
                            }
                        }
                    },
                    "left": {
                        "type": "LogicalExpression",
                        "operator": {
                            "type": "LOGICAL_AND_OPERATOR",
                            "value": "&&",
                            "loc": {
                                "start": {
                                    "cursor": 13,
                                    "column": 13,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 15,
                                    "column": 15,
                                    "line": 0
                                }
                            }
                        },
                        "left": {
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
                        },
                        "right": {
                            "type": "EqualityExpression",
                            "operator": {
                                "type": "EQUALITY_OPERATOR",
                                "value": "==",
                                "loc": {
                                    "start": {
                                        "cursor": 21,
                                        "column": 21,
                                        "line": 0
                                    },
                                    "end": {
                                        "cursor": 23,
                                        "column": 23,
                                        "line": 0
                                    }
                                }
                            },
                            "left": {
                                "type": "Identifier",
                                "name": "test",
                                "loc": {
                                    "start": {
                                        "cursor": 16,
                                        "column": 16,
                                        "line": 0
                                    },
                                    "end": {
                                        "cursor": 20,
                                        "column": 20,
                                        "line": 0
                                    }
                                }
                            },
                            "right": {
                                "type": "BooleanLiteral",
                                "value": false,
                                "loc": {
                                    "start": {
                                        "cursor": 24,
                                        "column": 24,
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
                                    "cursor": 16,
                                    "column": 16,
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
                    },
                    "right": {
                        "type": "EqualityExpression",
                        "operator": {
                            "type": "EQUALITY_OPERATOR",
                            "value": "==",
                            "loc": {
                                "start": {
                                    "cursor": 37,
                                    "column": 37,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 39,
                                    "column": 39,
                                    "line": 0
                                }
                            }
                        },
                        "left": {
                            "type": "Identifier",
                            "name": "test",
                            "loc": {
                                "start": {
                                    "cursor": 33,
                                    "column": 33,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 37,
                                    "column": 37,
                                    "line": 0
                                }
                            }
                        },
                        "right": {
                            "type": "StringLiteral",
                            "value": "hello",
                            "loc": {
                                "start": {
                                    "cursor": 39,
                                    "column": 39,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 46,
                                    "column": 46,
                                    "line": 0
                                }
                            }
                        },
                        "loc": {
                            "start": {
                                "cursor": 33,
                                "column": 33,
                                "line": 0
                            },
                            "end": {
                                "cursor": 46,
                                "column": 46,
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
                            "cursor": 46,
                            "column": 46,
                            "line": 0
                        }
                    }
                }
            }]
        }
    ]
]


const parser = new Parser()
describe('Testing logical operators ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))
})