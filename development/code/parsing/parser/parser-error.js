/**
 * @module Parser
 */
/**
 * @class ParseSyntaxError
 * SyntaxError that contains a token for further evaluation
 */
class ParseSyntaxError extends SyntaxError {

    /**
     * 
     * @param {String} message - Takes Error Message as per usual
     * @param {Object} token - Token 
     */
    constructor(message, token) {
        super(message)
        this.token = token;
    }
}

export default ParseSyntaxError