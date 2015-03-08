d3.tsv('data.tsv', function(data){
  var c = d3.conventions({parentSel: d3.select('#graph')})

  c.x.domain(d3.extent(data, ƒ('sepalWidth')) ).nice()
  c.y.domain(d3.extent(data, ƒ('sepalLength'))).nice()
  c.drawAxis()

  c.svg.appendData('circle', data)
      .attrC('cx', c.x, ƒ('sepalWidth'))
      .attrC('cy', c.y, ƒ('sepalLength'))
      .attrC('fill', c.color, ƒ('species'))
      .attr({r: 5, stroke: '#000'})
      .call(d3.attachTooltip)
})