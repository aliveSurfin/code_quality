export default function ASTNode({ token, type, value } = {}) {

    return {
        type,
        value,
        loc: token.loc,
    }

}