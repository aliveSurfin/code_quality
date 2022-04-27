/**
 * @module Evaluate
 */
import AST_TYPES from "../parser/AST_CONST_TYPES.js";
import Parser from "../parser/Parser.js";
import CyclomaticComplexity from "./complexity/cyclomatic.js";
import HalsteadComplexity from "./complexity/halstead.js";
/**
 * Function to call parser on source code and analyse with analyser
 * @param {String} source - source code to evaluate
 * @returns {Object} {source, ast, analysis} - object with source-code , abstract syntax tree and analysis object
 * @returns {Object} {source, error} - object with source code and error object
 */
function Evaluate(source) {
    const parser = new Parser()

    let ast = null
    let error = null
    try {
        ast = parser.parse(source)
    } catch (e) {
        error = { message: e.message, token: e.token }
    }
    if (error != null) {
        return { source, error }
    }
    const crawler = new TreeCrawler(ast)
    return { source, ast, analysis: crawler }
}
/**
 * Crawl and Perform analysis on Abstract Syntax Tree
 */
class TreeCrawler {
    /**
     * Takes AST and performs function, class and complexity analysis on it
     * @param {Object} ast AbstractSyntaxTree object 
     * @returns {Object} {functions,classes,complexity}: object which contains analysis
     */
    constructor(ast) {
        this.ast = ast;
        this.functions = {}
        this.classes = {}
        this.crawl(this.ast)
        this.checkClasses()
        let halstead = new HalsteadComplexity().calculate(this.ast)
        return {
            functions: this.functions,
            classes: this.classes,
            complexity: {
                halstead
            }
        }
    }

    /**
     * Checks classes for errors
     */
    checkClasses() {
        Object.keys(this.classes).forEach((key) => {
            let methodcount = Object.keys(this.classes[key].functions).length;
            let problems = []
            if (methodcount > 20) {
                problems.push({ type: "Methods In Class", message: `${methodcount} methods in class, try to get this less than 20`, loc: this.classes[key].loc })
            }
            let DIT = 0;
            let superClass = this.classes[key].superClass
            while (superClass in this.classes) {
                if (superClass === this.classes[superClass].superClass) {
                    this.classes[superClass].problems.push({
                        type: "Self inheritance",
                        message: `Class inherits from itself`,
                        loc: this.classes[superClass].loc
                    })
                    DIT = 0;
                    break;
                }
                DIT++;
                superClass = this.classes[superClass].superClass
            }
            if (DIT > 5) {
                problems.push({ type: "Inheritance Tree", message: `Inheritance depth of ${DIT}, try to get this to less than 6`, loc: this.classes[key].loc })
            }
            this.classes[key].problems.push(...problems)
        })
    }

    /**
     * Crawl through AST node to find functions and classes
     * @param {Object} current - current AST node
     */
    crawl(current) {
        switch (current.type) {
            case AST_TYPES.BlockStatement:
                current.body.forEach((e) => { this.crawl(e) })
            case AST_TYPES.Program:
                current.body.forEach((e) => { this.crawl(e) })
                break;
            case AST_TYPES.ClassDeclaration:
                this.parseClasses(current)
                current.body.forEach((e) => { this.funcs(e, current.id.name) })
                break;
            case AST_TYPES.FunctionDeclaration:
                this.funcs(current)
                this.crawl(current.body)
                break;
            default:
        }
    }

    /**
     * Adds class node to found classes and checks for redefinition
     * @param {Object} node class node 
     */
    parseClasses(node) {
        let name = node.id.name
        if (`_${name}` in this.classes) {
            this.classes[`_${name}`].problems.push({ type: "Redefinition", message: `Class redefined`, loc: node.loc })
            return
        }

        this.classes[`_${name}`] = { name, problems: [], loc: node.loc, functions: {}, superClass: node.superClass ? `_${node.superClass.name}` : null, childClasses: 0 }
    }

    /**
     * Add function to found functions
     * @param {Object} node 
     * @param {null|String} classIdent - is the function from a class 
     */
    funcs(node, classIdent = null) {

        let name = node.name.name
        let problems = []
        if (node.params.length >= 3) {
            problems.push({ type: "Params", message: `Function has ${node.params.length} parameters, attempt to refactor this` })
        }
        let cyclomatic = new CyclomaticComplexity(node)
        let halstead = new HalsteadComplexity().calculate(node)
        let lines = node.loc.end.line - node.loc.start.line
        if (lines >= 20) {
            problems.push({ type: "Lines", message: `This function has too many lines, attempt to refactor into smaller functions` })
        }

        if (classIdent != null) {
            if (`_${name}` in this.classes[`_${classIdent}`].functions) {
                this.classes[`_${classIdent}`].functions[`_${name}`].problems.push({ type: "Redefinition", message: `Function redefined`, loc: node.loc })
            } else {
                this.classes[`_${classIdent}`].functions[`_${name}`] = { name, problems, loc: node.loc, complexity: { cyclomatic, halstead } }
            }
        } else {
            if (`_${name}` in this.functions) {
                this.functions[`_${name}`].problems.push({ type: "Redefinition", message: `Function redefined`, loc: node.loc })
            } else {
                this.functions[`_${name}`] = { name, problems, loc: node.loc, complexity: { cyclomatic, halstead } }
            }
        }

    }

}
export default Evaluate