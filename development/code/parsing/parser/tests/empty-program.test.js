import Parser from "../Parser"
// table of tests [program,expectedOutput]
const testTable = [
    [``, {
        "type": "Program",
        "body": []
    }]

]




const parser = new Parser()
describe('Testing empty program ', () => {
    describe.each(testTable)('parsing %s', ((program, expected) => {

        test(`returns ${JSON.stringify(expected)}`, () => {
            expect(parser.parse(program)).toEqual(expected)
        })
    }))

})