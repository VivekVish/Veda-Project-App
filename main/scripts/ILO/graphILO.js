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
    
    // DESC: colors of the graphs
    colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed","#ff66cc"],
    backgroundColor: "#fff",
	
	// DESC: displays an individual ILO
	// PARAMETER: targetGraph is the graph to be drawn
	// RETURNS: void
	display: function(targetGraph)
	{
		var graphData = ILOContents.ILOArray[$(targetGraph).attr('id')];
        var graphProperties = this.checkAllGraphData(graphData);
        
		var graphFuncs = graphILO.getGraphFunctions(graphData.content,graphProperties);

		$(targetGraph).children('.graphDisplay').remove();
		$('<div class=graphDisplay></div>').appendTo(targetGraph);
		$(targetGraph).children('.graphDisplay').width(WINDOWHEIGHT * 0.5 * graphProperties.adjustwidth);
		$(targetGraph).children('.graphDisplay').height(WINDOWHEIGHT * 1/3 * graphProperties.adjustheight);
		$(targetGraph).children('function').hide();

		$.plot($(targetGraph).children('.graphDisplay'), graphFuncs,
		{
			series: 
			{
				lines: { show: true },
                shadowSize: 0
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
                backgroundColor: graphILO.backgroundColor,
                markings: [ { xaxis: { from: graphProperties.xmin, to:  graphProperties.xmax }, yaxis: { from: 0, to: 0 }, color: "#000" },
                            { xaxis: { from: 0, to: 0 }, yaxis: { from: graphProperties.ymin, to: graphProperties.ymax }, color: "#000" }]
            }
		});
	},
    
    // DESC: gets graph functions from the graph object
    // PARAMETER: graphContent is the object literal containing the graph contnet
    // PARAMETER: graphProperties is the object literal containing the 
    // RETURNS: array of graph functions ready to be graphed
    getGraphFunctions: function(graphContent, graphProperties)
    {
        var graphFuncs = [];
        
		$.each(graphContent,function(index,mappingVal)
		{
            if("mapping" in mappingVal)
            {
                var mappingLabel = "label" in mappingVal ? mappingVal.label.replace(/_/g,' ') : "";
                var newFunction = {data:"",color:graphILO.colors[index]};

                $.each(mappingVal.mapping, function(funcIndex,functionVal)
                {
                    var dataPoints = [];
                    var points = "points" in functionVal && functionVal.points!="" ? functionVal['points'] : graphProperties.points;

                    var inverted = "inverted" in functionVal && functionVal.inverted!="" && (functionVal.inverted===true || functionVal.inverted=="true") ? true : false;
                    if(inverted)
                    {
                        var leftBound = "domain" in functionVal && "leftbound" in functionVal.domain && functionVal.domain.leftbound != ""? Math.max(graphProperties.ymin,functionVal.domain.leftbound) : graphProperties.ymin;
                        var rightBound = "domain" in functionVal && "rightbound" in functionVal.domain && functionVal.domain.rightbound != ""? Math.min(graphProperties.ymax,functionVal.domain.rightbound) : graphProperties.ymax;
                    }
                    else
                    {
                        var leftBound = "domain" in functionVal && "leftbound" in functionVal.domain && functionVal.domain.leftbound != "" ? Math.max(graphProperties.xmin,functionVal.domain.leftbound) : graphProperties.xmin;
                        var rightBound = "domain" in functionVal && "rightbound" in functionVal.domain && functionVal.domain.rightbound != "" ? Math.min(graphProperties.xmax,functionVal.domain.rightbound) : graphProperties.xmax;
                    }
                    
                    if(funcIndex==0)
                    {
                        newFunction.label = mappingLabel;
                    }

                    // GRAPHING FUNCTIONS AND ASYMPTOTES
                    if((functionVal.type == "function" || functionVal.type == "asymptote") && leftBound < rightBound)
                    {

                        var funcEquation = graphILO.parseEquation(functionVal["formula"]);

                        if(inverted)
                        {
                            y = 0;
                            for(var i=0;i<points;i++)
                            {
                                var y = (rightBound-leftBound)*i/(points-1)+leftBound;
                                dataPoints.push([eval(funcEquation),y]);	
                            }
                        }
                        else
                        {
                            for(var i=0;i<points;i++)
                            {
                                var x = (rightBound-leftBound)*i/(points-1)+leftBound;
                                dataPoints.push([x,eval(funcEquation)]);	
                            }
                        }
                        
                        if(functionVal.type == "asymptote")
                        {
                            newFunction.dashes = {show: false};
                            newFunction.lines = {show: true, lineWidth:8};
                            newFunction.color = graphILO.backgroundColor;
                            newFunction.data = dataPoints;
                            delete newFunction.label;
                            
                            graphFuncs.push($.extend({},newFunction));
                            
                            if(funcIndex==0)
                            {
                                newFunction.label = mappingLabel;
                            }
                            newFunction.dashes = {show: true};
                            newFunction.lines = {show: false};
                            newFunction.color = graphILO.colors[index];
                        }
                        
                        newFunction.data = dataPoints;
                        graphFuncs.push(newFunction);
                    }
                    // GRAPHING INTEGRALS
                    else if((functionVal.type == "integral") && leftBound < rightBound)
                    {
                        var funcEquation = graphILO.parseEquation(functionVal["formula"]);
                        var leftLimitOfIntegration = "leftLimitOfIntegration" in functionVal && functionVal.leftLimitOfIntegration != "" ? Math.max(functionVal["leftLimitOfIntegration"],leftBound) : leftBound;
                        var rightLimitOfIntegration = "rightLimitOfIntegration" in functionVal && functionVal.rightLimitOfIntegration != "" ? Math.min(functionVal["rightLimitOfIntegration"],rightBound) : rightBound;
                        
                        var beforeConnected = false;
                        var afterConnected = false;
                        
                        var beforeIntegral = $.extend({},newFunction);
                        delete newFunction.label;
                        var integral = $.extend({},newFunction);
                        integral.lines = {show: true, fill: true};
                        var afterIntegral = $.extend({},newFunction);
                        
                        var beforeIntegralDataPoints = [];
                        var integralDataPoints = [];
                        var afterIntegralDataPoints = [];
                        
                        for(i=0;i<points;i++)
                        {
                            var x = (rightBound-leftBound)*i/(points-1)+leftBound;
                            if(x<leftLimitOfIntegration)
                            {
                                beforeIntegralDataPoints.push([x,eval(funcEquation)]);
                            }
                            else if(x<rightLimitOfIntegration)
                            {
                                if(!beforeConnected)
                                {
                                    beforeIntegralDataPoints.push([x,eval(funcEquation)]);
                                    beforeConnected = true;
                                }
                                
                                integralDataPoints.push([x,eval(funcEquation)]);
                            }
                            else
                            {
                                if(!afterConnected)
                                {
                                    integralDataPoints.push([x,eval(funcEquation)]);
                                    afterConnected = true;
                                }
                                
                                afterIntegralDataPoints.push([x,eval(funcEquation)]);
                            }
                        }
                        
                        beforeIntegral.data = beforeIntegralDataPoints;
                        integral.data = integralDataPoints;
                        afterIntegral.data = afterIntegralDataPoints;
                        
                        graphFuncs.push(beforeIntegral);
                        graphFuncs.push(integral);
                        graphFuncs.push(afterIntegral);
                    }
                    // GRAPHING PERIODIC ASYMPTOTES
                    else if(functionVal.type == "periodicasymptote")
                    {
                        var funcEquation = graphILO.parseEquation(functionVal["formula"]);

                        var N = 0;
                        var val0 = eval(funcEquation);
                        N = 1;
                        var val1 = eval(funcEquation);
                        
                        if(val0!=val1)
                        {
                            var asymptoteStart = Math.ceil(Math.min((leftBound-val0)/(val1-val0),(rightBound-val0)/(val1-val0)));
                            var asymptoteEnd = Math.floor(Math.max((leftBound-val0)/(val1-val0),(rightBound-val0)/(val1-val0)));

                            for(i=Math.min(asymptoteStart,asymptoteEnd);i<=Math.max(asymptoteStart,asymptoteEnd);i++)
                            {
                                N=i;
                                var staticVal = eval(funcEquation);

                                if(inverted)
                                {
                                    for(var j=0; j<points;j++)
                                    {
                                        var x = (graphProperties.xmax-graphProperties.xmin)*j/(points-1)+graphProperties.xmin;
                                        dataPoints.push([x,staticVal]);
                                    }
                                }
                                else
                                {
                                    for(var j=0; j<points;j++)
                                    {
                                        var y = (graphProperties.ymax-graphProperties.ymin)*j/(points-1)+graphProperties.ymin;
                                        dataPoints.push([staticVal,y]);
                                    }
                                }

                                newFunction.data = dataPoints;
                                newFunction.dashes = {show: false};
                                newFunction.lines = {show: true, lineWidth:8};
                                newFunction.color = graphILO.backgroundColor;

                                graphFuncs.push($.extend({},newFunction));

                                newFunction.data = dataPoints;
                                newFunction.dashes = {show: true};
                                newFunction.lines = {show: false};
                                newFunction.color = graphILO.colors[index];

                                graphFuncs.push($.extend({},newFunction));

                                newFunction = {data:""};
                                dataPoints = [];
                            }
                        }
                    }
                    // GRAPHING POLAR EQUATIONS
                    else if(functionVal.type=="polarequation")
                    {
                        var tmin = "domain" in functionVal && "leftbound" in functionVal.domain && functionVal.domain.leftbound!="" ? functionVal.domain.leftbound : 0;
                        var tmax = "domain" in functionVal && "rightbound" in functionVal.domain && functionVal.domain.leftbound!="" ? functionVal.domain.rightbound : 2 * Math.PI;
                        var funcEquation = graphILO.parseEquation(functionVal["formula"]);

                        for(var i=0; i<graphProperties.points;i++)
                        {
                            // The following x is the traditional theta in polar equations
                            var x = (tmax-tmin)*i/(graphProperties.points-1)+tmin;
                            var r = eval(funcEquation);
                            var xVal = r * Math.cos(x);
                            var yVal = r * Math.sin(x);
                            dataPoints.push([xVal,yVal]);
                        }

                        newFunction.data = dataPoints;

                        graphFuncs.push(newFunction);
                    }
                    // GRAPHING POINTS
                    else if(functionVal.type=="formulapoints")
                    {
                        var pointSymbol = "symbol" in functionVal ? functionVal.symbol : "circle";
                        var fillColor = ("fill" in functionVal && (functionVal.fill===true || functionVal.fill==="true")) ? graphILO.colors[index] : graphILO.backgroundColor;
                        newFunction.lines = {show: false};
                        newFunction.points = {show: true, symbol : pointSymbol, fill : true, fillColor: fillColor};
                        if("formula" in functionVal)
                        {
                            var funcEquation = graphILO.parseEquation(functionVal["formula"]);
                            
                            if("domain" in functionVal && "set" in functionVal.domain && functionVal.domain.set=="N")
                            {
                                leftBound = Math.ceil(leftBound);
                                rightBound = Math.floor(rightBound);
                                
                                if(inverted)
                                {
                                    for(var i=leftBound;i<=rightBound;i++)
                                    {
                                        var y = i;
                                        dataPoints.push([eval(funcEquation),y]);	
                                    }
                                }
                                else
                                {
                                    for(var i=leftBound;i<=rightBound;i++)
                                    {
                                        var x = i;
                                        dataPoints.push([x,eval(funcEquation)]);	
                                    }
                                }
                            }
                            else
                            {
                                if(inverted)
                                {
                                    for(var i=0;i<points;i++)
                                    {
                                        var y = (rightBound-leftBound)*i/(points-1)+leftBound;
                                        dataPoints.push([eval(funcEquation),y]);	
                                    }
                                }
                                else
                                {
                                    for(var i=0;i<points;i++)
                                    {
                                        var x = (rightBound-leftBound)*i/(points-1)+leftBound;
                                        dataPoints.push([x,eval(funcEquation)]);	
                                    }
                                }
                            }
                            
                            newFunction.data = dataPoints;
                        }
                        
                        graphFuncs.push(newFunction);
                    }
                    else if(functionVal.type=="individualpoints")
                    {
                        var pointSymbol = "symbol" in functionVal ? functionVal.symbol : "circle";
                        var fillColor = ("fill" in functionVal && (functionVal.fill===true || functionVal.fill==="true")) ? graphILO.colors[index] : graphILO.backgroundColor;
                        newFunction.lines = {show: false};
                        newFunction.points = {show: true, symbol : pointSymbol, fill : true, fillColor: fillColor};
                        newFunction.data = eval("["+functionVal["pointlist"]+"]");
                        graphFuncs.push(newFunction);
                    }
                    
                    newFunction = {data:"",color:graphILO.colors[index]};
                });
            }
            else if("function" in mappingVal)
            {
                var newFunction = {label:"",data:""};
                newFunction.label = mappingVal['label'].replace(/_/g,' ');
                var dataPoints = [];
                
                for(var i=0;i<graphProperties.points;i++)
                {
                    x = (graphProperties.xmax-graphProperties.xmin)*i/(graphProperties.points-1)+graphProperties.xmin;
                    dataPoints.push([x,eval(graphILO.parseEquation(mappingVal["function"]))]);	
                }
                newFunction.data = dataPoints;
                newFunction.color = graphILO.colors[index];
                
                graphFuncs.push(newFunction);
            }
		});
        
        return graphFuncs;
    },
	
	// DESC: checks whether data is undefined and if so, replaces it with defaultVal
	// PARAMETER: data is the variable that is being checked
	// PARAMETER: defaultVal is the value to replace data assuming data is undefined 
	// RETURNS: data is returned assuming data is defined. otherwise, defaultVal is returned
	checkMissingData: function(data, defaultVal)
	{
		return typeof(data)=='undefined' || data=='' || isNaN(data) ? defaultVal : data;
	},
	
	// DESC: parses an equation into a format that Javascript can run
	// PARAMETER: equationInput is the equation to be parsed
	// RETURNS: equation that can be parsed by Javascript
	parseEquation: function(equationInput)
	{
		var equationOutput = equationInput.replace(/asin/,'Math.asin')
										  .replace(/acos/,'Math.acos')
										  .replace(/atan/,'Math.atan')
                                          .replace(/acsc/,'Math.acsc')
                                          .replace(/asec/,'Math.asec')
                                          .replace(/acot/,'Math.acot')
										  .replace(/(a)?sin/g,function($0,$1){return $1 ? $0 : 'Math.sin'})
										  .replace(/(a)?cos/g,function($0,$1){return $1 ? $0 : 'Math.cos'})
										  .replace(/(a)?tan/g,function($0,$1){return $1 ? $0 : 'Math.tan'})
                                          .replace(/(a)?csc/g,function($0,$1){return $1 ? $0 : 'Math.csc'})
										  .replace(/(a)?sec/g,function($0,$1){return $1 ? $0 : 'Math.sec'})
										  .replace(/(a)?cot/g,function($0,$1){return $1 ? $0 : 'Math.cot'})
                                          .replace(/(s)?e/g,function($0,$1){return $1 ? $0 : 'Math.E'})
										  .replace(/pi/g,'Math.PI')
										  .replace(/ln/g,'Math.log')
										  .replace(/sqrt/g,'Math.sqrt')
										  .replace(/abs/g,'Math.abs')
										  .replace(/\|.+?\|/g,function($0,$1){ return $1>=0 ? 'Math.abs('+$0.slice(1,$0.length-1)+')' : $0;})
										  .replace(/log_[0-9]+/g,function($0,$1){return $1>=0 ? '1/Math.log('+$0.substring($0.search('_')+1,$0.length)+')*Math.log' : $0;})
										  .replace(/log_x/g,'1/Math.log(x)*Math.log')
                                          .replace(/log_y/g,'1/Math.log(y)*Math.log');
		
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
					if(equationOutput[checkPosition].search(/[xy]/)>-1)
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
					if(equationOutput[checkPosition].search(/[xy]/)>-1)
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
			xmin : graphILO.checkMissingData(parseFloat(targetGraph['attributes']['xmin']),-10),
			xmax : graphILO.checkMissingData(parseFloat(targetGraph['attributes']['xmax']),10),
			xticks : graphILO.checkMissingData(parseInt(targetGraph['attributes']['xticks']),5),
			ymin : graphILO.checkMissingData(parseFloat(targetGraph['attributes']['ymin']),-10),
			ymax : graphILO.checkMissingData(parseFloat(targetGraph['attributes']['ymax']),10),
			yticks : graphILO.checkMissingData(parseInt(targetGraph['attributes']['yticks']),5),
			points : graphILO.checkMissingData(parseInt(targetGraph['attributes']['points']),100),
			adjustwidth : graphILO.checkMissingData(parseFloat(targetGraph['attributes']['adjustwidth']),1),
			adjustheight : graphILO.checkMissingData(parseFloat(targetGraph['attributes']['adjustheight']),1),
			scrollable : graphILO.checkMissingData(targetGraph['attributes']['scrollable'] == "true" ? true : false,true)
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
	mouseSensitivity: 1,
	
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
				graphILO.mouseDownPosition = {Xpos: e.pageX, Ypos: e.pageY, xmin: graphData.xmin, xmax: graphData.xmax, ymin: graphData.ymin, ymax: graphData.ymax }
				break;
			case "mousemove":
                
				if(graphILO.mouseIsDown&&(typeof($(ILOContents.ILOArray[$(e.currentTarget).attr('id')]['attributes']['scrollable'])=='undefined'||$(ILOContents.ILOArray[$(e.currentTarget).attr('id')]['attributes']['scrollable'])==true)))
				{
					var graphData = graphILO.checkAllGraphData(ILOContents.ILOArray[$(e.currentTarget).attr('id')]);
                    if(graphData===false)
                    {
                        return;
                    }
                    
					var graphWidth = $(e.currentTarget).width();
					var graphHeight = $(e.currentTarget).height();;
					var xMovePercentage = (graphILO.mouseDownPosition.Xpos-e.pageX)/graphWidth;
					var yMovePercentage = (e.pageY-graphILO.mouseDownPosition.Ypos)/graphHeight;
					var xMove = xMovePercentage * (graphData.xmax-graphData.xmin) * graphILO.mouseSensitivity;
					var yMove = yMovePercentage * (graphData.ymax-graphData.ymin) * graphILO.mouseSensitivity;
					ILOContents.ILOArray[$(e.currentTarget).attr('id')].attributes.xmin = parseFloat(ILOContents.ILOArray[$(e.currentTarget).attr('id')].attributes.xmin)+xMove;
                    ILOContents.ILOArray[$(e.currentTarget).attr('id')].attributes.xmax = parseFloat(ILOContents.ILOArray[$(e.currentTarget).attr('id')].attributes.xmax)+xMove;
                    ILOContents.ILOArray[$(e.currentTarget).attr('id')].attributes.ymin = parseFloat(ILOContents.ILOArray[$(e.currentTarget).attr('id')].attributes.ymin)+yMove;
                    ILOContents.ILOArray[$(e.currentTarget).attr('id')].attributes.ymax = parseFloat(ILOContents.ILOArray[$(e.currentTarget).attr('id')].attributes.ymax)+yMove;
                    graphILO.mouseDownPosition = {Xpos: e.pageX, Ypos: e.pageY, xmin: graphData.xmin, xmax: graphData.xmax, ymin: graphData.ymin, ymax: graphData.ymax }
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