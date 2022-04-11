import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [`var test;`,
        {
            type: "Program",
            body: [{
                type: "VariableStatement",
                declarations: [{
                    type: 'VariableDeclaration',
                    id: {
                        type: "Identifier",
                        name: "test",
                        loc: {
                            start: {
                                column: 4,
                                cursor: 4,
                                line: 0,
                            },
                            end: {
                                column: 8,
                                cursor: 8,
                                line: 0,
                            }
                        }
                    },
                    init: null,
                    loc: {
                        start: {
                            column: 4,
                            cursor: 4,
                            line: 0,
                        },
                        end: {
                            column: 8,
                            cursor: 8,
                            line: 0,
                        }
                    }

                }],
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
            }]
        }

    ],
    [`var test, newTest = 69;`,
        {
            type: "Program",
            body: [{
                type: "VariableStatement",
                declarations: [{
                        type: 'VariableDeclaration',
                        id: {
                            type: "Identifier",
                            name: "test",
                            loc: {
                                start: {
                                    column: 4,
                                    cursor: 4,
                                    line: 0,
                                },
                                end: {
                                    column: 8,
                                    cursor: 8,
                                    line: 0,
                                }
                            }
                        },
                        init: null,
                        loc: {
                            start: {
                                column: 4,
                                cursor: 4,
                                line: 0,
                            },
                            end: {
                                column: 8,
                                cursor: 8,
                                line: 0,
                            }
                        }

                    },
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: "Identifier",
                            name: "newTest",
                            loc: {
                                start: {
                                    column: 10,
                                    cursor: 10,
                                    line: 0,
                                },
                                end: {
                                    column: 17,
                                    cursor: 17,
                                    line: 0,
                                }
                            }
                        },
                        init: {
                            type: "NumericLiteral",
                            value: 69,
                            loc: {
                                start: {
                                    column: 20,
                                    cursor: 20,
                                    line: 0,
                                },
                                end: {
                                    column: 22,
                                    cursor: 22,
                                    line: 0,
                                }
                            }
                        },
                        loc: {
                            start: {
                                column: 10,
                                cursor: 10,
                                line: 0,
                            },
                            end: {
                                column: 22,
                                cursor: 22,
                                line: 0,
                            }
                        }

                    }
                ],
                loc: {
                    start: {
                        column: 0,
                        cursor: 0,
                        line: 0,
                    },
                    end: {
                        column: 23,
                        cursor: 23,
                        line: 0,
                    }
                }
            }]
        }

    ],

]



const parser = new Parser()
describe('Testing variable declaration ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})