import HalsteadComplexity from "./halstead.js"
const source = `function test(){
    return false;
	if(test){
        return true;
	}else{
		while(test){
		}
	}
}`
let halstead = new HalsteadComplexity()
describe('Testing Halstead Complexity', () => {
    it(' example ops to complexity ', () => {
        expect(halstead.opsToComplexity(12, 7, 27, 15)).toEqual({
            "distinctOperators": 12,
            "distinctOperands": 7,
            "totalOperators": 27,
            "totalOperands": 15,
            "programVocab": 19,
            "programLength": 42,
            "calculatedProgramLength": 62.6710344630571,
            "volume": 178.41295556463058,
            "difficulty": 12.857142857142858,
            "effort": 2293.8808572595362,
            "timeRequiredSeconds": 127.43782540330757,
            "numberDeliveredBugs": 0.059470985188210194
        })
    });
});