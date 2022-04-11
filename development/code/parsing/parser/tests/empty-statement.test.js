import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [`;`, {
        type: "Program",
        body: [{
            type: "EmptyStatement",
            loc: {
                start: {
                    column: 0,
                    cursor: 0,
                    line: 0
                },
                end: {
                    column: 1,
                    cursor: 1,
                    line: 0
                }
            }
        }]
    }]

]




const parser = new Parser()
describe('Testing empty statement', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})