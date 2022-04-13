import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [
        `
        if (a){
            ;
        } else {
            ;
        }
        `, {
            type: "Program",
            body: [{
                type: "IfStatement",
                test: {
                    type: "Identifier",
                    name: "a",
                    loc: {
                        start: {
                            column: 12,
                            cursor: 13,
                            line: 1,
                        },
                        end: {
                            column: 13,
                            cursor: 14,
                            line: 1,
                        }
                    }
                },
                loc: {
                    start: {
                        column: 8,
                        cursor: 9,
                        line: 1,
                    },
                    end: {
                        column: 9,
                        cursor: 71,
                        line: 5,
                    }
                },
                consequent: {
                    type: "BlockStatement",
                    body: [],
                    loc: {
                        start: {
                            column: 14,
                            cursor: 15,
                            line: 1,
                        },
                        end: {
                            column: 9,
                            cursor: 40,
                            line: 3,
                        }
                    }
                },
                alternate: {
                    type: "BlockStatement",
                    body: [],
                    loc: {
                        start: {
                            column: 15,
                            cursor: 46,
                            line: 3,
                        },
                        end: {
                            column: 9,
                            cursor: 71,
                            line: 5,
                        }
                    }
                },

            }]


        }
    ],
    [
        `
        if (a){
            ;
        }
        `, {
            type: "Program",
            body: [{
                type: "IfStatement",
                test: {
                    type: "Identifier",
                    name: "a",
                    loc: {
                        start: {
                            column: 12,
                            cursor: 13,
                            line: 1,
                        },
                        end: {
                            column: 13,
                            cursor: 14,
                            line: 1,
                        }
                    }
                },
                loc: {
                    start: {
                        column: 8,
                        cursor: 9,
                        line: 1,
                    },
                    end: {
                        column: 9,
                        cursor: 40,
                        line: 3,
                    }
                },
                consequent: {
                    type: "BlockStatement",
                    body: [],
                    loc: {
                        start: {
                            column: 14,
                            cursor: 15,
                            line: 1,
                        },
                        end: {
                            column: 9,
                            cursor: 40,
                            line: 3,
                        }
                    }
                },
                alternate: null,

            }]


        }
    ],
    [
        `
if (a > b){
    ;
}
`, {
            "type": "Program",
            "body": [{
                "type": "IfStatement",
                "test": {
                    "type": "BinaryExpression",
                    "operator": {
                        "type": "RELATIONAL_OPERATOR",
                        "value": ">",
                        "loc": {
                            "start": {
                                "cursor": 7,
                                "column": 6,
                                "line": 1
                            },
                            "end": {
                                "cursor": 8,
                                "column": 7,
                                "line": 1
                            }
                        }
                    },
                    "left": {
                        "type": "Identifier",
                        "name": "a",
                        "loc": {
                            "start": {
                                "cursor": 5,
                                "column": 4,
                                "line": 1
                            },
                            "end": {
                                "cursor": 6,
                                "column": 5,
                                "line": 1
                            }
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "b",
                        "loc": {
                            "start": {
                                "cursor": 9,
                                "column": 8,
                                "line": 1
                            },
                            "end": {
                                "cursor": 10,
                                "column": 9,
                                "line": 1
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "cursor": 5,
                            "column": 4,
                            "line": 1
                        },
                        "end": {
                            "cursor": 10,
                            "column": 9,
                            "line": 1
                        }
                    }
                },
                "consequent": {
                    "type": "BlockStatement",
                    "body": [],
                    "loc": {
                        "start": {
                            "cursor": 11,
                            "column": 10,
                            "line": 1
                        },
                        "end": {
                            "cursor": 20,
                            "column": 1,
                            "line": 3
                        }
                    }
                },
                "alternate": null,
                "loc": {
                    "start": {
                        "cursor": 1,
                        "column": 0,
                        "line": 1
                    },
                    "end": {
                        "cursor": 20,
                        "column": 1,
                        "line": 3
                    }
                }
            }]
        }
    ],
]


const parser = new Parser()
describe('Testing if statements', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})