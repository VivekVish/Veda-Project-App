////////////////////////////////////////////////////////////////
// The graphILO namespace handles the display of graph ILOs   //
// as well as events from users but not from content   		  //
// providers. 												  //
//															  //
// REQUIRES: jQuery, flot									  //
////////////////////////////////////////////////////////////////

var graphILO =
{
	// DESC: maxSize is the maximum multiplier that can be applied to a graph's size
	maxSize: 1,
	
	// DESC: minSize is the minimum multiplier that can be applied to a graph's size
	minSize: 0.5,
	
	// DESC: displays an individual ILO
	// PARAMETER: targetGraph is the graph to be drawn
	// RETURNS: void
	display: function(targetGraph)
	{
		var graphData = ILOContents.ILOArray[$(targetGraph).attr('id')];
		var graphProperties = this.checkAllGraphData(graphData);

		var graphFuncs = [];

		$.each(graphData.content,function(index,functionVal)
		{
			graphFuncs[index] = {label:"",data:""};
			graphFuncs[index].label = functionVal['label'].replace(/_/g,' ');
			var dataPoints = [];
			for(var i=0;i<graphProperties.points;i++)
			{
				x = (graphProperties.xmax-graphProperties.xmin)*i/(graphProperties.points-1)+graphProperties.xmin;
				dataPoints.push([x,eval(graphILO.parseEquation(functionVal['function']))]);	
			}
			graphFuncs[index].data = dataPoints;
		});
        
		$(targetGraph).children('.graphDisplay').remove();
		$('<div class=graphDisplay></div>').appendTo(targetGraph);		
		$(targetGraph).children('.graphDisplay').width(WINDOWHEIGHT * 0.5 * graphProperties.adjustwidth);
		$(targetGraph).children('.graphDisplay').height(WINDOWHEIGHT * 1/3 * graphProperties.adjustheight);
		$(targetGraph).children('function').hide();
		
		$.plot($(targetGraph).children('.graphDisplay'), graphFuncs,
		{
			series: 
			{
				lines: { show: true }
			},
			xaxis:
			{
				ticks: graphProperties.xticks,
				min: graphProperties.xmin,
				max: graphProperties.xmax	
			},
			yaxis:
			{
				ticks: graphProperties.yticks,
				min: graphProperties.ymin,
				max: graphProperties.ymax
			},
            grid: 
            {
                markings: [ { xaxis: { from: graphProperties.xmin, to:  graphProperties.xmax }, yaxis: { from: 0, to: 0 }, color: "#000" },
                            { xaxis: { from: 0, to: 0 }, yaxis: { from: graphProperties.ymin, to: graphProperties.ymax }, color: "#000" }]
            }
		});
	},
	
	// DESC: checks whether data is undefined and if so, replaces it with defaultVal
	// PARAMETER: data is the variable that is being checked
	// PARAMETER: defaultVal is the value to replace data assuming data is undefined 
	// RETURNS: data is returned assuming data is defined. otherwise, defaultVal is returned
	checkMissingData: function(data, defaultVal)
	{
		return typeof(data)=='undefined' ? defaultVal : data;
	},
	
	// DESC: parses an equation into a format that Javascript can run
	// PARAMETER: equationInput is the equation to be parsed
	// RETURNS: equation that can be parsed by Javascript
	parseEquation: function(equationInput)
	{
		var equationOutput = equationInput.replace('asin','Math.asin')
										  .replace('acos','Math.acos')
										  .replace('atan','Math.atan')
                                          .replace('acsc','Math.acsc')
                                          .replace('asec','Math.asec')
                                          .replace('acot','Math.acot')
										  .replace(/(a)?sin/g,function($0,$1){return $1 ? $0 : 'Math.sin'})
										  .replace(/(a)?cos/g,function($0,$1){return $1 ? $0 : 'Math.cos'})
										  .replace(/(a)?tan/g,function($0,$1){return $1 ? $0 : 'Math.tan'})
                                          .replace(/(a)?csc/g,function($0,$1){return $1 ? $0 : 'Math.csc'})
										  .replace(/(a)?sec/g,function($0,$1){return $1 ? $0 : 'Math.sec'})
										  .replace(/(a)?cot/g,function($0,$1){return $1 ? $0 : 'Math.cot'})
                                          .replace(/(s)?e/g,function($0,$1){return $1 ? $0 : 'Math.E'})
										  .replace('pi','Math.PI')
										  .replace('ln','Math.log')
										  .replace('sqrt','Math.sqrt')
										  .replace('abs','Math.abs')
										  .replace(/\|.+?\|/g,function($0,$1){ return $1>=0 ? 'Math.abs('+$0.slice(1,$0.length-1)+')' : $0;})
										  .replace(/log_[0-9]+/g,function($0,$1){return $1>=0 ? '1/Math.log('+$0.substring($0.search('_')+1,$0.length)+')*Math.log' : $0;})
										  .replace(/log_x/g,'1/Math.log(x)*Math.log');
		
		counter = 0;
		
		function insertPowerBase(targetEquation,insertPosition)
		{
			return targetEquation.substring(0,insertPosition)+"Math.pow("+targetEquation.substring(insertPosition,targetEquation.length);
		}
		
		function insertPowerExponent(targetEquation,insertPosition)
		{
			return 	targetEquation.substring(0,insertPosition+1)+")"+targetEquation.substring(insertPosition+1,targetEquation.length);
		}
		
		while(equationOutput.search(/\^/)>-1)
		{
			var baseFound = false;
			var exponentFound = false;
			var numberStarted = false;
			var parenthesisStarted = false;
			var parenthesisCount = 0;
			var wordStarted = false;
			
			var equationCaret = equationOutput.search(/\^/);
			var checkPosition = equationCaret-1;
			
			while(baseFound==false)
			{
				if(numberStarted)
				{
					if(equationOutput[checkPosition].search(/[0-9]/)==-1||checkPosition==0)
					{
						equationOutput = insertPowerBase(equationOutput,checkPosition+1);
						baseFound=true;
					}
				}
				else if(wordStarted)
				{
					if(equationOutput[checkPosition].search(/M/)>-1)
					{
						equationOutput = insertPowerBase(equationOutput,checkPosition);
						baseFound=true;
					}
				}
				else if(parenthesisStarted)
				{
					if(equationOutput[checkPosition].search(/\)/)>-1)
					{
						parenthesisCount++;
					}
					else if(equationOutput[checkPosition].search(/\(/)>-1)
					{
						parenthesisCount--;
					}
					
					if(parenthesisCount==0)
					{
						if(checkPosition==0||equationOutput[checkPosition-1].search(/[a-zA-Z]/)==-1)
						{
							equationOutput = insertPowerBase(equationOutput,checkPosition);
							baseFound=true;
						}
						else
						{
							wordStarted=true;	
						}
					}
				}
				else
				{
					if(equationOutput[checkPosition].search(/[x]/)>-1)
					{
						equationOutput = insertPowerBase(equationOutput,checkPosition);
						baseFound=true;
					}
					else if(equationOutput[checkPosition].search(/[0-9]/)>-1)
					{
						numberStarted=true;
						if(checkPosition==0)
						{
							equationOutput = insertPowerBase(equationOutput,checkPosition);
							baseFound=true;
						}
					}
					else if(equationOutput[checkPosition].search(/[a-zA-Z]/)>-1)
					{
						wordStarted=true;
					}
					else if(equationOutput[checkPosition].search(/\)/)>-1)
					{
						parenthesisStarted=true;
						parenthesisCount=1;
					}
				}

				if(checkPosition==0)
				{
					break;
				}
				else
				{
					checkPosition--;
				}
			}
			
			numberStarted = false;
			parenthesisStarted = false;
			parenthesisCount = 0;
			wordStarted = false;
			equationCaret = equationOutput.search(/\^/);
			checkPosition = equationCaret+1;
			
			equationOutput = equationOutput.replace(/\^/,",");
			
			while(exponentFound==false)
			{
				if(numberStarted)
				{
					if(equationOutput[checkPosition].search(/[0-9]/)==-1||equationOutput.length-1)
					{
						equationOutput = insertPowerExponent(equationOutput,checkPosition-1);
						exponentFound=true;
					}
				}
				else if(wordStarted)
				{
					if(equationOutput[checkPosition].search(/\(/)>-1)
					{
						parenthesisStarted=true;
						wordStarted=false;
						parenthesisCount=1;
					}
				}
				else if(parenthesisStarted)
				{
					if(equationOutput[checkPosition].search(/\(/)>-1)
					{
						parenthesisCount++;
					}
					else if(equationOutput[checkPosition].search(/\)/)>-1)
					{
						parenthesisCount--;
					}
					
					if(parenthesisCount==0)
					{
						equationOutput = insertPowerExponent(equationOutput,checkPosition);
						exponentFound=true;
					}
				}
				else
				{
					if(equationOutput[checkPosition].search(/[x]/)>-1)
					{
						equationOutput = insertPowerExponent(equationOutput,checkPosition);
						exponentFound=true;
					}
					else if(equationOutput[checkPosition].search(/[0-9]/)>-1)
					{
						numberStarted=true;
						if(checkPosition==equationOutput.length-1)
						{
							equationOutput = insertPowerExponent(equationOutput,checkPosition);
							exponentFound=true;
						}
					}
					else if(equationOutput[checkPosition].search(/M/)>-1)
					{
						wordStarted=true;
					}
					else if(equationOutput[checkPosition].search(/\(/)>-1)
					{
						parenthesisStarted=true;
						parenthesisCount=1;
					}
				}

				if(checkPosition==equationOutput.length-1)
				{
					break;
				}
				else
				{
					checkPosition++;
				}
			}
		}
										  
		return equationOutput;
	},
	
	// DESC: calculates defaults using checkMissingData for all attributes of a graph ILO
	// PARAMETER: targetGraph is the graph whose data is to be checked
	// RETURNS: object literal with all graph attribute values
	checkAllGraphData: function(targetGraph)
	{
		var graphData =
		{
			xmin : graphILO.checkMissingData(eval(targetGraph['attributes']['xmin']),-10),
			xmax : graphILO.checkMissingData(eval(targetGraph['attributes']['xmax']),10),
			xticks : graphILO.checkMissingData(eval(targetGraph['attributes']['xticks']),5),
			ymin : graphILO.checkMissingData(eval(targetGraph['attributes']['ymin']),-10),
			ymax : graphILO.checkMissingData(eval(targetGraph['attributes']['ymax']),10),
			yticks : graphILO.checkMissingData(eval(targetGraph['attributes']['yticks']),5),
			points : graphILO.checkMissingData(eval(targetGraph['attributes']['points']),100),
			adjustwidth : graphILO.checkMissingData(eval(targetGraph['attributes']['adjustwidth']),1),
			adjustheight : graphILO.checkMissingData(eval(targetGraph['attributes']['adjustheight']),1),
			scrollable : graphILO.checkMissingData(eval(targetGraph['attributes']['scrollable']),true)
		}
		
		if(graphData.adjustwidth>graphILO.maxSize)
		{
			graphData.adjustwidth=graphILO.maxSize;	
		}
		
		if(graphData.adjustheight>graphILO.maxSize)
		{
			graphData.adjustheight=graphILO.maxSize;	
		}
		
		if(graphData.adjustwidth<graphILO.minSize)
		{
			graphData.adjustwidth=graphILO.minSize;	
		}
		
		if(graphData.adjustheight<graphILO.minSize)
		{
			graphData.adjustheight=graphILO.minSize;	
		}
		
		return graphData;	
	},
	
	// DESC: sets all the attributes of a graph element
	// PARAMETER: targetGraph is the graph whose attributes are being set
	// PARAMETER: graphData is the attributes being applied to the graph
	// RETURNS: void
	setAllGraphData: function(oldGraphData, graphData)
	{
		oldGraphData['xmin']=graphData.xmin;
		oldGraphData['xmax']=graphData.xmax;
		oldGraphData['xticks']=graphData.xticks;
		oldGraphData['ymin']=graphData.ymin;
		oldGraphData['ymax']=graphData.ymax;
		oldGraphData['yticks']=graphData.yticks;
		oldGraphData['points']=graphData.points;
		oldGraphData['adjustwidth']=graphData.adjustwidth;
		oldGraphData['adjustheight']=graphData.adjustheight;
		oldGraphData['scrollable']=graphData.scrollable;
	},
	
	// DESC: mouseIsDown is used for click and drag events
	mouseIsDown: false,
	
	// DESC: mouseDownPosition is the mouse position when the mouse is first pressed
	mouseDownPosition: null,
	
	// DESC: mouseSensitivity describes the sensitivity of the mouse during click and drag movements
	mouseSensitivity: 1.5,
	
	// DESC: handles events from the user
	// PARAMETER: e is the event being passed
	// RETURNS: void
	handleUserEvent: function(e)
	{
		switch(e.type)
		{
			case "mousedown":
				graphILO.mouseIsDown = true;
				var graphData = graphILO.checkAllGraphData(ILOContents.ILOArray[$(e.currentTarget).attr('id')]);
				mouseDownPosition = {Xpos: e.pageX, Ypos: e.pageY, xmin: graphData.xmin, xmax: graphData.xmax, ymin: graphData.ymin, ymax: graphData.ymax }
				break;
			case "mousemove":
				if(graphILO.mouseIsDown&&(typeof($(ILOContents.ILOArray[$(e.currentTarget).attr('id')].attr('scrollable'))=='undefined'||$(ILOContents.ILOArray[$(e.currentTarget).attr('id')]['attributes']['scrollable'])==true)))
				{
					var graphData = graphILO.checkAllGraphData(ILOContents.ILOArray[$(e.currentTarget).attr('id')]);
					var graphWidth = $(e.currentTarget).width();
					var graphHeight = $(e.currentTarget).height();;
					var xMovePercentage = (mouseDownPosition.Xpos-e.pageX)/graphWidth;
					var yMovePercentage = (e.pageY-mouseDownPosition.Ypos)/graphHeight;
					var xMove = xMovePercentage * (graphData.xmax-graphData.xmin) * graphILO.mouseSensitivity;
					var yMove = yMovePercentage * (graphData.ymax-graphData.ymin) * graphILO.mouseSensitivity;
					ILOContents.ILOArray[$(e.currentTarget).attr('id')] = $(ILOContents.ILOArray[$(e.currentTarget).attr('id')])
										.attr('xmin',mouseDownPosition.xmin+xMove)
										.attr('xmax',mouseDownPosition.xmax+xMove)
										.attr('ymin',mouseDownPosition.ymin+yMove)
										.attr('ymax',mouseDownPosition.ymax+yMove);
					graphILO.display(e.currentTarget);
				}
				break;
			case "mouseup":
				graphILO.mouseIsDown = false;
				break;
			case "mouseout":
				graphILO.mouseIsDown = false;
				break;
		}
	}
}