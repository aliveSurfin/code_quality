import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [`test = 69;`,
        {
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: {
                        type: "ASSIGNMENT_OPERATOR",
                        value: '=',
                        loc: {
                            start: {
                                column: 5,
                                cursor: 5,
                                line: 0,
                            },
                            end: {
                                column: 6,
                                cursor: 6,
                                line: 0,
                            }
                        }
                    },
                    left: {
                        type: 'Identifier',
                        name: 'test',
                        loc: {
                            start: {
                                column: 0,
                                cursor: 0,
                                line: 0,
                            },
                            end: {
                                column: 4,
                                cursor: 4,
                                line: 0,
                            }
                        }
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 69,
                        loc: {
                            start: {
                                column: 7,
                                cursor: 7,
                                line: 0,
                            },
                            end: {
                                column: 9,
                                cursor: 9,
                                line: 0,
                            }
                        }
                    },
                    loc: {
                        start: {
                            column: 0,
                            cursor: 0,
                            line: 0,
                        },
                        end: {
                            column: 9,
                            cursor: 9,
                            line: 0,
                        }
                    }
                }
            }]
        }

    ],
    [`test = newTest = 69;`,
        {
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: {
                        type: "ASSIGNMENT_OPERATOR",
                        value: '=',
                        loc: {
                            start: {
                                column: 5,
                                cursor: 5,
                                line: 0,
                            },
                            end: {
                                column: 6,
                                cursor: 6,
                                line: 0,
                            }
                        }
                    },
                    left: {
                        type: 'Identifier',
                        name: 'test',
                        loc: {
                            start: {
                                column: 0,
                                cursor: 0,
                                line: 0,
                            },
                            end: {
                                column: 4,
                                cursor: 4,
                                line: 0,
                            }
                        }
                    },
                    right: {
                        type: 'AssignmentExpression',
                        operator: {
                            type: "ASSIGNMENT_OPERATOR",
                            value: '=',
                            loc: {
                                start: {
                                    column: 15,
                                    cursor: 15,
                                    line: 0,
                                },
                                end: {
                                    column: 16,
                                    cursor: 16,
                                    line: 0,
                                }
                            },
                        },
                        left: {
                            type: 'Identifier',
                            name: 'newTest',
                            loc: {
                                start: {
                                    column: 7,
                                    cursor: 7,
                                    line: 0,
                                },
                                end: {
                                    column: 14,
                                    cursor: 14,
                                    line: 0,
                                }
                            }
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 69,
                            loc: {
                                start: {
                                    column: 17,
                                    cursor: 17,
                                    line: 0,
                                },
                                end: {
                                    column: 19,
                                    cursor: 19,
                                    line: 0,
                                }
                            }
                        },
                        loc: {
                            start: {
                                column: 7,
                                cursor: 7,
                                line: 0,
                            },
                            end: {
                                column: 19,
                                cursor: 19,
                                line: 0,
                            }
                        }

                    },
                    loc: {
                        start: {
                            column: 0,
                            cursor: 0,
                            line: 0,
                        },
                        end: {
                            column: 19,
                            cursor: 19,
                            line: 0,
                        }
                    }

                },



            }]
        }

    ],
    [`test *= 69;`,
        {
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: {
                        type: "ASSIGNMENT_COMBO_OPERATOR",
                        value: '*=',
                        loc: {
                            start: {
                                column: 5,
                                cursor: 5,
                                line: 0,
                            },
                            end: {
                                column: 7,
                                cursor: 7,
                                line: 0,
                            }
                        }
                    },
                    left: {
                        type: 'Identifier',
                        name: 'test',
                        loc: {
                            start: {
                                column: 0,
                                cursor: 0,
                                line: 0,
                            },
                            end: {
                                column: 4,
                                cursor: 4,
                                line: 0,
                            }
                        }
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 69,
                        loc: {
                            start: {
                                column: 8,
                                cursor: 8,
                                line: 0,
                            },
                            end: {
                                column: 10,
                                cursor: 10,
                                line: 0,
                            }
                        }
                    },
                    loc: {
                        start: {
                            column: 0,
                            cursor: 0,
                            line: 0,
                        },
                        end: {
                            column: 10,
                            cursor: 10,
                            line: 0,
                        }
                    }
                }
            }]
        }

    ],
]



const parser = new Parser()
describe('Testing assignment ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })


    }))

    test(`incorect assignment type `, () => {
        try {
            expect(parser.parse(`1 = 1;`)).toThrow(SyntaxError)
        } catch (e) {
            expect(e.message).toEqual("Incorrect assignment to type: NumericLiteral : 1 | 0:0")
        }
    })

})