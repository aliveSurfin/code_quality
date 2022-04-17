import Tokenizer from "../tokenizer/Tokenizer.js"
import ASTNode from "./ASTNode/ASTNode.js";
import AST_TYPES from "./AST_CONST_TYPES.js";
import TOKEN_TYPES from "../tokenizer/TOKEN_CONST_TYPES.js";
import ParseSyntaxError from "./parser-error.js";
import { isLiteral, isValidAssignmentTarget, isAssignmentOperator, BooleanTypeToValue } from "./parser-helper.js"
class Parser {
    constructor(input = "") {
        this.source = input
        this.tokenizer = new Tokenizer(input)
    }

    parse(input) {
        this.source = input;
        this.tokenizer.update(this.source)
        this.lookahead = this.tokenizer.next();
        const ast = this.Program()
        if (this.tokenizer.comments.length) {
            ast.comments = this.tokenizer.comments
        }
        return ast
    }


    Program() {
        return {
            type: AST_TYPES.Program,
            body: this.StatementList()
        }
    }
    eat(type) {
        const token = this.lookahead;
        /* istanbul ignore next */
        if (token.type !== type) {
            throw new ParseSyntaxError(
                `Unexpected token "${token.value}" at ${JSON.stringify(this.tokenizer.position())}, expected: ${type}`, token)
        }
        this.goNext()
        return token;
    }
    goNext() {
        this.lookahead = this.tokenizer.next()
    }
    StatementList(stopLookingPast = null) {
        let list = this.addStatementIfNotNull([])
        while (this.lookahead.type !== TOKEN_TYPES.EOF && this.lookahead.type !== stopLookingPast) {
            list = this.addStatementIfNotNull(list)
        }
        return list
    }
    addStatementIfNotNull(list) {
        const statement = this.Statement()
        if (statement != null) {
            list.push(statement)
        }
        return list
    }
    Statement() {
        if (this.lookahead.type === TOKEN_TYPES.EOF) {
            return null
        }
        switch (this.lookahead.type) {
            case TOKEN_TYPES.SEMI_COLON:
                this.eat(TOKEN_TYPES.SEMI_COLON);
                return null;
            case TOKEN_TYPES.NEWLINE:
                this.eat(TOKEN_TYPES.NEWLINE);
                return null
            case TOKEN_TYPES.IF:
                return this.IfStatement();
            case TOKEN_TYPES.CURLY_OPEN:
                return this.BlockStatement();
            case TOKEN_TYPES.VARIABLE_DECLARATION:
                return this.VariableStatement();
            case TOKEN_TYPES.FUNCTION_DECLARATION:
                return this.FunctionDeclaration();
            case TOKEN_TYPES.CLASS:
                return this.ClassDeclaration();
            case TOKEN_TYPES.RETURN:
                return this.ReturnStatement();
            case TOKEN_TYPES.WHILE:
                return this.WhileStatement();
            case TOKEN_TYPES.DO:
                return this.DoWhileStatement();
            case TOKEN_TYPES.FOR:
                return this.ForStatement();
            default:
                return this.ExpressionStatement();

        }

    }
    ClassDeclaration() {
        const start = this.eat(TOKEN_TYPES.CLASS);
        const id = this.Identifier()
        const superClass = this.lookahead.type === TOKEN_TYPES.EXTENDS ? this.ClassExtends() : null;
        this.eat(TOKEN_TYPES.CURLY_OPEN)
        const body = this.lookahead.type === TOKEN_TYPES.CURLY_CLOSE ? [] : this.ClassBody()
        const end = this.eat(TOKEN_TYPES.CURLY_CLOSE)
        return {
            type: AST_TYPES.ClassDeclaration,
            id,
            superClass,
            body,
            loc: {
                start: start.loc.start,
                end: end.loc.end,
            }
        }

    }
    ClassExtends() {
        this.eat(TOKEN_TYPES.EXTENDS)
        return this.Identifier()
    }
    ClassBody() {
        // return a list of class functions
        let list = []
        do {
            if (this.lookahead.type === TOKEN_TYPES.NEWLINE) {
                this.goNext()

            } else {
                list.push(this.FunctionDeclaration(true))
            }
        } while (this.lookahead.type !== TOKEN_TYPES.CURLY_CLOSE)
        return list
    }
    FunctionDeclaration(ClassDeclaration = false) {
        let start;
        if (!ClassDeclaration) {
            start = this.eat(TOKEN_TYPES.FUNCTION_DECLARATION)
        }

        const name = this.Identifier()
        if (ClassDeclaration) {
            start = name;
        }
        this.eat(TOKEN_TYPES.PAREN_OPEN)

        const params = this.lookahead.type === TOKEN_TYPES.PAREN_CLOSE ? [] : this.ParameterList()
        this.eat(TOKEN_TYPES.PAREN_CLOSE)

        const body = this.BlockStatement()

        return {
            type: AST_TYPES.FunctionDeclaration,
            name,
            params,
            body,
            loc: {
                start: start.loc.start,
                end: body.loc.end,
            }
        }

    }
    ParameterList() {
        const params = [];

        do {
            params.push(this.Identifier());
        } while (this.lookahead.type === TOKEN_TYPES.COMMA && this.eat(TOKEN_TYPES.COMMA))

        return params
    }
    ReturnStatement() {
        const start = this.eat(TOKEN_TYPES.RETURN)
        const argument = (this.isEndOfStatementType(this.lookahead) || this.lookahead.type === TOKEN_TYPES.CURLY_CLOSE) ? null : this.Expression()
        let end = argument
        if (this.lookahead.type !== TOKEN_TYPES.CURLY_CLOSE) {
            end = this.eatEndOfStatement()
        }
        if (end == null) {
            end = start
        }

        return {
            type: AST_TYPES.ReturnStatement,
            argument,
            loc: {
                start: start.loc.start,
                end: end.loc.end,
            }
        }
    }
    WhileStatement() {
        const start = this.eat(TOKEN_TYPES.WHILE)
        this.eat(TOKEN_TYPES.PAREN_OPEN)
        const test = this.Expression()
        this.eat(TOKEN_TYPES.PAREN_CLOSE)
        const body = this.Statement()
        return {
            type: AST_TYPES.WhileStatement,
            test,
            body,
            loc: {
                start: start.loc.start,
                end: body.loc.end
            }
        }
    }
    ForStatement() {
        const start = this.eat(TOKEN_TYPES.FOR);
        this.eat(TOKEN_TYPES.PAREN_OPEN)
        const init = this.lookahead.type === TOKEN_TYPES.SEMI_COLON ? null : this.ForStatementInit()
        this.eat(TOKEN_TYPES.SEMI_COLON);
        const test = this.lookahead.type === TOKEN_TYPES.SEMI_COLON ? null : this.Expression()
        this.eat(TOKEN_TYPES.SEMI_COLON);
        const update = this.lookahead.type === TOKEN_TYPES.PAREN_CLOSE ? null : this.Expression()
        this.eat(TOKEN_TYPES.PAREN_CLOSE)

        const body = this.Statement()

        return {
            type: AST_TYPES.ForStatement,
            init: init ? init : null,
            test: test ? test : null,
            update: update ? update : null,
            body,
            loc: {
                start: start.loc.start,
                end: body.loc.end
            }
        }
    }

    ForStatementInit() {
        if (this.lookahead.type === TOKEN_TYPES.VARIABLE_DECLARATION) {
            return this.VariableStatementInit()
        }
        return this.Expression()
    }
    DoWhileStatement() {
        const start = this.eat(TOKEN_TYPES.DO)

        const body = this.Statement()
        this.eat(TOKEN_TYPES.WHILE)
        this.eat(TOKEN_TYPES.PAREN_OPEN)
        const test = this.Expression()
        const end = this.eat(TOKEN_TYPES.PAREN_CLOSE)
        return {
            type: AST_TYPES.DoWhileStatement,
            test,
            body,
            loc: {
                start: start.loc.start,
                end: end.loc.end
            }
        }
    }



    IfStatement() {
        const if_start = this.eat(TOKEN_TYPES.IF)
        const testStart = this.eat(TOKEN_TYPES.PAREN_OPEN)
        const test = this.Expression()
        const testEnd = this.eat(TOKEN_TYPES.PAREN_CLOSE)
        const consequent = this.Statement()
        let alternate = null;
        if (this.lookahead.type !== TOKEN_TYPES.EOF && this.lookahead.type === TOKEN_TYPES.ELSE) {
            this.eat(TOKEN_TYPES.ELSE)
            alternate = this.Statement()
        }
        return {
            type: AST_TYPES.IfStatement,
            test,
            consequent,
            alternate,
            loc: {
                start: if_start.loc.start,
                end: alternate == null ? consequent.loc.end : alternate.loc.end,
            }
        }
    }
    eatEndOfStatement() {

        // we eat newline safely, if no newline there MUST be a semi colon, which the error message for is more indicative
        try {
            return this.eat(TOKEN_TYPES.NEWLINE);
        } catch {
            try {
                return this.eat(TOKEN_TYPES.SEMI_COLON);
            } catch {
                return this.eat(TOKEN_TYPES.EOF);
            }
        }
    }

    VariableStatementInit() {
        const token = this.eat(TOKEN_TYPES.VARIABLE_DECLARATION);
        const declarations = this.VariableDeclarationList();
        return {
            type: AST_TYPES.VariableStatement,
            declarations,
            loc: {
                start: token.loc.start,
                end: declarations.length > 0 ? declarations[declarations.length - 1].loc.end : token.loc.end,
            }
        }
    }
    VariableStatement() {
        const token = this.eat(TOKEN_TYPES.VARIABLE_DECLARATION);
        const declarations = this.VariableDeclarationList();
        const end = this.eatEndOfStatement()
        return {
            type: AST_TYPES.VariableStatement,
            declarations,
            loc: {
                start: token.loc.start,
                end: end.loc.end,
            }
        }
    }

    VariableDeclarationList() {
        const declarations = []

        do {
            declarations.push(this.VariableDeclaration())

        } while (this.lookahead.type !== TOKEN_TYPES.EOF && this.lookahead.type === TOKEN_TYPES.COMMA && this.eat(TOKEN_TYPES.COMMA))

        return declarations
    }
    isEndOfStatementType(type) {
        return type === TOKEN_TYPES.SEMI_COLON || type === TOKEN_TYPES.NEWLINE;
    }
    VariableDeclaration() {
        const id = this.Identifier()
        const init = !this.isEndOfStatementType(this.lookahead.type) && this.lookahead.type !== TOKEN_TYPES.COMMA ?
            this.VariableInit() : null;
        const loc = {
            start: id.loc.start,
            end: init === null ? id.loc.end : init.loc.end,
        }
        return {
            type: AST_TYPES.VariableDeclaration,
            id,
            init,
            loc,
        }
    }

    VariableInit() {
        this.eat(TOKEN_TYPES.ASSIGNMENT_OPERATOR)
        return this.AssignmentExpression()
    }
    BlockStatement() {
        const start = this.eat(TOKEN_TYPES.CURLY_OPEN);
        // if the next token is a }, we have an empty block
        const blockBody = this.lookahead.type === TOKEN_TYPES.CURLY_CLOSE ? [] : this.StatementList(TOKEN_TYPES.CURLY_CLOSE);

        const end = this.eat(TOKEN_TYPES.CURLY_CLOSE)

        return {
            type: AST_TYPES.BlockStatement,
            body: blockBody,
            loc: {
                start: start.loc.start,
                end: end.loc.end,
            }
        }
    }
    ExpressionStatement() {
        const expression = this.Expression()
        this.eatEndOfStatement();
        //todo add end statement to end
        return {
            type: AST_TYPES.ExpressionStatement,
            expression
        }
    }
    Expression() {
        return this.AssignmentExpression()
    }
    AssignmentExpression() {
        const left = this.LogicalOrExpression()
        if (!isAssignmentOperator(this.lookahead.type)) {
            return left
        }

        let returnObj = {
            type: AST_TYPES.AssignmentExpression,
            operator: this.AssignmentOperator(),
            left: isValidAssignmentTarget(left),
            right: this.AssignmentExpression(),

        }
        returnObj.loc = {
            start: left.loc.start,
            end: returnObj.right.loc.end
        }
        return returnObj;
    }
    RelationalExpression() {
        let left = this.ArithmeticExpression()

        while (this.lookahead.type !== TOKEN_TYPES.EOF && this.lookahead.type === TOKEN_TYPES.RELATIONAL_OPERATOR) {
            const operator = this.eat(TOKEN_TYPES.RELATIONAL_OPERATOR)
            const right = this.ArithmeticExpression()
            left = {
                type: AST_TYPES.BinaryExpression,
                operator,
                left,
                right,
                loc: {
                    start: left.loc.start,
                    end: right.loc.end,
                }
            }
        }
        return left
    }
    LeftHandSideExpression() {
        return this.CallMemberExpression()
    }

    CallMemberExpression() {
        if (this.lookahead.type == TOKEN_TYPES.SUPER) {
            return this.CallExpression(this.Super())
        }
        const member = this.MemberExpression()

        if (this.lookahead.type === TOKEN_TYPES.PAREN_OPEN) {
            return this.CallExpression(member)
        }
        return member

    }
    CallExpression(callee) {
        let args = this.Arguments()
        let call = {
            type: AST_TYPES.CallExpression,
            callee,
            arguments: args.list,
            loc: { start: callee.loc.start, end: args.loc.end }
        }
        if (this.lookahead.type === TOKEN_TYPES.PAREN_OPEN) {
            call = this.CallExpression(call)
        }
        return call
    }
    Arguments() {
        let start = this.eat(TOKEN_TYPES.PAREN_OPEN)
        const argumentList = this.lookahead.type === TOKEN_TYPES.PAREN_CLOSE ? [] : this.ArgumentList();
        let end = this.eat(TOKEN_TYPES.PAREN_CLOSE)

        return {
            list: argumentList,
            loc: {
                start: start.loc.start,
                end: end.loc.end,
            }
        }
    }
    AddArgumentToListIfNotNull(list) {
        let exp = this.AssignmentExpression()
        if (exp != null) {
            list.push(exp)
        }
        return list
    }
    ArgumentList() {
        let list = []
        do {
            list = this.AddArgumentToListIfNotNull(list)
        } while (this.lookahead.type === TOKEN_TYPES.COMMA && this.eat(TOKEN_TYPES.COMMA))
        return list
    }
    MemberExpression() {
        let object = this.PrimaryExpression()
        while (this.lookahead.type === TOKEN_TYPES.DOT || this.lookahead.type === TOKEN_TYPES.SQUARE_OPEN) {
            if (this.lookahead.type === TOKEN_TYPES.DOT) {
                let dotStart = this.eat(TOKEN_TYPES.DOT);
                const property = this.Identifier()
                object = {
                    type: AST_TYPES.MemberExpression,
                    computed: false,
                    object,
                    property,
                    loc: {
                        start: object.loc.start,
                        end: property.loc.end,
                    }
                }

            }
            if (this.lookahead.type === TOKEN_TYPES.SQUARE_OPEN) {
                let sqStart = this.eat(TOKEN_TYPES.SQUARE_OPEN);
                const property = this.Expression()
                let sqEnd = this.eat(TOKEN_TYPES.SQUARE_CLOSE);
                object = {
                    type: AST_TYPES.MemberExpression,
                    computed: true,
                    object,
                    property,
                    loc: {
                        start: object.loc.start,
                        end: sqEnd.loc.end,
                    }
                }

            }
        }
        return object
    }
    Identifier() {
        const ident = this.eat(TOKEN_TYPES.IDENTIFIER)
        return {
            type: AST_TYPES.Identifier,
            name: ident.value,
            loc: ident.loc,
        }

    }


    AssignmentOperator() {
        if (this.lookahead.type === TOKEN_TYPES.ASSIGNMENT_OPERATOR) {
            return this.eat(TOKEN_TYPES.ASSIGNMENT_OPERATOR)
        }
        return this.eat(TOKEN_TYPES.ASSIGNMENT_COMBO_OPERATOR)
    }
    LogicalOrExpression() {
        let left = this.LogicalAndExpression()
        while (this.lookahead.type !== TOKEN_TYPES.EOF && this.lookahead.type === TOKEN_TYPES.LOGICAL_OR_OPERATOR) {
            const operator = this.eat(TOKEN_TYPES.LOGICAL_OR_OPERATOR)
            const right = this.LogicalAndExpression()
            left = {
                type: 'LogicalExpression',
                operator,
                left,
                right,
                loc: { start: left.loc.start, end: right.loc.end },
            }
        }
        return left
    }
    LogicalAndExpression() {
        let left = this.EqualityExpression()
        while (this.lookahead.type !== TOKEN_TYPES.EOF && this.lookahead.type === TOKEN_TYPES.LOGICAL_AND_OPERATOR) {
            const operator = this.eat(TOKEN_TYPES.LOGICAL_AND_OPERATOR)
            const right = this.EqualityExpression()
            left = {
                type: 'LogicalExpression',
                operator,
                left,
                right,
                loc: { start: left.loc.start, end: right.loc.end },
            }
        }
        return left
    }
    EqualityExpression() {
        let left = this.RelationalExpression()

        while (this.lookahead.type !== TOKEN_TYPES.EOF && this.lookahead.type === TOKEN_TYPES.EQUALITY_OPERATOR) {
            const operator = this.eat(TOKEN_TYPES.EQUALITY_OPERATOR)
            const right = this.RelationalExpression()
            left = {
                type: AST_TYPES.EqualityExpression,
                operator,
                left,
                right,
                loc: {
                    start: left.loc.start,
                    end: right.loc.end,
                }
            }
        }
        return left
    }
    ArithmeticExpression() {

        let left = this.MultiplicativeExpression()
        while (this.lookahead.type !== TOKEN_TYPES.EOF && this.lookahead.type === TOKEN_TYPES.ARITHMETIC_OPERATOR) {
            const operator = this.eat(TOKEN_TYPES.ARITHMETIC_OPERATOR)
            const right = this.MultiplicativeExpression()
            left = {
                type: AST_TYPES.BinaryExpression,
                operator,
                left,
                right,
                loc: {
                    start: left.loc.start,
                    end: right.loc.end,
                }
            }
        }
        return left;

    }
    MultiplicativeExpression() {
        let left = this.UnaryExpression()
        while (this.lookahead.type !== TOKEN_TYPES.EOF && this.lookahead.type === TOKEN_TYPES.MULTIPLICATIVE_OPERATOR) {
            const operator = this.eat(TOKEN_TYPES.MULTIPLICATIVE_OPERATOR)
            const right = this.UnaryExpression()
            left = {
                type: AST_TYPES.BinaryExpression,
                operator,
                left,
                right,
                loc: {
                    start: left.loc.start,
                    end: right.loc.end,
                }
            }
        }
        return left;
    }
    UnaryExpression() {
        let operator;
        switch (this.lookahead.type) {
            case TOKEN_TYPES.ARITHMETIC_OPERATOR:
                operator = this.eat(TOKEN_TYPES.ARITHMETIC_OPERATOR)
                break;
            case TOKEN_TYPES.LOGICAL_NOT_OPERATOR:
                operator = this.eat(TOKEN_TYPES.LOGICAL_NOT_OPERATOR)
                break;

        }
        if (operator != null) {
            const argument = this.UnaryExpression()
            return {
                type: AST_TYPES.UnaryExpression,
                operator,
                argument,
                loc: {
                    start: operator.loc.start,
                    end: argument.loc.end,
                }

            }
        }
        return this.LeftHandSideExpression()
    }
    PrimaryExpression() {
        if (isLiteral(this.lookahead.type)) {
            return this.Literal()
        }
        switch (this.lookahead.type) {
            case TOKEN_TYPES.SQUARE_OPEN:
                return this.ArrayExpression();
            case TOKEN_TYPES.PAREN_OPEN:
                return this.ParenthesesExpression()
            case TOKEN_TYPES.IDENTIFIER:
                return this.Identifier()
            case TOKEN_TYPES.THIS:
                return this.ThisExpression()
            case TOKEN_TYPES.NEW:
                return this.NewExpression()
            default:
                throw new ParseSyntaxError(`Unexpected primary expression of type: ${this.lookahead.type} : ${this.lookahead.value} at ${this.lookahead.loc.start.line}:${this.lookahead.loc.start.column}`, this.lookahead)
        }
    }
    NewExpression() {
        const start = this.eat(TOKEN_TYPES.NEW)
        const callee = this.MemberExpression()
        const args = this.Arguments()
        return {
            type: AST_TYPES.NewExpression,
            callee,
            arguments: args,
            loc: {
                start: start.loc.start,
                end: args.loc.end,
            }
        }
    }
    ThisExpression() {
        const token = this.eat(TOKEN_TYPES.THIS)
        return {
            type: AST_TYPES.ThisExpression,
            loc: token.loc,
        }
    }
    Super() {
        const token = this.eat(TOKEN_TYPES.SUPER)
        return {
            type: AST_TYPES.Super,
            loc: token.loc
        }
    }

    ParenthesesExpression() {
        this.eat(TOKEN_TYPES.PAREN_OPEN);
        const expression = this.Expression()
        this.eat(TOKEN_TYPES.PAREN_CLOSE)

        return expression
    }
    Literal() {
        switch (this.lookahead.type) {
            case TOKEN_TYPES.NUMBER:
                return this.NumericLiteral();
            case TOKEN_TYPES.STRING:
                return this.StringLiteral();
            case TOKEN_TYPES.TRUE:
                return this.BooleanLiteral(this.lookahead.type);
            case TOKEN_TYPES.FALSE:
                return this.BooleanLiteral(this.lookahead.type);
            case TOKEN_TYPES.NULL:
                return this.NullLiteral();
        }
        /* istanbul ignore next */
        const loc = this.lookahead == null ? "" : `at ${this.lookahead.loc.start.line}:${this.lookahead.loc.start.col}`;
        /* istanbul ignore next */
        const type = this.lookahead == null ? "unknown" : `"${this.lookahead.type}"`;
        /* istanbul ignore next */
        throw new ParseSyntaxError(`Unexpected literal production of type: ${type} ${loc}`, this.lookahead);
    }
    ArrayExpression() {
        const start = this.eat(TOKEN_TYPES.SQUARE_OPEN);
        const elements = []
        if (this.lookahead.type === TOKEN_TYPES.SQUARE_CLOSE) {
            let end = this.eat(TOKEN_TYPES.SQUARE_CLOSE)
            return {
                type: AST_TYPES.ArrayExpression,
                elements,
                loc: { start: start.loc.start, end: end.loc.end },
            }
        }
        do {
            elements.push(this.PrimaryExpression())
        } while (this.lookahead.type !== TOKEN_TYPES.EOF && this.lookahead.type === TOKEN_TYPES.COMMA && this.eat(TOKEN_TYPES.COMMA))
        const end = this.eat(TOKEN_TYPES.SQUARE_CLOSE)
        return {
            type: AST_TYPES.ArrayExpression,
            elements,
            loc: { start: start.loc.start, end: end.loc.end },
        }

    }

    BooleanLiteral(type) {
        const loc = this.eat(type).loc;
        return {
            type: AST_TYPES.BooleanLiteral,
            value: BooleanTypeToValue(type),
            loc,

        }
    }
    NullLiteral() {
        const loc = this.eat(TOKEN_TYPES.NULL).loc
        return {
            type: AST_TYPES.NullLiteral,
            value: null,
            loc
        }
    }

    NumericLiteral() {
        const token = this.eat(TOKEN_TYPES.NUMBER)
        return ASTNode({ token, type: AST_TYPES.NumericLiteral, value: Number(token.value) })

    }
    StringLiteral() {
        const token = this.eat(TOKEN_TYPES.STRING)
        return ASTNode({ token, type: AST_TYPES.StringLiteral, value: token.value.slice(1, -1) })
    }

}

export default Parser