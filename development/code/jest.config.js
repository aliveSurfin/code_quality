export default {
    testRegex: "((\\.|/*.)(test))\\.js?$",
    collectCoverage: true,
    testEnvironment: 'jest-environment-node',
    transform: { "^.+\\.jsx?$": "babel-jest" }
}