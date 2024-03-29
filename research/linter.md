**Creating A Linter**
<p align="center" >
<img src="./images/static-analysis.png" style="width:50%;background-color:black">
<p>

***Books***

> Secure Programming with Static Analysis (Addison-Wesley Software Security) 


***Articles***
> [technology behind static analysis tools](http://www.opensourceforu.com/2011/09/joy-of-programming-technology-behind-static-analysis-tools/)
: A look how the parts of a linter works

> [A hands-on introduction to static code analysis](https://deepsource.io/blog/introduction-static-code-analysis/)
: Incredible deep dive into creating a static analysis tool in python

>[Making Your Own JavaScript Linter](https://medium.com/codex/making-your-own-javascript-linter-part-1-ee9f91dc49d8)
: Creating a linter in javascript

> [perils of parsers **READ THIS**](https://www.semanticdesigns.com/Products/DMS/LifeAfterParsing.html)
: How parsing works and the problems inherit 

> [How to Build Your Own Static Analyzer
For Fun and Profit
Dr. Andy Chou
Chief Scientist
Coverity Inc.](https://crypto.stanford.edu/cs155old/cs155-spring06/07-sec-coding.pdf)
: standford 


***Videos***
> [DIY Static Code Analyzer: Building your own security tools with Joern](https://www.youtube.com/watch?v=KDQu6vHSG98) : Creating static code analyser with [Joern](https://joern.io/) - [Associated Reading](https://nsec.io/session/2021-diy-static-code-analyzer-building-your-own-security-tools-with-joern.html)

> [SonarJS: How To Build a Static Code Analyzer - Elena Vilchik & Carlo Bottiglieri](https://www.youtube.com/watch?v=-CGpVrydTyg)
: Nice rundown of steps of creating static analysis in javascript

> [Static Code Analysis with Python](https://www.youtube.com/watch?v=mfXIJ-Fu5Fw)
: Very nice rundown of static code analysis in python

> [GopherCon 2021: Akhil Indurti - Writing a Static Analyzer for Go Code
](https://www.youtube.com/watch?v=RFa_zSrxDK8)
: nice video on writing a basic static analyser for go
---
***[AST (Abstract Syntax Tree)](https://medium.com/@dinis.cruz/ast-abstract-syntax-tree-538aa146c53b)***
```python
    while b ≠ 0
    if a > b
       a := a − b
    else
        b := b − a
    return a
```
<p align="center" >
<img src="./images/abstract-syntax-tree.png" style="width:50%;background-color:white">
<p>


---

***Similarities with compiler***

<p align="center" >
<img src="./images/compiler.png" style="width:50%;background-color:white">
<p>

<p align="center" >
<img src="./images/code-analyser.png" style="width:50%;background-color:white">
<p>


