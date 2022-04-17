const source = `3 = test`
import Evaluate from "./evaluate.js";


describe('Testing Testing', () => {
    it('Parser Returns 1', () => {
        console.log(JSON.stringify(Evaluate(source), null, 2));
    });
});