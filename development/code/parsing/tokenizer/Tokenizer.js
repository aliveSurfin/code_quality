import TOKEN_SPEC from './tokenHierarchy.js'
import TOKEN_TYPES from './TOKEN_CONST_TYPES.js';

class Tokenizer {
    /* istanbul ignore next */
    constructor(input = "") {
        this.source = input;
        this.cursor = 0;
        this.col = 0;
        this.comments = [];
    }
    update(input) {
        this.source = input;
        this.cursor = 0;
        this.col = 0;
        this.line = 0;
        this.comments = [];
    }
    isEOF() {
        /* istanbul ignore next */
        return this.cursor === this.source.length;
    }
    position() {
        return {
            cursor: this.cursor,
            column: this.col,
            line: this.line,
        }
    }
    hasMoreTokens() {
        return this.cursor < this.source.length;
    }
    matchRegExp(reg, str) {
        const matched = reg.exec(str)
        if (matched == null) {
            return null
        }
        this.incCursor(matched[0].length)
        return matched[0]
    }
    incCursor(length) {
        this.cursor += length
        this.col += length;
    }
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
    next() {
        if (!this.hasMoreTokens()) {
            return null
        }
        const cur = this.source.slice(this.cursor)
        for (const [regExp, type] of TOKEN_SPEC) {

            const pos = this.position() // cache the position before matching/advancing
            const tokenValue = this.matchRegExp(regExp, cur)

            // we didn't find a matching token
            if (tokenValue == null) {
                continue
            }
            // all whitespace tokens, " ", "\n", "\t"
            if (type === TOKEN_TYPES.WHITESPACE) {
                // advance line and reset col on newline char
                if (/\r\n|\r|\n/.exec(tokenValue) != null) {
                    this.line++;
                    this.col = 0;
                } else
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

        throw new SyntaxError(`Unexpected token: "${cur[0]}" at position: ${JSON.stringify(this.position()).toString()}`)
    }


}

export default Tokenizer