import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [
        `for (let i = 0; i < 10; i += 1){
    
}`, {
            "type": "Program",
            "body": [{
                "type": "ForStatement",
                "init": {
                    "type": "VariableStatement",
                    "declarations": [{
                        "type": "VariableDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "i",
                            "loc": {
                                "start": {
                                    "cursor": 9,
                                    "column": 9,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 10,
                                    "column": 10,
                                    "line": 0
                                }
                            }
                        },
                        "init": {
                            "type": "NumericLiteral",
                            "value": 0,
                            "loc": {
                                "start": {
                                    "cursor": 13,
                                    "column": 13,
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
                                "cursor": 9,
                                "column": 9,
                                "line": 0
                            },
                            "end": {
                                "cursor": 14,
                                "column": 14,
                                "line": 0
                            }
                        }
                    }],
                    "loc": {
                        "start": {
                            "cursor": 5,
                            "column": 5,
                            "line": 0
                        },
                        "end": {
                            "cursor": 14,
                            "column": 14,
                            "line": 0
                        }
                    }
                },
                "test": {
                    "type": "BinaryExpression",
                    "operator": {
                        "type": "RELATIONAL_OPERATOR",
                        "value": "<",
                        "loc": {
                            "start": {
                                "cursor": 18,
                                "column": 18,
                                "line": 0
                            },
                            "end": {
                                "cursor": 19,
                                "column": 19,
                                "line": 0
                            }
                        }
                    },
                    "left": {
                        "type": "Identifier",
                        "name": "i",
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
                    },
                    "right": {
                        "type": "NumericLiteral",
                        "value": 10,
                        "loc": {
                            "start": {
                                "cursor": 20,
                                "column": 20,
                                "line": 0
                            },
                            "end": {
                                "cursor": 22,
                                "column": 22,
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
                            "cursor": 22,
                            "column": 22,
                            "line": 0
                        }
                    }
                },
                "update": {
                    "type": "AssignmentExpression",
                    "operator": {
                        "type": "ASSIGNMENT_COMBO_OPERATOR",
                        "value": "+=",
                        "loc": {
                            "start": {
                                "cursor": 26,
                                "column": 26,
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
                        "name": "i",
                        "loc": {
                            "start": {
                                "cursor": 24,
                                "column": 24,
                                "line": 0
                            },
                            "end": {
                                "cursor": 25,
                                "column": 25,
                                "line": 0
                            }
                        }
                    },
                    "right": {
                        "type": "NumericLiteral",
                        "value": 1,
                        "loc": {
                            "start": {
                                "cursor": 29,
                                "column": 29,
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
                            "cursor": 24,
                            "column": 24,
                            "line": 0
                        },
                        "end": {
                            "cursor": 30,
                            "column": 30,
                            "line": 0
                        }
                    }
                },
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "loc": {
                        "start": {
                            "cursor": 31,
                            "column": 31,
                            "line": 0
                        },
                        "end": {
                            "cursor": 39,
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
                        "cursor": 39,
                        "column": 1,
                        "line": 2
                    }
                }
            }]
        }
    ],
    [
        `for (i = 0; i < 10; i += 1){
    
}`, {
            "type": "Program",
            "body": [{
                "type": "ForStatement",
                "init": {
                    "type": "AssignmentExpression",
                    "operator": {
                        "type": "ASSIGNMENT_OPERATOR",
                        "value": "=",
                        "loc": {
                            "start": {
                                "cursor": 7,
                                "column": 7,
                                "line": 0
                            },
                            "end": {
                                "cursor": 8,
                                "column": 8,
                                "line": 0
                            }
                        }
                    },
                    "left": {
                        "type": "Identifier",
                        "name": "i",
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
                    },
                    "right": {
                        "type": "NumericLiteral",
                        "value": 0,
                        "loc": {
                            "start": {
                                "cursor": 9,
                                "column": 9,
                                "line": 0
                            },
                            "end": {
                                "cursor": 10,
                                "column": 10,
                                "line": 0
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "cursor": 5,
                            "column": 5,
                            "line": 0
                        },
                        "end": {
                            "cursor": 10,
                            "column": 10,
                            "line": 0
                        }
                    }
                },
                "test": {
                    "type": "BinaryExpression",
                    "operator": {
                        "type": "RELATIONAL_OPERATOR",
                        "value": "<",
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
                    "left": {
                        "type": "Identifier",
                        "name": "i",
                        "loc": {
                            "start": {
                                "cursor": 12,
                                "column": 12,
                                "line": 0
                            },
                            "end": {
                                "cursor": 13,
                                "column": 13,
                                "line": 0
                            }
                        }
                    },
                    "right": {
                        "type": "NumericLiteral",
                        "value": 10,
                        "loc": {
                            "start": {
                                "cursor": 16,
                                "column": 16,
                                "line": 0
                            },
                            "end": {
                                "cursor": 18,
                                "column": 18,
                                "line": 0
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "cursor": 12,
                            "column": 12,
                            "line": 0
                        },
                        "end": {
                            "cursor": 18,
                            "column": 18,
                            "line": 0
                        }
                    }
                },
                "update": {
                    "type": "AssignmentExpression",
                    "operator": {
                        "type": "ASSIGNMENT_COMBO_OPERATOR",
                        "value": "+=",
                        "loc": {
                            "start": {
                                "cursor": 22,
                                "column": 22,
                                "line": 0
                            },
                            "end": {
                                "cursor": 24,
                                "column": 24,
                                "line": 0
                            }
                        }
                    },
                    "left": {
                        "type": "Identifier",
                        "name": "i",
                        "loc": {
                            "start": {
                                "cursor": 20,
                                "column": 20,
                                "line": 0
                            },
                            "end": {
                                "cursor": 21,
                                "column": 21,
                                "line": 0
                            }
                        }
                    },
                    "right": {
                        "type": "NumericLiteral",
                        "value": 1,
                        "loc": {
                            "start": {
                                "cursor": 25,
                                "column": 25,
                                "line": 0
                            },
                            "end": {
                                "cursor": 26,
                                "column": 26,
                                "line": 0
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "cursor": 20,
                            "column": 20,
                            "line": 0
                        },
                        "end": {
                            "cursor": 26,
                            "column": 26,
                            "line": 0
                        }
                    }
                },
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "loc": {
                        "start": {
                            "cursor": 27,
                            "column": 27,
                            "line": 0
                        },
                        "end": {
                            "cursor": 35,
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
                        "cursor": 35,
                        "column": 1,
                        "line": 2
                    }
                }
            }]
        }
    ],
    [
        `for (;;){}`, {
            "type": "Program",
            "body": [{
                "type": "ForStatement",
                "init": null,
                "test": null,
                "update": null,
                "body": {
                    "type": "BlockStatement",
                    "body": [],
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
                "loc": {
                    "start": {
                        "cursor": 0,
                        "column": 0,
                        "line": 0
                    },
                    "end": {
                        "cursor": 10,
                        "column": 10,
                        "line": 0
                    }
                }
            }]
        }
    ],

]



const parser = new Parser()
describe('Testing for statement ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})