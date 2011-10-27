////////////////////////////////////////////////////////////////
// The graph namespace receives and processes events from     //
// rangeTraverse.	When the caret is within a graph or   //
// when a graph is clicked, the graph is highlighted,  		  //
// and users have the option of editing or deleting the 	  //
// graph. 												  	  //
//															  //
// REQUIRES: rangeTraverse.js, jQuery						  //
////////////////////////////////////////////////////////////////

var graph = 
{
	// DESC: creates a lightbox in which the content provider can edit or add a graph
	// PARAMETER: targetGraph is the ILO to be edited.  If it is undefined, a new ILO will be added at the caret position
	// RETURNS: void
	editMode: function(targetGraph)
	{
		ilo.checkForRepeatILOs();
		var targetGraphContents = ILOContents.ILOArray[$(targetGraph).attr('id')];
		
		function updateGraph()
		{
			updatedGraphData = 
			{
				xmin:$('#graph-xmin').val(),
				xmax:$('#graph-xmax').val(),
				xticks:$('#graph-xticks').val(),
				ymin:$('#graph-ymin').val(),
				ymax:$('#graph-ymax').val(),
				yticks:$('#graph-yticks').val(),
				points:$('#graph-points').val(),
				adjustwidth: $('#graph-adjustwidth').val(),
				adjustheight: $('#graph-adjustheight').val(),
				scrollable:true
			}
			
			var updatedGraphFunctions = [];
			
			$('.graphFunctionEquations').each(function()
			{
				updatedGraphFunctions.push($(this).val());
			});
			
			if(validateGraphInputs(updatedGraphData, updatedGraphFunctions))
			{
				graphILO.setAllGraphData(ILOContents.ILOArray[$(lightBoxGraph).attr('id')]['attributes'], updatedGraphData);

                ILOContents.ILOArray[$(lightBoxGraph).attr('id')]['content'] = {};
                
				$('.graphFunctionEquations').each(function(index)
				{
					ILOContents.ILOArray[$(lightBoxGraph).attr('id')]['content'][index] = {'label':$('.graphFunctionLabels:eq('+index+')').val().replace(/ /g,'_'),'function':$(this).val()};
				});
                
                graphILO.display(lightBoxGraph);
				
				newInfoEntered=false;
			}
		}
		
		function validateGraphInputs(checkGraphData, checkGraphFunctions)
		{
			var inputErrors = new Array();
			var errorMessages = new Array();
			
			if(!formValidator.isNumber(checkGraphData.xmin)){inputErrors.push('x min')}
			if(!formValidator.isNumber(checkGraphData.xmax)){inputErrors.push('x max')}
			if(!formValidator.isPositiveInteger(checkGraphData.xticks)){inputErrors.push('x ticks')}
			if(!formValidator.isNumber(checkGraphData.ymin)){inputErrors.push('y min')}
			if(!formValidator.isNumber(checkGraphData.ymax)){inputErrors.push('y max')}
			if(!formValidator.isPositiveInteger(checkGraphData.yticks)){inputErrors.push('y ticks')}
			if(!formValidator.isPositiveInteger(checkGraphData.points)){inputErrors.push('points')}
			if(!formValidator.isPositiveNumber(checkGraphData.adjustwidth)){inputErrors.push('width')}
			if(!formValidator.isPositiveNumber(checkGraphData.adjustheight)){inputErrors.push('height')}

			$.each(inputErrors, function(index, value)
			{
				errorMessages.push('The value in field '+inputErrors[index]+' is invalid.');
			});
			
			if(formValidator.isNumber(checkGraphData.xmin)&&formValidator.isNumber(checkGraphData.xmax)&&eval(checkGraphData.xmin)>=eval(checkGraphData.xmax))
			{
				errorMessages.push('xmax must be greater than xmin.');	
			}
			
			if(formValidator.isNumber(checkGraphData.ymin)&&formValidator.isNumber(checkGraphData.ymax)&&eval(checkGraphData.ymin)>=eval(checkGraphData.ymax))
			{
				errorMessages.push('ymax must be greater than ymin.');	
			}
			
			$.each(checkGraphFunctions, function(index,value)
			{
				isFunctionValue = formValidator.isFunction(value);
				
				if(isFunctionValue!="true")
				{
					errorMessages.push("In function "+eval(index+1)+", "+isFunctionValue);	
				}
			});

			if(errorMessages.length==0)
			{
				$('#graphErrorMessages').fadeOut();	
				return true;
			}
			else
			{
				$('#graphErrorMessages div').contents().remove();
				$('#graphErrorMessages div').append('<h5>Error</h5>');
				$.each(errorMessages, function(index, value)
				{
					$('#graphErrorMessages div').append('<p>- '+errorMessages[index]+'</p>');
				});
				$('#graphErrorMessages').fadeIn();	
				
				return false;
			}
		}
		
		function updateParameters()
		{
			var lightBoxGraphSpecs = graphILO.checkAllGraphData(ILOContents.ILOArray[$(lightBoxGraph).attr('id')]);
			$('#graph-xmin').val(Math.round(lightBoxGraphSpecs.xmin*1000)/1000);
			$('#graph-xmax').val(Math.round(lightBoxGraphSpecs.xmax*1000)/1000);
			$('#graph-xticks').val(lightBoxGraphSpecs.xticks);
			$('#graph-ymin').val(Math.round(lightBoxGraphSpecs.ymin*1000)/1000);
			$('#graph-ymax').val(Math.round(lightBoxGraphSpecs.ymax*1000)/1000);
			$('#graph-yticks').val(lightBoxGraphSpecs.yticks);
			$('#graph-points').val(lightBoxGraphSpecs.points);
			$('#graph-adjustwidth').val(lightBoxGraphSpecs.adjustwidth);
			$('#graph-adjustheight').val(lightBoxGraphSpecs.adjustheight);
			
			newInfoEntered=false;
		}
        
        function addGraphFunction()
		{
			if($('#graphFunctions ul').children('li').size()<6)
			{
				var newGraphFunction = $('<li></li>');
				
				newGraphFunction.append('<label>Label</label>')
								.append('<input class="graphFunctionLabels" type="text"/>')
								.append('<label>Function</label>')
								.append('<input class="graphFunctionEquations"type="text"/>')
								.append('<img class="deleteGraphFunction" src="img/x.gif"></img>');
				$('#graphFunctions ul').append(newGraphFunction);
			}
		}
		
		if($('#lightbox').size()>0)
		{
			return;	
		}
		
		if(typeof(targetGraph) == 'undefined')
		{
			if((!rangeTraverse.within('#content')))
			{
				return;
			}
			insertionPoint = rangeTraverse.parents('p,.ilo,:header,table,ul,li')[0];
		}
		
		createLightBox('#content','Graph Editor','<div id="graphEditorHolder"></div>');
		$('#lightbox').addClass('graphLightbox');
		$('#graphEditorHolder').append('<div><div class="ilo" data-ilotype="graph" id="ilo-1"></div></div>');
		
		var lightBoxGraph = $('#graphEditorHolder .ilo[data-ilotype="graph"]');
		
		if(typeof(targetGraph) == 'undefined')
		{
            targetGraphContents = {type:'graph',version:'1.0',attributes:{xmin:-10,xmax:10,xticks:10,ymin:-10,ymax:10,yticks:10,points:100},content:{}};
			ILOContents.setILOArray($(lightBoxGraph).attr('id'),targetGraphContents);
			graphILO.display(lightBoxGraph);
			scrollableStartsOn = true;
		}
		else
		{
			ILOContents.setILOArray($(lightBoxGraph).attr('id'),targetGraphContents);
			var targetGraphData = graphILO.checkAllGraphData(ILOContents.ILOArray[$(targetGraph).attr('id')]);
			
			graphILO.display(lightBoxGraph);
			
			scrollableStartsOn = targetGraphData.scrollable==true ? true : false;
		}
		
		
		$('#graphEditorHolder').append('<div id="graphErrorMessages"><div></div></div><div id="graphParameters"></div>');
		$('#graphParameters').append('<div id="graphXAxis"><h5>x-axis</h5><ul></ul></div>')
							 .append('<div id="graphYAxis"><h5>y-axis</h5><ul></ul></div>')
							 .append('<div id="graphProperties"><h5>Properties</h5><ul></ul></div>')
							 .append('<div id="graphFunctions"><h5>Functions</h5><ul></ul></div>');
		$('#graphXAxis ul').append('<li><label for="graph-xmin">x min</label><input id="graph-xmin" type="text" maxlength=5/></li>')
						   .append('<li><label for="graph-xmax">x max</label><input id="graph-xmax" type="text" maxlength=5/></li>')
						   .append('<li><label for="graph-xticks">x ticks</label><input id="graph-xticks" type="text" maxlength=2/></li>');
		$('#graphYAxis ul').append('<li><label for="graph-ymin">y min</label><input id="graph-ymin" type="text" maxlength=5/></li>')
						   .append('<li><label for="graph-ymax">y max</label><input id="graph-ymax" type="text" maxlength=5/></li>')
						   .append('<li><label for="graph-yticks">y ticks</label><input id="graph-yticks" type="text" maxlength=2/></li>');
		$('#graphProperties ul').append('<li><label for="graph-points">Points</label><input id="graph-points" type="text" maxlength=4/></li>')
							 .append('<li><label for="graph-adjustwidth">Width</label><input id="graph-adjustwidth" type="text" maxlength=4/></li>')
							 .append('<li><label for="graph-adjustheight">Height</label><input id="graph-adjustheight" type="text" maxlength=4/></li>')
							 .append('<li><input id="graph-scrollable" type="checkbox" maxlength=4 /><label for="graph-scrollable">Scrollable</label></li>');
		
		$('#graphErrorMessages').hide();
		
		$.each(targetGraphContents['content'], function(index,functionVal)
        {
            addGraphFunction();
			$('#graphFunctions ul').children(':last-child').children('.graphFunctionLabels').val(functionVal['label'].replace(/_/g,' '));
			$('#graphFunctions ul').children(':last-child').children('.graphFunctionEquations').val(functionVal['function']);
        });
		
        $('.deleteGraphFunction').die('click');
		$('.deleteGraphFunction').live('click',function(e)
		{
			$(this).parent('li').remove();
			updateGraph();
		});
		
        $('#insertGraphFunction').die('click');
		$('#insertGraphFunction').live('click',function(e)
		{
			addGraphFunction();
			updateGraph();
		});
		
		$('#graphFunctions').append('<a id="insertGraphFunction">Insert New Function</a>');
					 
		$('#graphEditorHolder').append('<div><ul><li><button class="cancel">Cancel</button><button class="create">Create</button></li></ul></div>');
		
        $("#graphParameters input.graphFunctionEquations").die('blur');
        $("#graphParameters input.graphFunctionEquations").live('blur',function(e)
        {
            $(this).val($(this).val().replace(/ /g,''));
        });
        
        $('#graphParameters input').die('blur');
		$('#graphParameters input').live('blur',function(e)
		{
			updateGraph();
		});
		
		updateParameters();
		
		if(scrollableStartsOn)
		{
			$('#graph-scrollable').attr('checked',true);
		}
		else
		{
			$('#graph-scrollable').attr('checked',false);
		}
		
		var createGraphStarted = false;
		var newInfoEntered = false;
		
		$('#graphEditorHolder').keydown(function(e)
		{
			newInfoEntered = true;	
		});
		
		$(lightBoxGraph).bind('click mousedown mouseup',function(e)
		{
			updateGraph();
			e.preventDefault();
			graphILO.handleUserEvent(e);
			updateParameters();
			updateGraph();
		});
		
		$(lightBoxGraph).bind('mouseout mousemove',function(e)
		{
			if($('#graphErrorMessages').css('display')=='none'&&!newInfoEntered)
			{
				updateGraph();
				e.preventDefault();
				graphILO.handleUserEvent(e);
				updateParameters();
			}
		});
		
		$('#graph-xmin').focus();
        
        function createGraph()
        {
            if(!createGraphStarted)
			{
				updateGraph();
				createGraphStarted = true;
                
                var newArray = ILOContents.ILOArray[$(lightBoxGraph).attr('id')]
                newArray['attributes']['scrollable'] = $('#graph-scrollable').val()=='on' ? true : false;

				if(typeof(targetGraph) == 'undefined')
				{
					targetGraph = document.createElement('div');
                    ilo.insertILO(insertionPoint,targetGraph,'after');
					
					ilo.createILO(targetGraph,newArray);
				}
				else
				{
					ilo.editILO($(targetGraph).attr('id'),newArray);
				}
				
				graphILO.display(targetGraph);
	
                delete ILOContents.ILOArray['ilo-1'];
				$('#lightbox').fadeOut('fast',function() { console.log(this); $(this).remove(); });
				$('#overlay').fadeOut('fast',function() { $(this).remove();});
			}
        }
        
        function cancel()
        {
            delete ILOContents.ILOArray['ilo-1'];
            $('#lightbox').fadeOut('fast',function() { console.log(this); $(this).remove(); });
			$('#overlay').fadeOut('fast',function() { $(this).remove(); });
        }
        
        $('#graphEditorHolder input[type="text"]').keydown(function(e)
        {
            switch(e.keyCode)
            {
                // Enter
                case 13:
                    createGraph();
                    break;
                // Escape
                case 27:
                    cancel();
                    break;
            }
        });
		
		$('#graphEditorHolder button.create').click(function()
		{
			createGraph();
		});
		
		$('#graphEditorHolder button.cancel').click(function()
		{
			cancel();
		});
		
		centerLightBox();
	}
}

