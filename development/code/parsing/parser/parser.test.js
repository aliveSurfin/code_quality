import Parser from "./Parser";

const parser = new Parser()
const source = `test == true && test == false;`
describe('Testing Testing', () => {
    it('Parser Returns 1', () => {
        const ast = parser.parse(source)
        console.log(JSON.stringify(ast, null, 2));
        console.log(parser.tokenizer.comments)
    });
});