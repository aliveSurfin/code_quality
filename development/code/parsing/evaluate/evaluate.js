/**
 * @module Evaluate
 */
import Parser from "../parser/Parser.js";

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

    return { source, ast }
}

export default Evaluate