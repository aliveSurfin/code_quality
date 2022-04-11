Recursive descent parser


BNF Grammar - explainer on this 
```
StatementList
    :Statement
    | StatementList Statement 
```
Recursive descent parsers are left recursive, which breaks this grammar

so:
```
StatementList
    :Statement <- skipped as we have found a statement list
    |StatementList Statement <- we get into an infinite loop
```
The fix here is to be right recursive:
```
StatementList
    :Statement
    |Statement StatementList

```
or to implement a non recursive call 
```
StatementList
    :Statement
    |StatementList Statement 
```
becomes via expanding all of the StatementList 
```
StatementList
    :Statement
    |Statement Statement Statement Statement Statement ...
```
```js
StatementList(stopLoookingPast = null) {
        const list = [this.Statement()]
        while (this.lookahead != null && this.lookahead.type !== stopLoookingPast) {
            list.push(this.Statement())
        }
        return list
    }
```

Here a statement list is expanded iteratively.