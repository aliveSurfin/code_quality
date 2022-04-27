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




Clean Code: A Handbook of Agile Software Craftsmanship



The ideal number of arguments for a function is
zero (niladic). Next comes one (monadic), followed
closely by two (dyadic). Three arguments (triadic)
should be avoided where possible. More than three
(polyadic) requires very special justification—and
then shouldn’t be used anyway

@book{10.5555/1388398,
author = {Martin, Robert C.},
title = {Clean Code: A Handbook of Agile Software Craftsmanship},
year = {2008},
isbn = {0132350882},
publisher = {Prentice Hall PTR},
address = {USA},
edition = {1},
abstract = {Even bad code can function. But if code isnt clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesnt have to be that way.Noted software expert Robert C. Martin, presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. Martin, who has helped bring agile principles from a practitioners point of view to tens of thousands of programmers, has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code on the fly into a book that will instill within you the values of software craftsman, and make you a better programmerbut only if you work at it.What kind of work will you be doing? Youll be reading codelots of code. And you will be challenged to think about whats right about that code, and whats wrong with it. More importantly you will be challenged to reassess your professional values and your commitment to your craft. Clean Code is divided into three parts. The first describes the principles, patterns, and practices of writing clean code. The second part consists of several case studies of increasing complexity. Each case study is an exercise in cleaning up codeof transforming a code base that has some problems into one that is sound and efficient. The third part is the payoff: a single chapter containing a list of heuristics and smells gathered while creating the case studies. The result is a knowledge base that describes the way we think when we write, read, and clean code.Readers will come away from this book understandingHow to tell the difference between good and bad codeHow to write good code and how to transform bad code into good codeHow to create good names, good functions, good objects, and good classesHow to format code for maximum readability How to implement complete error handling without obscuring code logicHow to unit test and practice test-driven developmentWhat smells and heuristics can help you identify bad codeThis book is a must for any developer, software engineer, project manager, team lead, or systems analyst with an interest in producing better code.}
}


Functions should usually be no longer than 20 lines 


In the eighties we used to say that a function should be no bigger than a screen-full.
Of course we said that at a time when VT100 screens were 24 lines by 80 columns, and
our editors used 4 lines for administrative purposes. Nowadays with a cranked-down font
and a nice big monitor, you can fit 150 characters on a line and a 100 lines or more on a
screen. Lines should not be 150 characters long. Functions should not be 100 lines long.
Functions should hardly ever be 20 lines long.
How short should a function be? In 1999 I went to visit Kent Beck at his home in Oregon. We sat down and did some programming together. At one point he showed me a cute
little Java/Swing program that he called Sparkle. It produced a visual effect on the screen
very similar to the magic wand of the fairy godmother in the movie Cinderella. As you
moved the mouse, the sparkles would drip from the cursor with a satisfying scintillation,
falling to the bottom of the window through a simulated gravitational field. When Kent
showed me the code, I was struck by how small all the functions were. I was used to functions in Swing programs that took up miles of vertical space. Every function in this program was just two, or three, or four lines long. Each was transparently obvious. Each told
a story. And each led you to the next in a compelling order. That’s how short your functions
should be!