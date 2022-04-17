import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [
        `class test{ }`, {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "test",
                    "loc": {
                        "start": {
                            "cursor": 6,
                            "column": 6,
                            "line": 0
                        },
                        "end": {
                            "cursor": 10,
                            "column": 10,
                            "line": 0
                        }
                    }
                },
                "superClass": null,
                "body": [],
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
            }]
        }
    ],
    [
        `class test2 extends test{}`, {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "test2",
                    "loc": {
                        "start": {
                            "cursor": 6,
                            "column": 6,
                            "line": 0
                        },
                        "end": {
                            "cursor": 11,
                            "column": 11,
                            "line": 0
                        }
                    }
                },
                "superClass": {
                    "type": "Identifier",
                    "name": "test",
                    "loc": {
                        "start": {
                            "cursor": 20,
                            "column": 20,
                            "line": 0
                        },
                        "end": {
                            "cursor": 24,
                            "column": 24,
                            "line": 0
                        }
                    }
                },
                "body": [],
                "loc": {
                    "start": {
                        "cursor": 0,
                        "column": 0,
                        "line": 0
                    },
                    "end": {
                        "cursor": 26,
                        "column": 26,
                        "line": 0
                    }
                }
            }]
        }
    ],
    [
        `class test{
constructor(){
this.otherClass = new OtherClass(this)
}
}`, {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "test",
                    "loc": {
                        "start": {
                            "cursor": 6,
                            "column": 6,
                            "line": 0
                        },
                        "end": {
                            "cursor": 10,
                            "column": 10,
                            "line": 0
                        }
                    }
                },
                "superClass": null,
                "body": [{
                    "type": "FunctionDeclaration",
                    "name": {
                        "type": "Identifier",
                        "name": "constructor",
                        "loc": {
                            "start": {
                                "cursor": 12,
                                "column": 0,
                                "line": 1
                            },
                            "end": {
                                "cursor": 23,
                                "column": 11,
                                "line": 1
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "AssignmentExpression",
                                "operator": {
                                    "type": "ASSIGNMENT_OPERATOR",
                                    "value": "=",
                                    "loc": {
                                        "start": {
                                            "cursor": 43,
                                            "column": 16,
                                            "line": 2
                                        },
                                        "end": {
                                            "cursor": 44,
                                            "column": 17,
                                            "line": 2
                                        }
                                    }
                                },
                                "left": {
                                    "type": "MemberExpression",
                                    "computed": false,
                                    "object": {
                                        "type": "ThisExpression",
                                        "loc": {
                                            "start": {
                                                "cursor": 27,
                                                "column": 0,
                                                "line": 2
                                            },
                                            "end": {
                                                "cursor": 31,
                                                "column": 4,
                                                "line": 2
                                            }
                                        }
                                    },
                                    "property": {
                                        "type": "Identifier",
                                        "name": "otherClass",
                                        "loc": {
                                            "start": {
                                                "cursor": 32,
                                                "column": 5,
                                                "line": 2
                                            },
                                            "end": {
                                                "cursor": 42,
                                                "column": 15,
                                                "line": 2
                                            }
                                        }
                                    },
                                    "loc": {
                                        "start": {
                                            "cursor": 27,
                                            "column": 0,
                                            "line": 2
                                        },
                                        "end": {
                                            "cursor": 42,
                                            "column": 15,
                                            "line": 2
                                        }
                                    }
                                },
                                "right": {
                                    "type": "NewExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "OtherClass",
                                        "loc": {
                                            "start": {
                                                "cursor": 49,
                                                "column": 22,
                                                "line": 2
                                            },
                                            "end": {
                                                "cursor": 59,
                                                "column": 32,
                                                "line": 2
                                            }
                                        }
                                    },
                                    "arguments": {
                                        "list": [{
                                            "type": "ThisExpression",
                                            "loc": {
                                                "start": {
                                                    "cursor": 60,
                                                    "column": 33,
                                                    "line": 2
                                                },
                                                "end": {
                                                    "cursor": 64,
                                                    "column": 37,
                                                    "line": 2
                                                }
                                            }
                                        }],
                                        "loc": {
                                            "start": {
                                                "cursor": 59,
                                                "column": 32,
                                                "line": 2
                                            },
                                            "end": {
                                                "cursor": 65,
                                                "column": 38,
                                                "line": 2
                                            }
                                        }
                                    },
                                    "loc": {
                                        "start": {
                                            "cursor": 45,
                                            "column": 18,
                                            "line": 2
                                        },
                                        "end": {
                                            "cursor": 65,
                                            "column": 38,
                                            "line": 2
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "cursor": 27,
                                        "column": 0,
                                        "line": 2
                                    },
                                    "end": {
                                        "cursor": 65,
                                        "column": 38,
                                        "line": 2
                                    }
                                }
                            }
                        }],
                        "loc": {
                            "start": {
                                "cursor": 25,
                                "column": 13,
                                "line": 1
                            },
                            "end": {
                                "cursor": 67,
                                "column": 1,
                                "line": 3
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "cursor": 12,
                            "column": 0,
                            "line": 1
                        },
                        "end": {
                            "cursor": 67,
                            "column": 1,
                            "line": 3
                        }
                    }
                }],
                "loc": {
                    "start": {
                        "cursor": 0,
                        "column": 0,
                        "line": 0
                    },
                    "end": {
                        "cursor": 69,
                        "column": 1,
                        "line": 4
                    }
                }
            }]
        }
    ],
    [`class test{
constructor(){
super()
}
}`,
        {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "test",
                    "loc": {
                        "start": {
                            "cursor": 6,
                            "column": 6,
                            "line": 0
                        },
                        "end": {
                            "cursor": 10,
                            "column": 10,
                            "line": 0
                        }
                    }
                },
                "superClass": null,
                "body": [{
                    "type": "FunctionDeclaration",
                    "name": {
                        "type": "Identifier",
                        "name": "constructor",
                        "loc": {
                            "start": {
                                "cursor": 12,
                                "column": 0,
                                "line": 1
                            },
                            "end": {
                                "cursor": 23,
                                "column": 11,
                                "line": 1
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Super",
                                    "loc": {
                                        "start": {
                                            "cursor": 27,
                                            "column": 0,
                                            "line": 2
                                        },
                                        "end": {
                                            "cursor": 32,
                                            "column": 5,
                                            "line": 2
                                        }
                                    }
                                },
                                "arguments": [],
                                "loc": {
                                    "start": {
                                        "cursor": 27,
                                        "column": 0,
                                        "line": 2
                                    },
                                    "end": {
                                        "cursor": 34,
                                        "column": 7,
                                        "line": 2
                                    }
                                }
                            }
                        }],
                        "loc": {
                            "start": {
                                "cursor": 25,
                                "column": 13,
                                "line": 1
                            },
                            "end": {
                                "cursor": 36,
                                "column": 1,
                                "line": 3
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "cursor": 12,
                            "column": 0,
                            "line": 1
                        },
                        "end": {
                            "cursor": 36,
                            "column": 1,
                            "line": 3
                        }
                    }
                }],
                "loc": {
                    "start": {
                        "cursor": 0,
                        "column": 0,
                        "line": 0
                    },
                    "end": {
                        "cursor": 38,
                        "column": 1,
                        "line": 4
                    }
                }
            }]
        }
    ],
]



const parser = new Parser()
describe('Testing classes ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})