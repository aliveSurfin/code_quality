// const source = `function test(){
//     return false;
//     return "test";
// 	if(test){
//         return true;
// 	}else{
// 		while(test){
// 		}
// 	}
// }`

const source = ``

import Evaluate from "./evaluate.js";

describe('Testing Evaluation', () => {
    it('Empty Program', () => {
        expect(Evaluate('').analysis).toEqual(

            {
                "functions": {},
                "classes": {},
                "complexity": {
                    "halstead": {
                        "operands": {},
                        "operators": {},
                        "distinctOperators": 0,
                        "distinctOperands": 0,
                        "totalOperators": 0,
                        "totalOperands": 0,
                        "programVocab": 0,
                        "programLength": 0,
                        "calculatedProgramLength": 0,
                        "volume": 0,
                        "difficulty": 0,
                        "effort": 0,
                        "timeRequiredSeconds": 0,
                        "numberDeliveredBugs": 0
                    }
                }
            }
        )
    });
    it('Error Program', () => {
        expect(Evaluate('8 = 1;')).toEqual(

            {
                "source": "8 = 1;",
                "error": {
                    "message": "Incorrect assignment to type: NumericLiteral : 8 | 0:0",
                    "token": {
                        "type": "NumericLiteral",
                        "value": 8,
                        "loc": {
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
                        }
                    }
                }
            }
        )
    });
    it('Program with class', () => {
        expect(Evaluate('class test{}').analysis).toEqual(

            {
                "functions": {},
                "classes": {
                    "_test": {
                        "name": "test",
                        "childClasses": 0,
                        "superClass": null,
                        "problems": [],
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
                        },
                        "functions": {}
                    }
                },
                "complexity": {
                    "halstead": {
                        "operands": {
                            "_test": true
                        },
                        "operators": {
                            "_{": true,
                            "_}": true
                        },
                        "distinctOperators": 2,
                        "distinctOperands": 1,
                        "totalOperators": 2,
                        "totalOperands": 1,
                        "programVocab": 3,
                        "programLength": 3,
                        "calculatedProgramLength": 2,
                        "volume": 4.754887502163468,
                        "difficulty": 1,
                        "effort": 4.754887502163468,
                        "timeRequiredSeconds": 0.26416041678685936,
                        "numberDeliveredBugs": 0.001584962500721156
                    }
                }
            }

        )
    });
    it('Program with class that has too large inheritance depth ', () => {
        expect(Evaluate(`class test extends test1{}
        class test1 extends test2{}
        class test2 extends test3{}
        class test3 extends test4{}
        class test4 extends test5{}
        class test5 extends test6{}
        class test6 extends test7{}`).analysis).toEqual(

            {
                "functions": {},
                "classes": {
                    "_test": {
                        "name": "test",
                        "problems": [{
                            "type": "Inheritance Tree",
                            "message": "Inheritance depth of 6, try to get this to less than 6",
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
                        }],
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
                        },
                        "functions": {},
                        "superClass": "_test1",
                        "childClasses": 0
                    },
                    "_test1": {
                        "name": "test1",
                        "problems": [],
                        "loc": {
                            "start": {
                                "cursor": 35,
                                "column": 8,
                                "line": 1
                            },
                            "end": {
                                "cursor": 62,
                                "column": 35,
                                "line": 1
                            }
                        },
                        "functions": {},
                        "superClass": "_test2",
                        "childClasses": 0
                    },
                    "_test2": {
                        "name": "test2",
                        "problems": [],
                        "loc": {
                            "start": {
                                "cursor": 71,
                                "column": 8,
                                "line": 2
                            },
                            "end": {
                                "cursor": 98,
                                "column": 35,
                                "line": 2
                            }
                        },
                        "functions": {},
                        "superClass": "_test3",
                        "childClasses": 0
                    },
                    "_test3": {
                        "name": "test3",
                        "problems": [],
                        "loc": {
                            "start": {
                                "cursor": 107,
                                "column": 8,
                                "line": 3
                            },
                            "end": {
                                "cursor": 134,
                                "column": 35,
                                "line": 3
                            }
                        },
                        "functions": {},
                        "superClass": "_test4",
                        "childClasses": 0
                    },
                    "_test4": {
                        "name": "test4",
                        "problems": [],
                        "loc": {
                            "start": {
                                "cursor": 143,
                                "column": 8,
                                "line": 4
                            },
                            "end": {
                                "cursor": 170,
                                "column": 35,
                                "line": 4
                            }
                        },
                        "functions": {},
                        "superClass": "_test5",
                        "childClasses": 0
                    },
                    "_test5": {
                        "name": "test5",
                        "problems": [],
                        "loc": {
                            "start": {
                                "cursor": 179,
                                "column": 8,
                                "line": 5
                            },
                            "end": {
                                "cursor": 206,
                                "column": 35,
                                "line": 5
                            }
                        },
                        "functions": {},
                        "superClass": "_test6",
                        "childClasses": 0
                    },
                    "_test6": {
                        "name": "test6",
                        "problems": [],
                        "loc": {
                            "start": {
                                "cursor": 215,
                                "column": 8,
                                "line": 6
                            },
                            "end": {
                                "cursor": 242,
                                "column": 35,
                                "line": 6
                            }
                        },
                        "functions": {},
                        "superClass": "_test7",
                        "childClasses": 0
                    }
                },
                "complexity": {
                    "halstead": {
                        "operands": {
                            "_test": true,
                            "_test1": true,
                            "_test2": true,
                            "_test3": true,
                            "_test4": true,
                            "_test5": true,
                            "_test6": true,
                            "_test7": true
                        },
                        "operators": {
                            "_extends": true,
                            "_{": true,
                            "_}": true
                        },
                        "distinctOperators": 3,
                        "distinctOperands": 8,
                        "totalOperators": 21,
                        "totalOperands": 14,
                        "programVocab": 11,
                        "programLength": 35,
                        "calculatedProgramLength": 28.75488750216347,
                        "volume": 121.0801066523054,
                        "difficulty": 2.625,
                        "effort": 317.8352799623017,
                        "timeRequiredSeconds": 17.657515553461206,
                        "numberDeliveredBugs": 0.04036003555076847
                    }
                }
            }

        )
    });
    it('Program with class that has too many methods ', () => {

        expect(Evaluate(`class test{
            constructor(){
            }
        
            method1(){}
            method2(){}
            method3(){}
            method4(){}
            method5(){}
            method6(){}
            method7(){}
            method8(){}
            method9(){}
            method10(){}
            method11(){}
            method12(){}
            method13(){}
            method14(){}
            method15(){}
            method16(){}
            method17(){}
            method18(){}
            method19(){}
            method20(){}
            method21(){}
        }
         `).analysis).toEqual(

            {
                "functions": {},
                "classes": {
                    "_test": {
                        "name": "test",
                        "problems": [{
                            "type": "Methods In Class",
                            "message": "22 methods in class, try to get this less than 20",
                            "loc": {
                                "start": {
                                    "cursor": 0,
                                    "column": 0,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 587,
                                    "column": 9,
                                    "line": 25
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
                                "cursor": 587,
                                "column": 9,
                                "line": 25
                            }
                        },
                        "functions": {
                            "_constructor": {
                                "name": "constructor",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 24,
                                        "column": 12,
                                        "line": 1
                                    },
                                    "end": {
                                        "cursor": 52,
                                        "column": 13,
                                        "line": 2
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_constructor": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method1": {
                                "name": "method1",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 74,
                                        "column": 12,
                                        "line": 4
                                    },
                                    "end": {
                                        "cursor": 85,
                                        "column": 23,
                                        "line": 4
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method1": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method2": {
                                "name": "method2",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 98,
                                        "column": 12,
                                        "line": 5
                                    },
                                    "end": {
                                        "cursor": 109,
                                        "column": 23,
                                        "line": 5
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method2": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method3": {
                                "name": "method3",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 122,
                                        "column": 12,
                                        "line": 6
                                    },
                                    "end": {
                                        "cursor": 133,
                                        "column": 23,
                                        "line": 6
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method3": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method4": {
                                "name": "method4",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 146,
                                        "column": 12,
                                        "line": 7
                                    },
                                    "end": {
                                        "cursor": 157,
                                        "column": 23,
                                        "line": 7
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method4": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method5": {
                                "name": "method5",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 170,
                                        "column": 12,
                                        "line": 8
                                    },
                                    "end": {
                                        "cursor": 181,
                                        "column": 23,
                                        "line": 8
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method5": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method6": {
                                "name": "method6",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 194,
                                        "column": 12,
                                        "line": 9
                                    },
                                    "end": {
                                        "cursor": 205,
                                        "column": 23,
                                        "line": 9
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method6": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method7": {
                                "name": "method7",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 218,
                                        "column": 12,
                                        "line": 10
                                    },
                                    "end": {
                                        "cursor": 229,
                                        "column": 23,
                                        "line": 10
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method7": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method8": {
                                "name": "method8",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 242,
                                        "column": 12,
                                        "line": 11
                                    },
                                    "end": {
                                        "cursor": 253,
                                        "column": 23,
                                        "line": 11
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method8": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method9": {
                                "name": "method9",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 266,
                                        "column": 12,
                                        "line": 12
                                    },
                                    "end": {
                                        "cursor": 277,
                                        "column": 23,
                                        "line": 12
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method9": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method10": {
                                "name": "method10",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 290,
                                        "column": 12,
                                        "line": 13
                                    },
                                    "end": {
                                        "cursor": 302,
                                        "column": 24,
                                        "line": 13
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method10": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method11": {
                                "name": "method11",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 315,
                                        "column": 12,
                                        "line": 14
                                    },
                                    "end": {
                                        "cursor": 327,
                                        "column": 24,
                                        "line": 14
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method11": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method12": {
                                "name": "method12",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 340,
                                        "column": 12,
                                        "line": 15
                                    },
                                    "end": {
                                        "cursor": 352,
                                        "column": 24,
                                        "line": 15
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method12": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method13": {
                                "name": "method13",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 365,
                                        "column": 12,
                                        "line": 16
                                    },
                                    "end": {
                                        "cursor": 377,
                                        "column": 24,
                                        "line": 16
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method13": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method14": {
                                "name": "method14",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 390,
                                        "column": 12,
                                        "line": 17
                                    },
                                    "end": {
                                        "cursor": 402,
                                        "column": 24,
                                        "line": 17
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method14": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method15": {
                                "name": "method15",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 415,
                                        "column": 12,
                                        "line": 18
                                    },
                                    "end": {
                                        "cursor": 427,
                                        "column": 24,
                                        "line": 18
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method15": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method16": {
                                "name": "method16",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 440,
                                        "column": 12,
                                        "line": 19
                                    },
                                    "end": {
                                        "cursor": 452,
                                        "column": 24,
                                        "line": 19
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method16": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method17": {
                                "name": "method17",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 465,
                                        "column": 12,
                                        "line": 20
                                    },
                                    "end": {
                                        "cursor": 477,
                                        "column": 24,
                                        "line": 20
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method17": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method18": {
                                "name": "method18",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 490,
                                        "column": 12,
                                        "line": 21
                                    },
                                    "end": {
                                        "cursor": 502,
                                        "column": 24,
                                        "line": 21
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method18": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method19": {
                                "name": "method19",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 515,
                                        "column": 12,
                                        "line": 22
                                    },
                                    "end": {
                                        "cursor": 527,
                                        "column": 24,
                                        "line": 22
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method19": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method20": {
                                "name": "method20",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 540,
                                        "column": 12,
                                        "line": 23
                                    },
                                    "end": {
                                        "cursor": 552,
                                        "column": 24,
                                        "line": 23
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method20": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            },
                            "_method21": {
                                "name": "method21",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 565,
                                        "column": 12,
                                        "line": 24
                                    },
                                    "end": {
                                        "cursor": 577,
                                        "column": 24,
                                        "line": 24
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_method21": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            }
                        },
                        "superClass": null,
                        "childClasses": 0
                    }
                },
                "complexity": {
                    "halstead": {
                        "operands": {
                            "_test": true,
                            "_constructor": true,
                            "_method1": true,
                            "_method2": true,
                            "_method3": true,
                            "_method4": true,
                            "_method5": true,
                            "_method6": true,
                            "_method7": true,
                            "_method8": true,
                            "_method9": true,
                            "_method10": true,
                            "_method11": true,
                            "_method12": true,
                            "_method13": true,
                            "_method14": true,
                            "_method15": true,
                            "_method16": true,
                            "_method17": true,
                            "_method18": true,
                            "_method19": true,
                            "_method20": true,
                            "_method21": true
                        },
                        "operators": {
                            "_{": true,
                            "_}": true,
                            "_(": true,
                            "_)": true
                        },
                        "distinctOperators": 4,
                        "distinctOperands": 23,
                        "totalOperators": 90,
                        "totalOperands": 23,
                        "programVocab": 27,
                        "programLength": 113,
                        "calculatedProgramLength": 112.0419249893113,
                        "volume": 537.3022877444719,
                        "difficulty": 2,
                        "effort": 1074.6045754889437,
                        "timeRequiredSeconds": 59.700254193830204,
                        "numberDeliveredBugs": 0.17910076258149063
                    }
                }
            }

        )
    });
    it('Program with class that inherits itself ', () => {
        expect(Evaluate(`class test extends test{}`).analysis).toEqual(

            {
                "functions": {},
                "classes": {
                    "_test": {
                        "name": "test",
                        "problems": [{
                            "type": "Self inheritance",
                            "message": "Class inherits from itself",
                            "loc": {
                                "start": {
                                    "cursor": 0,
                                    "column": 0,
                                    "line": 0
                                },
                                "end": {
                                    "cursor": 25,
                                    "column": 25,
                                    "line": 0
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
                                "cursor": 25,
                                "column": 25,
                                "line": 0
                            }
                        },
                        "functions": {},
                        "superClass": "_test",
                        "childClasses": 0
                    }
                },
                "complexity": {
                    "halstead": {
                        "operands": {
                            "_test": true
                        },
                        "operators": {
                            "_extends": true,
                            "_{": true,
                            "_}": true
                        },
                        "distinctOperators": 3,
                        "distinctOperands": 1,
                        "totalOperators": 3,
                        "totalOperands": 2,
                        "programVocab": 4,
                        "programLength": 5,
                        "calculatedProgramLength": 4.754887502163468,
                        "volume": 10,
                        "difficulty": 3,
                        "effort": 30,
                        "timeRequiredSeconds": 1.6666666666666667,
                        "numberDeliveredBugs": 0.0033333333333333335
                    }
                }
            }

        )
    });
    it('Program with class with function ', () => {


        expect(Evaluate(`class test{
            constructor(){

            }
        }`).analysis).toEqual(

            {
                "functions": {},
                "classes": {
                    "_test": {
                        "name": "test",
                        "childClasses": 0,
                        "superClass": null,
                        "problems": [],
                        "loc": {
                            "start": {
                                "cursor": 0,
                                "column": 0,
                                "line": 0
                            },
                            "end": {
                                "cursor": 63,
                                "column": 9,
                                "line": 4
                            }
                        },
                        "functions": {
                            "_constructor": {
                                "name": "constructor",
                                "problems": [],
                                "loc": {
                                    "start": {
                                        "cursor": 24,
                                        "column": 12,
                                        "line": 1
                                    },
                                    "end": {
                                        "cursor": 53,
                                        "column": 13,
                                        "line": 3
                                    }
                                },
                                "complexity": {
                                    "cyclomatic": {
                                        "cycles": 1
                                    },
                                    "halstead": {
                                        "operands": {
                                            "_constructor": true
                                        },
                                        "operators": {
                                            "_(": true,
                                            "_)": true,
                                            "_{": true,
                                            "_}": true
                                        },
                                        "distinctOperators": 4,
                                        "distinctOperands": 1,
                                        "totalOperators": 4,
                                        "totalOperands": 1,
                                        "programVocab": 5,
                                        "programLength": 5,
                                        "calculatedProgramLength": 8,
                                        "volume": 11.60964047443681,
                                        "difficulty": 2,
                                        "effort": 23.21928094887362,
                                        "timeRequiredSeconds": 1.289960052715201,
                                        "numberDeliveredBugs": 0.0038698801581456034
                                    }
                                }
                            }
                        }
                    }
                },
                "complexity": {
                    "halstead": {
                        "operands": {
                            "_test": true,
                            "_constructor": true
                        },
                        "operators": {
                            "_{": true,
                            "_}": true,
                            "_(": true,
                            "_)": true
                        },
                        "distinctOperators": 4,
                        "distinctOperands": 2,
                        "totalOperators": 6,
                        "totalOperands": 2,
                        "programVocab": 6,
                        "programLength": 8,
                        "calculatedProgramLength": 10,
                        "volume": 20.67970000576925,
                        "difficulty": 2,
                        "effort": 41.3594000115385,
                        "timeRequiredSeconds": 2.2977444450854723,
                        "numberDeliveredBugs": 0.006893233335256416
                    }
                }
            }

        )
    });
    it('Function declaration ', () => {
        expect(Evaluate(`function test(){}`).analysis).toEqual({
                "functions": {
                    "_test": {
                        "name": "test",
                        "problems": [],
                        "loc": {
                            "start": {
                                "cursor": 0,
                                "column": 0,
                                "line": 0
                            },
                            "end": {
                                "cursor": 17,
                                "column": 17,
                                "line": 0
                            }
                        },
                        "complexity": {
                            "cyclomatic": {
                                "cycles": 1
                            },
                            "halstead": {
                                "operands": {
                                    "_test": true
                                },
                                "operators": {
                                    "_(": true,
                                    "_)": true,
                                    "_{": true,
                                    "_}": true
                                },
                                "distinctOperators": 4,
                                "distinctOperands": 1,
                                "totalOperators": 4,
                                "totalOperands": 1,
                                "programVocab": 5,
                                "programLength": 5,
                                "calculatedProgramLength": 8,
                                "volume": 11.60964047443681,
                                "difficulty": 2,
                                "effort": 23.21928094887362,
                                "timeRequiredSeconds": 1.289960052715201,
                                "numberDeliveredBugs": 0.0038698801581456034
                            }
                        }
                    }
                },
                "classes": {},
                "complexity": {
                    "halstead": {
                        "operands": {
                            "_test": true
                        },
                        "operators": {
                            "_(": true,
                            "_)": true,
                            "_{": true,
                            "_}": true
                        },
                        "distinctOperators": 4,
                        "distinctOperands": 1,
                        "totalOperators": 4,
                        "totalOperands": 1,
                        "programVocab": 5,
                        "programLength": 5,
                        "calculatedProgramLength": 8,
                        "volume": 11.60964047443681,
                        "difficulty": 2,
                        "effort": 23.21928094887362,
                        "timeRequiredSeconds": 1.289960052715201,
                        "numberDeliveredBugs": 0.0038698801581456034
                    }
                }
            }


        )
    });
    it('Class redeclaration ', () => {
        expect(Evaluate(`class test{}
        class test{}`).analysis).toEqual({
                "functions": {},
                "classes": {
                    "_test": {
                        "name": "test",
                        "childClasses": 0,
                        "superClass": null,
                        "problems": [{
                            "type": "Redefinition",
                            "message": "Class redefined",
                            "loc": {
                                "start": {
                                    "cursor": 21,
                                    "column": 8,
                                    "line": 1
                                },
                                "end": {
                                    "cursor": 33,
                                    "column": 20,
                                    "line": 1
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
                                "cursor": 12,
                                "column": 12,
                                "line": 0
                            }
                        },
                        "functions": {}
                    }
                },
                "complexity": {
                    "halstead": {
                        "operands": {
                            "_test": true
                        },
                        "operators": {
                            "_{": true,
                            "_}": true
                        },
                        "distinctOperators": 2,
                        "distinctOperands": 1,
                        "totalOperators": 4,
                        "totalOperands": 2,
                        "programVocab": 3,
                        "programLength": 6,
                        "calculatedProgramLength": 2,
                        "volume": 9.509775004326936,
                        "difficulty": 2,
                        "effort": 19.019550008653873,
                        "timeRequiredSeconds": 1.0566416671474375,
                        "numberDeliveredBugs": 0.003169925001442312
                    }
                }
            }


        )
    });
    it('Function too many params ', () => {
        expect(Evaluate(`function test(a, b, c, d){}`).analysis).toEqual({
            "functions": {
                "_test": {
                    "name": "test",
                    "problems": [{
                        "type": "Params",
                        "message": "Function has 4 parameters, attempt to refactor this"
                    }],
                    "loc": {
                        "start": {
                            "cursor": 0,
                            "column": 0,
                            "line": 0
                        },
                        "end": {
                            "cursor": 27,
                            "column": 27,
                            "line": 0
                        }
                    },
                    "complexity": {
                        "cyclomatic": {
                            "cycles": 1
                        },
                        "halstead": {
                            "operands": {
                                "_test": true,
                                "_a": true,
                                "_b": true,
                                "_c": true,
                                "_d": true
                            },
                            "operators": {
                                "_(": true,
                                "_)": true,
                                "_{": true,
                                "_}": true
                            },
                            "distinctOperators": 4,
                            "distinctOperands": 5,
                            "totalOperators": 4,
                            "totalOperands": 5,
                            "programVocab": 9,
                            "programLength": 9,
                            "calculatedProgramLength": 19.60964047443681,
                            "volume": 28.52932501298081,
                            "difficulty": 2,
                            "effort": 57.05865002596162,
                            "timeRequiredSeconds": 3.169925001442312,
                            "numberDeliveredBugs": 0.009509775004326936
                        }
                    }
                }
            },
            "classes": {},
            "complexity": {
                "halstead": {
                    "operands": {
                        "_test": true,
                        "_a": true,
                        "_b": true,
                        "_c": true,
                        "_d": true
                    },
                    "operators": {
                        "_(": true,
                        "_)": true,
                        "_{": true,
                        "_}": true
                    },
                    "distinctOperators": 4,
                    "distinctOperands": 5,
                    "totalOperators": 4,
                    "totalOperands": 5,
                    "programVocab": 9,
                    "programLength": 9,
                    "calculatedProgramLength": 19.60964047443681,
                    "volume": 28.52932501298081,
                    "difficulty": 2,
                    "effort": 57.05865002596162,
                    "timeRequiredSeconds": 3.169925001442312,
                    "numberDeliveredBugs": 0.009509775004326936
                }
            }
        })
    });
    it('Function too many lines ', () => {
        expect(Evaluate(`function test(){






















        }`).analysis).toEqual({
            "functions": {
                "_test": {
                    "name": "test",

                    "problems": [{
                        "type": "Lines",
                        "message": "This function has too many lines, attempt to refactor into smaller functions",
                    }],
                    "loc": {
                        "start": {
                            "cursor": 0,
                            "column": 0,
                            "line": 0
                        },
                        "end": {
                            "cursor": 48,
                            "column": 9,
                            "line": 23
                        }
                    },
                    "complexity": {
                        "cyclomatic": {
                            "cycles": 1
                        },
                        "halstead": {
                            "operands": {
                                "_test": true
                            },
                            "operators": {
                                "_(": true,
                                "_)": true,
                                "_{": true,
                                "_}": true
                            },
                            "distinctOperators": 4,
                            "distinctOperands": 1,
                            "totalOperators": 4,
                            "totalOperands": 1,
                            "programVocab": 5,
                            "programLength": 5,
                            "calculatedProgramLength": 8,
                            "volume": 11.60964047443681,
                            "difficulty": 2,
                            "effort": 23.21928094887362,
                            "timeRequiredSeconds": 1.289960052715201,
                            "numberDeliveredBugs": 0.0038698801581456034
                        }
                    }
                }
            },
            "classes": {},
            "complexity": {
                "halstead": {
                    "operands": {
                        "_test": true
                    },
                    "operators": {
                        "_(": true,
                        "_)": true,
                        "_{": true,
                        "_}": true
                    },
                    "distinctOperators": 4,
                    "distinctOperands": 1,
                    "totalOperators": 4,
                    "totalOperands": 1,
                    "programVocab": 5,
                    "programLength": 5,
                    "calculatedProgramLength": 8,
                    "volume": 11.60964047443681,
                    "difficulty": 2,
                    "effort": 23.21928094887362,
                    "timeRequiredSeconds": 1.289960052715201,
                    "numberDeliveredBugs": 0.0038698801581456034
                }
            }
        })
    });
    it('Function redeclaration in class ', () => {
        expect(Evaluate(`class test{
            func(){

            }
            func(){

            }
        }`).analysis).toEqual({
            "functions": {},
            "classes": {
                "_test": {
                    "name": "test",
                    "childClasses": 0,
                    "superClass": null,
                    "problems": [],
                    "loc": {
                        "start": {
                            "cursor": 0,
                            "column": 0,
                            "line": 0
                        },
                        "end": {
                            "cursor": 91,
                            "column": 9,
                            "line": 7
                        }
                    },
                    "functions": {
                        "_func": {
                            "name": "func",
                            "problems": [{
                                "type": "Redefinition",
                                "message": "Function redefined",
                                "loc": {
                                    "start": {
                                        "cursor": 59,
                                        "column": 12,
                                        "line": 4
                                    },
                                    "end": {
                                        "cursor": 81,
                                        "column": 13,
                                        "line": 6
                                    }
                                }
                            }],
                            "loc": {
                                "start": {
                                    "cursor": 24,
                                    "column": 12,
                                    "line": 1
                                },
                                "end": {
                                    "cursor": 46,
                                    "column": 13,
                                    "line": 3
                                }
                            },
                            "complexity": {
                                "cyclomatic": {
                                    "cycles": 1
                                },
                                "halstead": {
                                    "operands": {
                                        "_func": true
                                    },
                                    "operators": {
                                        "_(": true,
                                        "_)": true,
                                        "_{": true,
                                        "_}": true
                                    },
                                    "distinctOperators": 4,
                                    "distinctOperands": 1,
                                    "totalOperators": 4,
                                    "totalOperands": 1,
                                    "programVocab": 5,
                                    "programLength": 5,
                                    "calculatedProgramLength": 8,
                                    "volume": 11.60964047443681,
                                    "difficulty": 2,
                                    "effort": 23.21928094887362,
                                    "timeRequiredSeconds": 1.289960052715201,
                                    "numberDeliveredBugs": 0.0038698801581456034
                                }
                            }
                        }
                    }
                }
            },
            "complexity": {
                "halstead": {
                    "operands": {
                        "_test": true,
                        "_func": true
                    },
                    "operators": {
                        "_{": true,
                        "_}": true,
                        "_(": true,
                        "_)": true
                    },
                    "distinctOperators": 4,
                    "distinctOperands": 2,
                    "totalOperators": 10,
                    "totalOperands": 3,
                    "programVocab": 6,
                    "programLength": 13,
                    "calculatedProgramLength": 10,
                    "volume": 33.60451250937503,
                    "difficulty": 3,
                    "effort": 100.81353752812508,
                    "timeRequiredSeconds": 5.600752084895838,
                    "numberDeliveredBugs": 0.011201504169791677
                }
            }
        })
    });
    it('Function redeclaration ', () => {
        expect(Evaluate(`function test(){}
        function test(){}
        `).analysis).toEqual({
            "functions": {
                "_test": {
                    "name": "test",
                    "problems": [{
                        "type": "Redefinition",
                        "message": "Function redefined",
                        "loc": {
                            "start": {
                                "cursor": 26,
                                "column": 8,
                                "line": 1
                            },
                            "end": {
                                "cursor": 43,
                                "column": 25,
                                "line": 1
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
                            "cursor": 17,
                            "column": 17,
                            "line": 0
                        }
                    },
                    "complexity": {
                        "cyclomatic": {
                            "cycles": 1
                        },
                        "halstead": {
                            "operands": {
                                "_test": true
                            },
                            "operators": {
                                "_(": true,
                                "_)": true,
                                "_{": true,
                                "_}": true
                            },
                            "distinctOperators": 4,
                            "distinctOperands": 1,
                            "totalOperators": 4,
                            "totalOperands": 1,
                            "programVocab": 5,
                            "programLength": 5,
                            "calculatedProgramLength": 8,
                            "volume": 11.60964047443681,
                            "difficulty": 2,
                            "effort": 23.21928094887362,
                            "timeRequiredSeconds": 1.289960052715201,
                            "numberDeliveredBugs": 0.0038698801581456034
                        }
                    }
                }
            },
            "classes": {},
            "complexity": {
                "halstead": {
                    "operands": {
                        "_test": true
                    },
                    "operators": {
                        "_(": true,
                        "_)": true,
                        "_{": true,
                        "_}": true
                    },
                    "distinctOperators": 4,
                    "distinctOperands": 1,
                    "totalOperators": 8,
                    "totalOperands": 2,
                    "programVocab": 5,
                    "programLength": 10,
                    "calculatedProgramLength": 8,
                    "volume": 23.21928094887362,
                    "difficulty": 4,
                    "effort": 92.87712379549448,
                    "timeRequiredSeconds": 5.159840210860804,
                    "numberDeliveredBugs": 0.007739760316291207
                }
            }
        })
    });
    it('Cycles simple ', () => {
        expect(Evaluate(`function test(){
            if(a == b){
                
            }
        }`).analysis.functions._test.complexity.cyclomatic.cycles).toEqual(2)
    });
    it('Cycles with return', () => {
        expect(Evaluate(`function test(){
            return true;
            if(a == b){
                
            }
        }`).analysis.functions._test.complexity.cyclomatic.cycles).toEqual(1)
    });
    it('Cycle with loop ', () => {
        expect(Evaluate(`function test(){
            if(a == b){
                while(a < b){
                    a+=1;
                }
            }
        }`).analysis.functions._test.complexity.cyclomatic.cycles).toEqual(3)
    });
    it('Cycle with return inside block ', () => {
        expect(Evaluate(`function test(){
            if(a == b){
                return false;
                while(a < b){
                    a+=1;
                }
            }
        }`).analysis.functions._test.complexity.cyclomatic.cycles).toEqual(2)
    });
    it('Halstead for do while ', () => {
        expect(Evaluate(`do{
            
        }while(true)`).analysis.complexity.halstead).toEqual(

            {
                "operands": {},
                "operators": {
                    "_while": true,
                    "_do": true,
                    "_(": true,
                    "_)": true,
                    "_true": true,
                    "_{": true,
                    "_}": true
                },
                "distinctOperators": 7,
                "distinctOperands": 0,
                "totalOperators": 7,
                "totalOperands": 0,
                "programVocab": 7,
                "programLength": 7,
                "calculatedProgramLength": 0,
                "volume": 19.651484454403228,
                "difficulty": 0,
                "effort": 0,
                "timeRequiredSeconds": 0,
                "numberDeliveredBugs": 0.00655049481813441
            }
        )
    });
    it('Halstead for statement ', () => {
        expect(Evaluate(`for(let x=0; x<1; x+=1){}`).analysis.complexity.halstead).toEqual(

            {
                "operands": {
                    "_x": true,
                    "_0": true,
                    "_1": true
                },
                "operators": {
                    "_for": true,
                    "_(": true,
                    "_)": true,
                    "_;": true,
                    "_<": true,
                    "_+=": true,
                    "_{": true,
                    "_}": true
                },
                "distinctOperators": 8,
                "distinctOperands": 3,
                "totalOperators": 9,
                "totalOperands": 6,
                "programVocab": 11,
                "programLength": 15,
                "calculatedProgramLength": 28.75488750216347,
                "volume": 51.89147427955946,
                "difficulty": 8,
                "effort": 415.1317942364757,
                "timeRequiredSeconds": 23.062877457581983,
                "numberDeliveredBugs": 0.017297158093186486
            }
        )
    });
    it('Halstead variable statement ', () => {
        expect(Evaluate(`let x = 0, y = 1;`).analysis.complexity.halstead).toEqual(

            {
                "operands": {
                    "_x": true,
                    "_0": true,
                    "_,": true,
                    "_y": true,
                    "_1": true
                },
                "operators": {},
                "distinctOperators": 0,
                "distinctOperands": 5,
                "totalOperators": 0,
                "totalOperands": 5,
                "programVocab": 5,
                "programLength": 5,
                "calculatedProgramLength": 0,
                "volume": 11.60964047443681,
                "difficulty": 0,
                "effort": 0,
                "timeRequiredSeconds": 0,
                "numberDeliveredBugs": 0.0038698801581456034
            }
        )
    });
    it('Halstead unary expression ', () => {
        expect(Evaluate(`!x`).analysis.complexity.halstead).toEqual(

            {
                "operands": {
                    "_x": true
                },
                "operators": {
                    "_!": true
                },
                "distinctOperators": 1,
                "distinctOperands": 1,
                "totalOperators": 1,
                "totalOperands": 1,
                "programVocab": 2,
                "programLength": 2,
                "calculatedProgramLength": 0,
                "volume": 2,
                "difficulty": 0.5,
                "effort": 1,
                "timeRequiredSeconds": 0.05555555555555555,
                "numberDeliveredBugs": 0.0006666666666666666
            }
        )
    });
    it('Halstead function call ', () => {
        expect(Evaluate(`test(a,b,c);`).analysis.complexity.halstead).toEqual(

            {
                "operands": {
                    "_test": true,
                    "_a": true,
                    "_b": true,
                    "_c": true
                },
                "operators": {
                    "_(": true,
                    "_)": true,
                    "_,": true
                },
                "distinctOperators": 3,
                "distinctOperands": 4,
                "totalOperators": 4,
                "totalOperands": 4,
                "programVocab": 7,
                "programLength": 8,
                "calculatedProgramLength": 12.754887502163468,
                "volume": 22.458839376460833,
                "difficulty": 1.5,
                "effort": 33.68825906469125,
                "timeRequiredSeconds": 1.871569948038403,
                "numberDeliveredBugs": 0.007486279792153611
            }
        )
    });
    it('Member un-computed ', () => {
        expect(Evaluate(`test.test`).analysis.complexity.halstead).toEqual(

            {
                "operands": {
                    "_test": true
                },
                "operators": {
                    "_.": true
                },
                "distinctOperators": 1,
                "distinctOperands": 1,
                "totalOperators": 1,
                "totalOperands": 2,
                "programVocab": 2,
                "programLength": 3,
                "calculatedProgramLength": 0,
                "volume": 3,
                "difficulty": 1,
                "effort": 3,
                "timeRequiredSeconds": 0.16666666666666666,
                "numberDeliveredBugs": 0.001
            }
        )
    });
    it('Member computed halstead ', () => {
        expect(Evaluate(`test[0];`).analysis.complexity.halstead).toEqual(

            {
                "operands": {
                    "_test": true,
                    "_0": true
                },
                "operators": {
                    "_[": true,
                    "_]": true
                },
                "distinctOperators": 2,
                "distinctOperands": 2,
                "totalOperators": 2,
                "totalOperands": 2,
                "programVocab": 4,
                "programLength": 4,
                "calculatedProgramLength": 4,
                "volume": 8,
                "difficulty": 1,
                "effort": 8,
                "timeRequiredSeconds": 0.4444444444444444,
                "numberDeliveredBugs": 0.0026666666666666666
            }
        )
    });
    it('New expression halstead ', () => {
        expect(Evaluate(`new Test(1,0);`).analysis.complexity.halstead).toEqual(

            {
                "operands": {
                    "_Test": true,
                    "_1": true,
                    "_0": true
                },
                "operators": {
                    "_new": true,
                    "_,": true
                },
                "distinctOperators": 2,
                "distinctOperands": 3,
                "totalOperators": 2,
                "totalOperands": 3,
                "programVocab": 5,
                "programLength": 5,
                "calculatedProgramLength": 6.754887502163468,
                "volume": 11.60964047443681,
                "difficulty": 1,
                "effort": 11.60964047443681,
                "timeRequiredSeconds": 0.6449800263576005,
                "numberDeliveredBugs": 0.0038698801581456034
            }
        )
    });
    it('Array expression halstead ', () => {
        expect(Evaluate(`[0,1,2]`).analysis.complexity.halstead).toEqual(

            {
                "operands": {
                    "_0": true,
                    "_1": true,
                    "_2": true
                },
                "operators": {
                    "_[": true,
                    "_]": true,
                    "_,": true
                },
                "distinctOperators": 3,
                "distinctOperands": 3,
                "totalOperators": 4,
                "totalOperands": 3,
                "programVocab": 6,
                "programLength": 7,
                "calculatedProgramLength": 9.509775004326936,
                "volume": 18.094737505048094,
                "difficulty": 1.5,
                "effort": 27.14210625757214,
                "timeRequiredSeconds": 1.5078947920873411,
                "numberDeliveredBugs": 0.006031579168349364
            }
        )
    });
    it('Super expression halstead ', () => {
        expect(Evaluate(`super();`).analysis.complexity.halstead).toEqual(

            {
                "operands": {},
                "operators": {
                    "_super": true,
                    "_(": true,
                    "_)": true
                },
                "distinctOperators": 3,
                "distinctOperands": 0,
                "totalOperators": 3,
                "totalOperands": 0,
                "programVocab": 3,
                "programLength": 3,
                "calculatedProgramLength": 0,
                "volume": 4.754887502163468,
                "difficulty": 0,
                "effort": 0,
                "timeRequiredSeconds": 0,
                "numberDeliveredBugs": 0.001584962500721156
            }
        )
    });
    it('Null literal halstead ', () => {
        expect(Evaluate(`let test = null;`).analysis.complexity.halstead).toEqual(

            {
                "operands": {
                    "_test": true
                },
                "operators": {
                    "_null": true
                },
                "distinctOperators": 1,
                "distinctOperands": 1,
                "totalOperators": 1,
                "totalOperands": 1,
                "programVocab": 2,
                "programLength": 2,
                "calculatedProgramLength": 0,
                "volume": 2,
                "difficulty": 0.5,
                "effort": 1,
                "timeRequiredSeconds": 0.05555555555555555,
                "numberDeliveredBugs": 0.0006666666666666666
            }
        )
    });
    it('String literal halstead ', () => {
        expect(Evaluate(`let test = "haha";`).analysis.complexity.halstead).toEqual(

            {
                "operands": {
                    "_test": true,
                    "_\"haha\"": true
                },
                "operators": {},
                "distinctOperators": 0,
                "distinctOperands": 2,
                "totalOperators": 0,
                "totalOperands": 2,
                "programVocab": 2,
                "programLength": 2,
                "calculatedProgramLength": 0,
                "volume": 2,
                "difficulty": 0,
                "effort": 0,
                "timeRequiredSeconds": 0,
                "numberDeliveredBugs": 0.0006666666666666666
            }
        )
    });
    it('Super class halstead ', () => {
        expect(Evaluate(`class cat extends animal{

        }`).analysis.complexity.halstead).toEqual(

            {
                "operands": {
                    "_cat": true,
                    "_animal": true
                },
                "operators": {
                    "_extends": true,
                    "_{": true,
                    "_}": true
                },
                "distinctOperators": 3,
                "distinctOperands": 2,
                "totalOperators": 3,
                "totalOperands": 2,
                "programVocab": 5,
                "programLength": 5,
                "calculatedProgramLength": 6.754887502163468,
                "volume": 11.60964047443681,
                "difficulty": 1.5,
                "effort": 17.414460711655217,
                "timeRequiredSeconds": 0.9674700395364009,
                "numberDeliveredBugs": 0.0038698801581456034
            }
        )
    });
});