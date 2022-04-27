import AST_TYPES from "../../parser/AST_CONST_TYPES.js";
/**
 * @module Evaluate
 */

/**
 * Perform Halstead Complexity on AST node
 */
class HalsteadComplexity {
    constructor() {}

    /**
     * Main entry function to calculate halstead complexity
     * @param {Object} node - AST Node 
     * @returns {Object} {operands,operators,distinctOperators,
     * distinctOperands,totalOperators,totalOperands,programVocab,
     * programLength,calculatedProgramLength,volume,difficulty,
     * effort,timeRequiredSeconds,numberDeliveredBugs,}
     */
    calculate(node) {
        this.operators = {}
        this.operands = {}
        this.distinctOperators = 0;
        this.distinctOperands = 0;
        this.totalOperators = 0;
        this.totalOperands = 0;
        this.cycle(node)
        return this.opsToComplexity(this.distinctOperators, this.distinctOperands, this.totalOperators, this.totalOperands)
    }

    /**
     * Take operands and operators and calculate complexity measures
     * @param {Number} distinctOperators - distinct operators
     * @param {Number} distinctOperands - distinct operands
     * @param {Number} totalOperators - total operators
     * @param {Number} totalOperands - total operands
     * @returns {Object} {operands,operators,distinctOperators,
     * distinctOperands,totalOperators,totalOperands,programVocab,
     * programLength,calculatedProgramLength,volume,difficulty,
     * effort,timeRequiredSeconds,numberDeliveredBugs,}
     */
    opsToComplexity(distinctOperators, distinctOperands, totalOperators, totalOperands) {
        this.programVocab = distinctOperands + distinctOperators;
        this.programLength = totalOperands + totalOperators;
        this.calculatedProgramLength = (distinctOperands * Math.log2(distinctOperands)) + (distinctOperators * Math.log2(distinctOperators))
        this.volume = this.programLength * Math.log2(this.programVocab)
        this.difficulty = (distinctOperators / 2) * (totalOperands / distinctOperands)
        this.effort = this.difficulty * this.volume;
        this.timeRequiredSeconds = this.effort / 18;
        this.numberDeliveredBugs = this.volume / 3000;
        return {
            operands: this.operands,
            operators: this.operators,
            distinctOperators,
            distinctOperands,
            totalOperators,
            totalOperands,
            programVocab: this.programVocab ? this.programVocab : 0,
            programLength: this.programLength ? this.programLength : 0,
            calculatedProgramLength: this.calculatedProgramLength ? this.calculatedProgramLength : 0,
            volume: this.volume ? this.volume : 0,
            difficulty: this.difficulty ? this.difficulty : 0,
            effort: this.effort ? this.effort : 0,
            timeRequiredSeconds: this.timeRequiredSeconds ? this.timeRequiredSeconds : 0,
            numberDeliveredBugs: this.numberDeliveredBugs ? this.numberDeliveredBugs : 0,
        }
    }

    /**
     * safely add ident to operands by prepending with "_"
     * @param {String} ident - operand
     */
    addIdentToOperands(ident) {
        if (!(`_${ident}` in this.operands)) {
            this.distinctOperands++;
            this.operands[`_${ident}`] = true;
        }
        this.totalOperands++;
    }

    /**
     * safely add ident to operator by prepending with "_"
     * @param {String} input - operator
     */
    addToOperators(input) {
        if (!(`_${input}` in this.operators)) {
            this.distinctOperators++;
            this.operators[`_${input}`] = true;
        }
        this.totalOperators++;
    }

    /**
     * Recursive function to cycle through nodes
     * @param {Object} node - AST node 
     */
    cycle(node) {
        if (node == null) {
            return
        }

        switch (node.type) {
            case AST_TYPES.Program:
                node.body.forEach((e) => {
                    this.cycle(e)
                })
                break;
            case AST_TYPES.BlockStatement:
                this.addToOperators('{')
                this.addToOperators('}')
                node.body.forEach((e) => {
                    this.cycle(e)
                })
                break;
            case AST_TYPES.Identifier:
                this.addIdentToOperands(node.name)
                break;
            case AST_TYPES.ReturnStatement:
                this.cycle(node.argument)
                break;
            case AST_TYPES.WhileStatement:
                this.addToOperators('while')
                this.addToOperators('(')
                this.addToOperators(')')
                this.cycle(node.test)
                this.cycle(node.body)
                break;
            case AST_TYPES.DoWhileStatement:
                this.addToOperators('while')
                this.addToOperators('do')
                this.addToOperators('(')
                this.addToOperators(')')
                this.cycle(node.test)
                this.cycle(node.body)
                break;
            case AST_TYPES.IfStatement:
                this.cycle(node.test)
                this.cycle(node.consequent)
                this.cycle(node.alternate)
                break;
            case AST_TYPES.ExpressionStatement:
                this.cycle(node.expression)
                break;
            case AST_TYPES.ForStatement:
                this.addToOperators('for')
                this.addToOperators('(')
                this.addToOperators(')')
                this.addToOperators(';')
                this.addToOperators(';')
                this.cycle(node.init)
                this.cycle(node.test)
                this.cycle(node.update)
                this.cycle(node.body)
                break;
            case AST_TYPES.VariableStatement:
                node.declarations.forEach((e, i) => {
                    this.cycle(e)
                    if ((i + 1) < node.declarations.length) {
                        this.addIdentToOperands(',')
                    }
                })
                break;

            case AST_TYPES.LogicalExpression:
            case AST_TYPES.EqualityExpression:
            case AST_TYPES.AssignmentExpression:
            case AST_TYPES.BinaryExpression:
                this.cycle(node.left)
                this.addToOperators(node.operator.value)
                this.cycle(node.right)
                break;
            case AST_TYPES.UnaryExpression:
                this.addToOperators(node.operator.value)
                this.cycle(node.argument)
                break;
            case AST_TYPES.CallExpression:
                this.cycle(node.callee)
                this.addToOperators('(')
                this.addToOperators(')')
                node.arguments.forEach((e, i) => {
                    this.cycle(e)
                    if ((i + 1) < node.arguments.length) {
                        this.addToOperators(',')
                    }
                })
                break;
            case AST_TYPES.MemberExpression:
                this.cycle(node.object)
                this.cycle(node.property)
                if (node.computed) {
                    this.addToOperators('[')
                    this.addToOperators(']')
                } else {
                    this.addToOperators('.')
                }
                break;
            case AST_TYPES.NewExpression:
                this.addToOperators('new')
                this.cycle(node.callee)
                node.arguments.list.forEach((e, i) => {
                    this.cycle(e)
                    if ((i + 1) < node.arguments.list.length) {
                        this.addToOperators(',')
                    }
                })
                break;
            case AST_TYPES.ArrayExpression:
                this.addToOperators('[')
                this.addToOperators(']')
                node.elements.forEach((e, i) => {
                    this.cycle(e)
                    if ((i + 1) < node.elements.length) {
                        this.addToOperators(',')
                    }
                })
                break;
            case AST_TYPES.Super:
                this.addToOperators('super')
                break;
            case AST_TYPES.BooleanLiteral:
                this.addToOperators(node.value.toString())
                break;
            case AST_TYPES.NullLiteral:
                this.addToOperators('null')
                break;
            case AST_TYPES.NumericLiteral:
                this.addIdentToOperands(node.value.toString())
                break;
            case AST_TYPES.StringLiteral:
                this.addIdentToOperands(`"${node.value}"`)
            case AST_TYPES.VariableDeclaration:
                this.cycle(node.id)
                this.cycle(node.init)
                break;
            case AST_TYPES.FunctionDeclaration:
                this.addIdentToOperands(node.name.name)
                this.addToOperators('(')
                this.addToOperators(')')
                node.params.forEach((e) => {
                    this.cycle(e)
                })
                this.cycle(node.body)
                break;
            case AST_TYPES.ClassDeclaration:
                this.addIdentToOperands(node.id.name)
                if (node.superClass) {
                    this.addToOperators('extends')
                    this.addIdentToOperands(node.superClass.name)
                }
                this.addToOperators('{')
                this.addToOperators('}')
                node.body.forEach((e) => { this.cycle(e) })
                break;

            default:
                return

        }
    }
}

export default HalsteadComplexity;