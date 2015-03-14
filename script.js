d3.tsv('data.tsv', function(data){
  c = d3.conventions({parentSel: d3.select('#graph')})

  c.x.domain(d3.extent(data, ƒ('sepalWidth')) ).nice()
  c.y.domain(d3.extent(data, ƒ('sepalLength'))).nice()
  c.drawAxis()

  c.svg.dataAppend(data, 'circle')
      .attr('cx', ƒ('sepalWidth', c.x))
      .attr('cy', ƒ('sepalLength',c.y))
      .attr('fill', ƒ('species', c.color))
      .attr({r: 5, stroke: '#000'})
      .call(d3.attachTooltip)

  var legend = c.svg.dataAppend(c.color.domain(), 'g.legend')
      .translate(function(d, i){ return [0, i*20] })

  legend.append('rect')
      .attr({x: c.width - 18, width: 18, height: 18})
      .style('fill', c.color)

  legend.append('text')
      .attr({x: c.width - 24, y: 9, dy: '.33em', 'text-anchor': 'end'})
      .text(ƒ())
})