import AST_TYPES from "../../parser/AST_CONST_TYPES.js";
/**
 * @module Evaluate
 */

/**
 * Perform cyclomatic complexity on an AST node
 */
class CyclomaticComplexity {
    /**
     * Take AST node and start cycling
     * @param {Object} node - AST node 
     */
    constructor(node) {
            this.cycles = 1;
            for (let i = 0; i < node.body.body.length; i++) {
                let cur = node.body.body[i]
                if (this.cycle(cur) === "STOP") {
                    break;
                }
            }

        }
        /**
         * Recursive func to cycle through node
         * @param {Object} node - AST node 
         * @returns {undefined|"STOP"} Returns stop if hit return statement to stop cycling
         */
    cycle(node) {
        if (node == null) {
            return
        }
        switch (node.type) {
            case AST_TYPES.ReturnStatement:
                return "STOP"; // stop propagating 
            case AST_TYPES.WhileStatement:
            case AST_TYPES.ForStatement:
            case AST_TYPES.DoWhileStatement:
                this.cycles++;
                return this.cycle(node.body)
            case AST_TYPES.BlockStatement:
                for (let i = 0; i < node.body.length; i++) {
                    if (this.cycle(node.body[i]) === "STOP") {
                        return
                    }
                }
                break;
            case AST_TYPES.IfStatement:
                this.cycles++;
                this.cycle(node.consequent)
                this.cycle(node.alternate)
                break;
            default:
                return

        }
    }
}

export default CyclomaticComplexity;