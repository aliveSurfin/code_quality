<center><font size="8">Development Diary</font></center>

---

<center><font size="4">Sprint 1</font></center>
<div style="text-align: right"> 31<sup>st</sup> January 2022</div>

**Planned Items**
- Interface
- Code tokenization
- Abstract Syntax Tree
- Cyclomatic Complexity
- Readability

19/02/2022:\
The first sprint was interrupted due to catching covid. This halted work from 06/02/2022.

This also delayed the starting of the second sprint from 14/02/2022 to 21/02/2022.

Despite this the first week of Sprint 1 had progress with

- Setting up the development environment
  - Node js server to run all logic
  - React Application front end
  - Testing with Jest
- Interface
  - Code entry interface
**Retrospective**


With the lost time I feel it is necessary to re-calibrate my user stories. I will be performing 
1. MoSCoW Analysis
2. T-shirt sizing
3. Value/Risk
4. Creating Priorities from MoSCoW + Value/risk
5. Planning Poker

The actual development went well during the sprint, I believe the test driven development approach I am taking is making development go smoother. 

Next sprint I will attempt to log extra hours to make up for the development downtime this sprint, this will be factored in the planning stage. This will move budgeted time per week to approx 40 hours.

---

<center><font size="4">Sprint 2</font></center>
<div style="text-align: right"> 21<sup>st</sup> February  2022</div>

**Planning**

**Planned Items**
- item 1

28/02/2022:\

Sprint 2 week 2 delayed 1 week due to planning hackathon.

08/02/2022:\

I encountered a problem in week 1 that was the syntax highlighter was not playing ball with css importing.

```css
._1LxLbXOtVi04_ZTYVk3kpY,
._2F4SQjgk1woOFDEJwXf1ZS,
._1LxLbXOtVi04_ZTYVk3kpY,
.uKwXkKDWIkYds_vGUwFkJ, {
    color: #999
}
```
This is happening because the css loader is creating "random" identifiers for classnames to ensure unique styles are applied.

To remedy this I had to make a simple change within **/client/config/webpack.config.js**

```js
    const getStyleLoaders = (cssOptions, preProcessor) => {
            ...
                options: {
                    modules: cssOptions.module === "no-module" ? false : true
                }
            ...
```

I added a check to specify non modular css loading , our css will be loaded as is.


*Further down in the file*

```js
{
    test: cssRegex,
    exclude: cssModuleRegex,
    use: getStyleLoaders({
            importLoaders: 1,
            sourceMap: isEnvProduction && shouldUseSourceMap,
            module: "no-module"}),
    sideEffects: true
},
 ```
 ```js
 const cssRegex = /\.css$/;
 ```

 When encountering style importing of the type cssRegex, I pass this "no-module" string and any "*.css" file will be treated and imported as pure css.


 








**Retrospective**

---