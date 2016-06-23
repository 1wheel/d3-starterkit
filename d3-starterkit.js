(function() {

  function factory(d3){

    d3.conventions = function(c){
      c = c || {}

      c.margin = c.margin || {top: 20, right: 20, bottom: 20, left: 80}

      c.width  = c.width  || c.totalWidth  - c.margin.left - c.margin.right || 900
      c.height = c.height || c.totalHeight - c.margin.top - c.margin.bottom || 460

      c.totalWidth = c.width + c.margin.left + c.margin.right
      c.totalHeight = c.height + c.margin.top + c.margin.bottom

      c.parentSel = c.parentSel || d3.select('body')

      c.svg = c.svg || c.parentSel.append("svg")
          .attr("width", c.width + c.margin.left + c.margin.right)
          .attr("height", c.height + c.margin.top + c.margin.bottom)
        .append("g")
          .attr("transform", "translate(" + c.margin.left + "," + c.margin.top + ")")

      c.color   = c.color   || d3.scaleCategory10()
      c.x       = c.x       || d3.scaleLinear().range([0, c.width])
      c.y       = c.y       || d3.scaleLinear().range([c.height, 0])
      c.rScale  = c.rScale  || d3.scaleSqrt().range([5, 20])
      c.line    = c.line    || d3.line()

      c.xAxis = c.xAxis || d3.axisBottom().scale(c.x)
      c.yAxis = c.yAxis || d3.axisLeft().scale(c.y)

      c.drawAxis = function(){
        c.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + c.height + ")")
            .call(c.xAxis);

        c.svg.append("g")
            .attr("class", "y axis")
            .call(c.yAxis);
      }
      
      return c
    }

    d3.attachTooltip = function(sel, fieldFns){
      if (!sel.size()) return

      sel 
          .on('mouseover.attachTooltip', ttDisplay)
          .on('mousemove.attachTooltip', ttMove)
          .on('mouseout.attachTooltip',  ttHide)
          .on('click.attachTooltip', function(d){ console.log(d) })

      var d = sel.datum()
      fieldFns = fieldFns || d3.keys(d)
          .filter(function(str){
            return (typeof d[str] != 'object') && (d[str] != 'array')
          })
          .map(function(str){
            return function(d){ return str + ': <b>' + d[str] + '</b>'} })

      function ttDisplay(d){
        d3.select('.tooltip')
            .classed('tooltip-hidden', false)
            .html('')
          .dataAppend(fieldFns, 'div')
            .html(function(fn){ return fn(d) })

        d3.select(this).classed('tooltipped', true)
      }

      function ttMove(d){
        var tt = d3.select('.tooltip')
        if (!tt.size()) return
        var e = d3.event,
          x = e.clientX,
          y = e.clientY,
          doctop = (window.scrollY)? window.scrollY : (document.documentElement && document.documentElement.scrollTop)? document.documentElement.scrollTop : document.body.scrollTop;
          n = tt.node(),
          nBB = n.getBoundingClientRect()

        tt.style('top', (y+doctop-nBB.height-18)+"px");
        tt.style('left', Math.min(Math.max(20, (x-nBB.width/2)), window.innerWidth - nBB.width - 20)+"px");
      }

      function ttHide(d){
        d3.select('.tooltip').classed('tooltip-hidden', true);

        d3.selectAll('.tooltipped').classed('tooltipped', false)
      }
    }


    d3.selection.prototype.dataAppend = function(data, name){
      return this.selectAll(name)
          .data(data).enter()
        .append(name)
    }
  }


    if (typeof d3 === 'object' && d3.version) factory(d3);
    else if (typeof define === 'function' && define.amd) {
        define(['lib/d3'], factory);
    }

})();
