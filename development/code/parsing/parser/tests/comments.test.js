import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [`69;//ignore this comment`, {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NumericLiteral",
                value: 69,
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
            }
        }],
        comments: [{
            loc: {
                end: {
                    column: 24,
                    cursor: 24,
                    line: 0,
                },
                start: {
                    column: 3,
                    cursor: 3,
                    line: 0,
                },
            },
            type: "SINGLE_LINE_COMMENT",
            value: "ignore this comment",
        }, ]
    }],
    [`//ignore this comment
69;`, {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NumericLiteral",
                value: 69,
                loc: {
                    start: {
                        column: 0,
                        cursor: 22,
                        line: 1,
                    },
                    end: {
                        column: 2,
                        cursor: 24,
                        line: 1,
                    }
                }
            }
        }],
        comments: [{
            loc: {
                end: {
                    column: 21,
                    cursor: 21,
                    line: 0,
                },
                start: {
                    column: 0,
                    cursor: 0,
                    line: 0,
                },
            },
            type: "SINGLE_LINE_COMMENT",
            value: "ignore this comment",
        }, ]
    }],
    [`/*ignore this comment*/
69;`, {
        type: "Program",
        body: [{
            type: "ExpressionStatement",
            expression: {
                type: "NumericLiteral",
                value: 69,
                loc: {
                    start: {
                        column: 0,
                        cursor: 24,
                        line: 1,
                    },
                    end: {
                        column: 2,
                        cursor: 26,
                        line: 1,
                    }
                }
            }
        }],
        comments: [{
            loc: {
                end: {
                    column: 23,
                    cursor: 23,
                    line: 0,
                },
                start: {
                    column: 0,
                    cursor: 0,
                    line: 0,
                },
            },
            type: "MULTI_LINE_COMMENT",
            value: "ignore this comment",
        }, ]
    }],
    [
        `/*multiple lines 
of comment*/
69;`, {
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "NumericLiteral",
                    value: 69,
                    loc: {
                        start: {
                            column: 0,
                            cursor: 31,
                            line: 2,
                        },
                        end: {
                            column: 2,
                            cursor: 33,
                            line: 2,
                        }
                    }
                }
            }],
            comments: [{
                loc: {
                    end: {
                        column: 12,
                        cursor: 30,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        cursor: 0,
                        line: 0,
                    },
                },
                type: "MULTI_LINE_COMMENT",
                value: "multiple lines \nof comment",
            }, ]
        }
    ],
    [
        `/*multiple lines and indent on 2nd 
line*/ 69;`, {
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "NumericLiteral",
                    value: 69,
                    loc: {
                        start: {
                            column: 7,
                            cursor: 43,
                            line: 1,
                        },
                        end: {
                            column: 9,
                            cursor: 45,
                            line: 1,
                        }
                    }
                }
            }],
            comments: [{
                loc: {
                    end: {
                        column: 6,
                        cursor: 42,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        cursor: 0,
                        line: 0,
                    },
                },
                type: "MULTI_LINE_COMMENT",
                value: "multiple lines and indent on 2nd \nline",
            }, ]
        }
    ],
    [
        `/*multiple comments 
*/ 69;
//another comment
`, {
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "NumericLiteral",
                    value: 69,
                    loc: {
                        start: {
                            column: 3,
                            cursor: 24,
                            line: 1,
                        },
                        end: {
                            column: 5,
                            cursor: 26,
                            line: 1,
                        }
                    }
                }
            }],
            comments: [{
                    loc: {
                        end: {
                            column: 2,
                            cursor: 23,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            cursor: 0,
                            line: 0,
                        },
                    },
                    type: "MULTI_LINE_COMMENT",
                    value: "multiple comments \n",
                },
                {
                    loc: {
                        end: {
                            column: 17,
                            cursor: 45,
                            line: 2,
                        },
                        start: {
                            column: 0,
                            cursor: 28,
                            line: 2,
                        },
                    },
                    type: "SINGLE_LINE_COMMENT",
                    value: "another comment",
                },
            ]
        }
    ],

]



const parser = new Parser()
describe('Testing parsing with comments', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})