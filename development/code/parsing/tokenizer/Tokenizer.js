/**
 * @module Tokenizer
 */
import TOKEN_SPEC from './tokenHierarchy.js'
import TOKEN_TYPES from './TOKEN_CONST_TYPES.js';
import ParseSyntaxError from '../parser/parser-error.js';
/**
 * @class Tokenizer
 * Tokenizer class
 */
class Tokenizer {

    /**
     * Set parse values to default 
     * 
     * source input
     * cursor location
     * col location
     * comments 
     * 
     * @param {String} input - input source code
     */
    /* istanbul ignore next */
    constructor(input = "") {
        this.source = input;
        this.cursor = 0;
        this.col = 0;
        this.comments = [];
    }

    /**
     * Set parse values to default 
     * 
     * source input
     * cursor location
     * col location
     * comments 
     * 
     */
    update(input) {
        this.source = input;
        this.cursor = 0;
        this.col = 0;
        this.line = 0;
        this.comments = [];
    }

    /**
     * Are we at the end of the source string ?
     * @returns {Boolean} yes/no at end of source string
     */
    isEOF() {
        /* istanbul ignore next */
        return this.cursor === this.source.length;
    }

    /**
     * Helper Func to get current location object
     * @returns {Object} Location = cursor : column : line
     */
    position() {
        return {
            cursor: this.cursor,
            column: this.col,
            line: this.line,
        }
    }

    /**
     * Are there any more tokens left in the source string
     * 
     * @returns {Boolean} yes/no tokens left
     */
    hasMoreTokens() {
        return this.cursor < this.source.length;
    }

    /**
     * Find match in string and increment cursor by the length of the match
     * 
     * @param {RegExp} reg - RegularExpression
     * @param {String} str - String to match on
     * @returns {null|String} null if no match | String of token if matched
     */
    matchRegExp(reg, str) {
        const matched = reg.exec(str)
        if (matched == null) {
            return null
        }
        this.incCursor(matched[0].length)
        return matched[0]
    }

    /**
     * Increment the cursor and the column by an int
     * @param {Number} length the length to increment by 
     */
    incCursor(length) {
        this.cursor += length
        this.col += length;
    }

    /**
     * Iterate over a multi line token and track column and lines
     * @param {String} tokenValue - the multiline token 
     */
    handleMultiLine(tokenValue) {
        this.col -= tokenValue.length; // remove cursor inc on col
        tokenValue.split("").forEach(ch => {
            if (/\r\n|\r|\n/.exec(ch) != null) {
                this.line++;
                this.col = 0;
            } else {
                this.col++;
            }
        }); // a very hacky way to handle all cases of multilines
    }

    /**
     * Main Tokenizer function
     * 
     * Match from cursor location in source string to token hierarchy and return appropriate token
     * @throws {ParseSyntaxError} - throws error when unmatched token found
     * @returns {Object} Token
     */
    next() {
        if (!this.hasMoreTokens()) {
            return { type: TOKEN_TYPES.EOF, loc: { start: this.position(), end: this.position() } }
        }
        const cur = this.source.slice(this.cursor)
        const pos = this.position() // cache the position before matching/advancing

        for (const [regExp, type] of TOKEN_SPEC) {

            const tokenValue = this.matchRegExp(regExp, cur)

            // we didn't find a matching token
            if (tokenValue == null) {
                continue
            }

            if (type === TOKEN_TYPES.NEWLINE) {
                this.line++;
                this.col = 0;
            }
            // " ", "\t"
            if (type === TOKEN_TYPES.WHITESPACE) {
                if (/^\t/.exec(tokenValue) != null) { // 4 spaces for a tab
                    this.col += 3; // 1 eaten already
                }
                return this.next()
            }
            if (type === TOKEN_TYPES.SINGLE_LINE_COMMENT) {
                this.comments.push({
                    type,
                    value: tokenValue.slice(2), // remove "//"
                    loc: { start: pos, end: this.position() }
                })
                return this.next()
            }
            if (type === TOKEN_TYPES.MULTI_LINE_COMMENT) {
                this.handleMultiLine(tokenValue)
                this.comments.push({
                    type,
                    value: tokenValue.slice(2, -2),
                    loc: { start: pos, end: this.position() }
                })
                return this.next()
            }
            if (type === TOKEN_TYPES.MULTI_LINE_STRING) {
                this.handleMultiLine(tokenValue)
                type = TOKEN_TYPES.STRING; // we've handled the multilines so just treat as a string
            }
            return {
                type: type,
                value: tokenValue,
                loc: { start: pos, end: this.position() },
            }
        }

        throw new ParseSyntaxError(`Unexpected token: "${cur[0]}" at position: ${JSON.stringify(this.position()).toString()}`, { type: "Unknown", value: cur[0], loc: pos })
    }


}

export default Tokenizer