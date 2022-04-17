export default class ParseSyntaxError extends SyntaxError {
    constructor(message, token) {
        super(message)
        this.token = token;
    }
}