import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [
        `3 + 2 * 1;`, {
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "BinaryExpression",
                    operator: {
                        type: "ARITHMETIC_OPERATOR",
                        value: '+',
                        loc: {
                            start: {
                                column: 2,
                                cursor: 2,
                                line: 0,
                            },
                            end: {
                                column: 3,
                                cursor: 3,
                                line: 0,
                            }
                        }
                    },
                    left: {
                        type: "NumericLiteral",
                        value: 3,
                        loc: {
                            start: {
                                column: 0,
                                cursor: 0,
                                line: 0,
                            },
                            end: {
                                column: 1,
                                cursor: 1,
                                line: 0,
                            }
                        },
                    },
                    right: {
                        type: "BinaryExpression",
                        operator: {
                            type: "MULTIPLICATIVE_OPERATOR",
                            value: '*',
                            loc: {
                                start: {
                                    column: 6,
                                    cursor: 6,
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
                            type: "NumericLiteral",
                            value: 2,
                            loc: {
                                start: {
                                    column: 4,
                                    cursor: 4,
                                    line: 0,
                                },
                                end: {
                                    column: 5,
                                    cursor: 5,
                                    line: 0,
                                }
                            }
                        },
                        right: {
                            type: "NumericLiteral",
                            value: 1,
                            loc: {
                                start: {
                                    column: 8,
                                    cursor: 8,
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
                                column: 4,
                                cursor: 4,
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
    [
        `49 * 51;`, {
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "BinaryExpression",
                    operator: {
                        type: "MULTIPLICATIVE_OPERATOR",
                        value: '*',
                        loc: {
                            start: {
                                column: 3,
                                cursor: 3,
                                line: 0,
                            },
                            end: {
                                column: 4,
                                cursor: 4,
                                line: 0,
                            }
                        }
                    },
                    left: {
                        type: "NumericLiteral",
                        value: 49,
                        loc: {
                            start: {
                                column: 0,
                                cursor: 0,
                                line: 0,
                            },
                            end: {
                                column: 2,
                                cursor: 2,
                                line: 0,
                            }
                        }
                    },
                    right: {
                        type: "NumericLiteral",
                        value: 51,
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
                    loc: {
                        start: {
                            column: 0,
                            cursor: 0,
                            line: 0,
                        },
                        end: {
                            column: 7,
                            cursor: 7,
                            line: 0,
                        }
                    }
                }
            }]
        }
    ],
]



const parser = new Parser()
describe('Testing mathematical expressions - multiplication ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})