# merged into [d3-jetpack](https://github.com/gka/d3-jetpack)

# d3-starterkit
Snippets and conventions for starting a new d3 project without a fuss. Includes [d3](http://d3js.org/), [lodash](http://underscorejs.org/), [d3-jetpack](https://github.com/gka/d3-jetpack), some handy css and a few convenience functions. [Short example](http://bl.ocks.org/1wheel/3dfee2b74943398f0550) and [longer blog post](http://roadtolarissa.com/data-exploration/).

This branch uses d3 verison 4, see the [d3v3 branch](https://github.com/1wheel/d3-starterkit/tree/d3v3) to use with d3 version 3. 

#### selection.dataAppend

Instead of making an empty selection, binding data to it, taking the enter selection and appending elements as separate steps:

```js
var circles = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
```

Use `dataAppend`:

```js
var circles = svg.dataAppend(data, 'circle')
```

#### selection.selectAppend

Select or append a single element. Always returning the selection:

```js
var g = svg.selectAll('g')
    .data([null])
    .call(function(sel) {
      sel.enter().append('g')
    })

```

Use `selectAppend`:

```js
var g = el.selectAppend('g')
```

#### d3.attachTooltip

Attaches a light weight tooltip that prints out all of an objects properties on mouseover. No more `> d3.select($0).datum()`! Assumes that a `<div class='tooltip'></div>` and the tooltip css exist on the page – see [index](https://github.com/1wheel/d3-starterkit/blob/master/index.html) for an example.

```js
circles.call(d3.attachTooltip)
```

For formated tooltips, update the html of the tooltip on mouseover:

```js
circles
    .call(d3.attachTooltip)
    .on('mouseover', function(d){
      d3.select('.tooltip').html(template(d)) })
```

If your fancy tooltip requires lots of markup, using a [template](http://underscorejs.org/#template) might be easier than building a complex html tree with d3.

#### d3.conventions
`d3.conventions()` appends an `svg` element with a `g` element according to the  [margin convention](http://bl.ocks.org/mbostock/3019563) to the page and returns an object with the following properties:

`totalWidth`, `totalHeight`, `margin`: size of the `svg` and its margins

`width`, `height`: size of `svg` inside of margins. 

`parentSel`: `d3.selection` of the element the `svg` was appended to. Defaults to `d3.select("body")`, but like every other returned value, can be specified by passing in an object: `d3.conventions({parentSel: d3.select("#graph-container"), totalHeight: 1300})` appends an svg to `#graph-container` with a height of 1300.

`svg`: `g` element translated to make room for the margins

`x`: Linear scale with a range of `[0, width]`

`y`: Linear scale with a range of `[height, 0]`

`xAxis`: Axis with scale set to x and orient to "bottom"

`yAxis`: Axis with scale set to y and orient to "left"

`drawAxis`: Call to append axis group elements to the svg after configuring the domain. Not configurable.

