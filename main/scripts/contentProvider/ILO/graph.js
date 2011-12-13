////////////////////////////////////////////////////////////////
// The graph namespace receives and processes events from     //
// rangeTraverse.	When the caret is within a graph or       //
// when a graph is clicked, the graph is highlighted,  		  //
// and users have the option of editing or deleting the 	  //
// graph. 												  	  //
//															  //
// REQUIRES: rangeTraverse.js, jQuery						  //
////////////////////////////////////////////////////////////////

var graph = 
{    
    // DESC: createGraphStarted is set to true if a graph has started to be created
    createGraphStarted: false,
    
	// DESC: creates a lightbox in which the content provider can edit or add a graph
	// PARAMETER: targetGraph is the ILO to be edited.  If it is undefined, a new ILO will be added at the caret position
	// RETURNS: void
	editMode: function(targetGraph)
	{
		ilo.checkForRepeatILOs();
		var targetGraphContents = $.extend({},ILOContents.ILOArray[$(targetGraph).attr('id')]);

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
        
        function addGraphFunction(type)
		{
			if($('#graphFunctions ul').children('li').size()<6)
			{
				var newGraphFunction = $('<li></li>');
				
                if(type=="function")
                {
                    newGraphFunction.append('<label>Label</label>')
                                    .append('<input class="graphFunctionLabels" type="text"/>')
                                    .append('<label>Function</label>')
                                    .append('<input class="graphFunctionEquations"type="text"/>')
                                    .append('<span class="graphMapping">Mapping</span>')
                                    .append('<img class="deleteGraphFunction" src="img/x.png" />');
                }
                else if(type=="mapping")
                {
                    newGraphFunction.append('<label>Label</label>')
                                    .append('<input class="graphFunctionLabels" type="text"/>')
                                    .append('<span class="graphMapping">Edit Mapping</span>')
                                    .append('<img class="deleteGraphFunction" src="img/x.png" />');
                }
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
            var targetGraphContents = {type:'graph',version:'1.0',attributes:{xmin:-10,xmax:10,xticks:10,ymin:-6,ymax:6,yticks:6,points:100},content:{}};
			ILOContents.setILOArray($(lightBoxGraph).attr('id'),targetGraphContents);
			graphILO.display(lightBoxGraph);
			scrollableStartsOn = true;
		}
		else
		{
			ILOContents.setILOArray($(lightBoxGraph).attr('id'),targetGraphContents);
			var targetGraphData = graphILO.checkAllGraphData(targetGraphContents);
			
			graphILO.display(lightBoxGraph);
			
			var scrollableStartsOn = targetGraphData.scrollable==true ? true : false;
		}
		
		
		$('#graphEditorHolder').append('<div id="graphErrorMessages"><div></div></div><div id="graphParameters"><div id="graphSlideHolder"><div id="generalGraphParameters"></div></div></div>');
		$('#generalGraphParameters').append('<div id="graphXAxis"><h5>x-axis</h5><ul></ul></div>')
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
		
        if(scrollableStartsOn)
		{
			$('#graph-scrollable').attr('checked',true);
		}
		else
		{
			$('#graph-scrollable').attr('checked',false);
		}
        
		$('#graphErrorMessages').hide();
		
		$.each(targetGraphContents['content'], function(index,functionVal)
        {
            if("mapping" in functionVal)
            {
                addGraphFunction("mapping");
                $('#graphFunctions ul').children(':last-child').children('.graphFunctionLabels').val(functionVal['label'].replace(/_/g,' '));
                $('#graphFunctions ul').children(':last-child').children('.graphMapping')[0].mappingObject = functionVal.mapping;
            }
            else
            {
                addGraphFunction("function");
                $('#graphFunctions ul').children(':last-child').children('.graphFunctionLabels').val(functionVal['label'].replace(/_/g,' '));
                $('#graphFunctions ul').children(':last-child').children('.graphFunctionEquations').val(functionVal['function']);
            }
        });
        
        $('#graphFunctions').append('<span id="insertGraphFunction">Insert New Function</a>');
					 
		$('#graphEditorHolder').append('<div><ul><li><button class="cancel">Cancel</button><button class="create">Create</button></li></ul></div>');
		
        $('.deleteGraphFunction').die('click');
		$('.deleteGraphFunction').live('click',function(e)
		{
			$(this).parent('li').remove();
			graph.updateGraph();
		});
        
        $('.graphMapping').die('click');
        $('.graphMapping').live('click',function(e)
        {
            graph.enterMappingMode(this);
        });

		$('#insertGraphFunction').bind('click',function(e)
		{
			addGraphFunction("function");
			graph.updateGraph();
		});
		
        $("#graphParameters input.graphFunctionEquations").die('blur');
        $("#graphParameters input.graphFunctionEquations").live('blur',function(e)
        {
            $(this).val($(this).val().replace(/ /g,''));
        });
        
        $('#graphParameters input').die('blur');
		$('#graphParameters input').live('blur',function(e)
		{
			graph.updateGraph();
		});
		
		updateParameters();
		
		graph.createGraphStarted = false;
		var newInfoEntered = false;
		
		$('#graphEditorHolder').keydown(function(e)
		{
			newInfoEntered = true;	
		});
		
		$(lightBoxGraph).bind('click mousedown mouseup',function(e)
		{
			graph.updateGraph();
			e.preventDefault();
			graphILO.handleUserEvent(e);
			updateParameters();
			graph.updateGraph();
		});
		
		$(lightBoxGraph).bind('mouseout mousemove',function(e)
		{
			if($('#graphErrorMessages').css('display')=='none'&&!newInfoEntered)
			{
				graph.updateGraph();
				e.preventDefault();
				graphILO.handleUserEvent(e);
				updateParameters();
			}
		});
		
		$('#graph-xmin').focus();
        
        function createGraph()
        {
            if(!graph.createGraphStarted)
			{
                function afterILOCreation()
                {
                    graphILO.display(targetGraph);
	
                    delete ILOContents.ILOArray['ilo-1'];
                    $('#lightbox').fadeOut('fast',function() {$(this).remove();});
                    $('#overlay').fadeOut('fast',function() {$(this).remove();});
                }
                
				graph.updateGraph();
				graph.createGraphStarted = true;
                
                var newArray = ILOContents.ILOArray[$(lightBoxGraph).attr('id')]
                newArray['attributes']['scrollable'] = $('#graph-scrollable').val()=='on' ? true : false;

				if(typeof(targetGraph) == 'undefined' || $('#content').find(targetGraph).size()==0)
				{
					targetGraph = document.createElement('div');
                    ilo.insertILO(insertionPoint,targetGraph,'after');

					ilo.createILO(targetGraph,newArray,afterILOCreation, function(targetGraph){graph.createGraphStarted = false; $(targetGraph).remove();}, [targetGraph]);
				}
				else
				{
					ilo.editILO($(targetGraph).attr('id'),newArray,afterILOCreation, function(){graph.createGraphStarted = false});
				}
			}
        }
        
        function cancel()
        {
            delete ILOContents.ILOArray['ilo-1'];
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
			$('#overlay').fadeOut('fast',function() {$(this).remove();});
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
	},
    
    updateGraph: function()
    {
        var lightBoxGraph = $('#graphEditorHolder .ilo[data-ilotype="graph"]');
        
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
                if(typeof(value)=="string")
                {
                    var isFunctionValue = formValidator.isFunction(value);
                    
                    if(isFunctionValue!="true")
                    {
                        errorMessages.push("In function "+eval(index+1)+", "+isFunctionValue);	
                    }
                }
                else
                {
                    $.each(value,function(i,functionVal)
                    {
                        if("formula" in functionVal)
                        {
                            var isFunctionValue = formValidator.isFunction(functionVal.formula);
                            
                            if(isFunctionValue!="true")
                            {
                                errorMessages.push("In function "+eval(index+1)+", "+isFunctionValue);	
                            }
                        }
                    });
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

        $('#graphFunctions ul li').each(function()
        {
            if($(this).find('.graphFunctionEquations').size()>0)
            {
                updatedGraphFunctions.push($(this).find('.graphFunctionEquations').val());
            }
            else
            {
                updatedGraphFunctions.push($(this).find('.graphMapping').get(0).mappingObject);
            }
        });

        if(validateGraphInputs(updatedGraphData, updatedGraphFunctions))
        {
            graphILO.setAllGraphData(ILOContents.ILOArray[$(lightBoxGraph).attr('id')]['attributes'], updatedGraphData);

            ILOContents.ILOArray[$(lightBoxGraph).attr('id')]['content'] = {};

            $.each(updatedGraphFunctions, function(index,value)
            {
                if(typeof(value)=="string")
                {
                    ILOContents.ILOArray[$(lightBoxGraph).attr('id')]['content'][index] = {'label':$('.graphFunctionLabels:eq('+index+')').val().replace(/ /g,'_'),'function':$('#graphFunctions ul li:eq('+index+') .graphFunctionEquations').val()};
                }
                else
                {
                    ILOContents.ILOArray[$(lightBoxGraph).attr('id')]['content'][index] = {"mapping":value,'label':$('.graphFunctionLabels:eq('+index+')').val().replace(/ /g,'_')};
                }
            });

            graphILO.display(lightBoxGraph);

            newInfoEntered=false;
        }
    },
    
    // DESC: enters mapping editing mode
    // RETURNS: void
    enterMappingMode: function(mappingLink)
    {
        graphMappingEntity.currentPosition = 0;
        graphMappingEntity.slideIconPosition = 0;
        graphMappingEntity.mappingLink = mappingLink;
        var mappingEditor = $("<div id='mappingEditor'><div id='graphMappingSlides'><div id='graphMappingSlideHolder'></div></div><span id='backToGeneralGraphEditor'>&lt;&lt; Done</span><span id='insertNewMappingObject'>Insert New Object</span></div>");
        var mappingNavigation = $("<div id='graphMappingNavigation'><span class='graphMappingSlideControl' id='leftControl'><img src='img/left_arrow.png' /></span><div id='graphMappingIcons'><ul></ul></div><span class='graphMappingSlideControl' id='rightControl'><img src='img/right_arrow.png' /></span></div>");
        mappingEditor.prepend(mappingNavigation);
        
        if("mappingObject" in mappingLink)
        {
            graphMappingEntity.updateMappingSlides(mappingLink.mappingObject,mappingEditor);
        }
        else
        {
            var slide = $("<div class='slide'><h5>Mapping</h5><ul></ul></div>");
            // fill in the old formula
            var oldFormula = $(mappingLink).prev('.graphFunctionEquations').val();
            slide.children('ul').append(graphMappingEntity.getMappingHTML("function"));
            slide.find('[name="formula"]').val(oldFormula);
            
            // remove the function input box and change the mapping link text
            $(mappingLink).prev('.graphFunctionEquations').prev('label').remove();
            $(mappingLink).prev('.graphFunctionEquations').remove();
            graphMappingEntity.updateMappingLink();
            $(mappingLink).text('Edit Mapping');

            // append the slide to the mapping editor
            mappingEditor.find("#graphMappingSlides>#graphMappingSlideHolder").append(slide);
        }

        $('#graphSlideHolder').append(mappingEditor);
        
        $('#graphSlideHolder').animate({'marginLeft' : -($('#generalGraphParameters').outerWidth(true)+parseInt($('#mappingEditor').css('margin-left')))},300,'swing',function()
        {
            mappingNavigation.remove().prependTo(mappingEditor);
            graphMappingEntity.updateMappingLink();
            graphMappingEntity.updateSlideIcons(graphMappingEntity.mappingLink,graphILO.checkAllGraphData(ILOContents.ILOArray['ilo-1']));
            graphMappingEntity.updateMappingSlidesWidth();
            graphMappingEntity.updateSlideIconControlDisplay();
            graph.updateGraph();
            
            $('#graphMappingIcons ul').sortable();
            
            $('#graphMappingIcons ul').bind('sortstop',function(e,ui)
            {
                var currentSlide = $('#graphMappingSlideHolder .slide').eq(graphMappingEntity.currentPosition);
                var currentOrder = $(ui.item).attr('data-order');
                var newOrder = $(ui.item).prevAll().size();
                
                if(newOrder>0)
                {
                    if(newOrder<=currentOrder)
                    {
                        $('#graphMappingSlideHolder .slide').eq(currentOrder).insertAfter($('#graphMappingSlideHolder .slide').eq(newOrder-1))
                    }
                    else
                    {
                        $('#graphMappingSlideHolder .slide').eq(currentOrder).insertAfter($('#graphMappingSlideHolder .slide').eq(newOrder))
                    }
                }
                else
                {
                    $('#graphMappingSlideHolder .slide').eq(currentOrder).prependTo('#graphMappingSlideHolder');
                }
                
                var currentSlideNewPosition = currentSlide.prevAll('.slide').size();
                
                graphMappingEntity.updateMappingLink();
                graphMappingEntity.updateSlideIcons(graphMappingEntity.mappingLink,graphILO.checkAllGraphData(ILOContents.ILOArray['ilo-1']));
                graphMappingEntity.selectSlide(currentSlideNewPosition);
                graph.updateGraph();
            });
        });
        
        $('#generalGraphParameters').fadeTo(300,0);
        
        $('#backToGeneralGraphEditor').die('click');
        $('#backToGeneralGraphEditor').live('click',function()
        {
            graph.exitMappingMode();
        });
        
        $('#insertNewMappingObject').die('click');
        $('#insertNewMappingObject').live('click',function()
        {
            graphMappingEntity.insertNewMappingObject();
        });
        
        $('.graphTypes').die('change');
        $('.graphTypes').live('change',function()
        {
            var slideType = $(this).val();
            var parentSlide = $(this).parents('.slide');
            var slideInputClone = $(this).parents('.slide').find('input,textarea');
            
            $(this).parents('.slide').find('ul').empty();
            parentSlide.find('ul').append(graphMappingEntity.getMappingHTML(slideType));
            graphMappingEntity.transferSlideData(slideInputClone, parentSlide)
            graphMappingEntity.updateMappingLink();
            graphMappingEntity.updateSlideIcons(graphMappingEntity.mappingLink,graphILO.checkAllGraphData(ILOContents.ILOArray['ilo-1']));
            graph.updateGraph();
        });
        
        $('.slideIcon').die('click');
        $('.slideIcon').live('click',function()
        {
           graphMappingEntity.selectSlide($(this).prevAll('.slideIcon').size()); 
           graphMappingEntity.updateMappingLink();
           graph.updateGraph();
        });
        
        $('.slide input').die('blur change');
        $('#graphSlideHolder .slide input, #graphSlideHolder .slide select:not(.graphTypes), #graphSlideHolder .slide textarea').live('blur change', function()
        {
            graphMappingEntity.updateMappingLink();
            graphMappingEntity.updateSlideIcons(graphMappingEntity.mappingLink,graphILO.checkAllGraphData(ILOContents.ILOArray['ilo-1']));
            graph.updateGraph();
        });
        
        $('.graphMappingSlideControl#rightControl').die('click');
        $('.graphMappingSlideControl#rightControl').live('click',function()
        {
            $('#graphMappingIcons ul').animate({'margin-left':parseInt($('#graphMappingIcons ul').css('margin-left'))-$('.slideIcon').first().outerWidth(true)},300);
            graphMappingEntity.slideIconPosition++;
            graphMappingEntity.updateSlideIconControlDisplay();
        });
        
        $('.graphMappingSlideControl#leftControl').die('click');
        $('.graphMappingSlideControl#leftControl').live('click',function()
        {
            $('#graphMappingIcons ul').animate({'margin-left':parseInt($('#graphMappingIcons ul').css('margin-left'))+$('.slideIcon').first().outerWidth(true)},300);
            graphMappingEntity.slideIconPosition--;
            graphMappingEntity.updateSlideIconControlDisplay();
        });
        
        $('.slide .deleteMappingObject').die('click');
        $('.slide .deleteMappingObject').live('click', function()
        {
            $(this).parents('.slide').first().remove();
            graphMappingEntity.updateMappingLink();
            graphMappingEntity.updateSlideIcons(graphMappingEntity.mappingLink,graphILO.checkAllGraphData(ILOContents.ILOArray['ilo-1']));
            graphMappingEntity.updateMappingSlidesWidth();
            graph.updateGraph();
            if(graphMappingEntity.currentPosition==graphMappingEntity.numberOfSlides)
            {
                graphMappingEntity.selectSlide(graphMappingEntity.numberOfSlides-1);
            }
        });
    },
    
    // DESC: exits mapping mode and returns to general editing mode
    // RETURNS: void
    exitMappingMode: function()
    {
        graphMappingEntity.updateMappingLink();
        $('#generalGraphParameters').fadeTo(0,1);
        $('.graphMappingSlideControl').animate({'marginLeft' : ($('#generalGraphParameters').outerWidth(true)+parseInt($('#mappingEditor').css('margin-left')))},0,'swing',function()
        {
        });
        $('#graphSlideHolder').animate({'marginLeft' : 0},300,'swing',function()
        {
            $("#mappingEditor").remove();
        });
    }
}

var graphMappingEntity =
{
    numberOfSlides: 1,
    currentPosition: 0,
    slideIconPosition: 0,
    mappingLink: "",
    graphTypes: "<option value='function'>Function</option><option value='integral'>Integral</option><option value='polarequation'>Polar Equation</option><option value='asymptote'>Asymptote</option><option value='periodicasymptote'>Periodic Asymptote</option><option value='formulapoints'>Points by Formula</option><option value='individualpoints'>Points by Coordinates</option>",
    getMappingHTML:  function(typeOfGraph)
    {
        var graphTypes = $("<select></select>").append(graphMappingEntity.graphTypes).children('option[value="'+typeOfGraph+'"]').attr('selected','selected').parent().remove().html();
        if(typeOfGraph=="function")
        {
            return "<li><label>Type</label><select class='graphTypes'>"+graphTypes+"</select><img class='deleteMappingObject' src='img/x.png' /></li>"+
                   "<li><label>Formula</label><input name='formula' type='text' /><label>Inverted</label><input name='inverted' type='checkbox' /></li>"+
                   "<li><ul><li><label>Left Bound</label><input name='leftbound' type='text' /></li><li><label>Right Bound</label><input name='rightbound' type='text' /></li><li><label>Points</label><input name='points' type='text' /></li></ul></li>";
        }
        else if(typeOfGraph=="integral")
        {
            return "<li><label>Type</label><select class='graphTypes'>"+graphTypes+"</select><img class='deleteMappingObject' src='img/x.png' /></li>"+
               "<li><label>Formula</label><input name='formula' type='text' /></li>"+
               "<li><ul><li><label>Left Bound</label><input name='leftbound' type='text' /></li><li><label>Right Bound</label><input name='rightbound' type='text' /></li><li><label>Points</label><input name='points' type='text' /></li></ul></li>"+
               "<li><ul><li><label>Left Limit</label><input name='leftlimit' type='text' /></li><li><label>Right Limit</label><input name='rightlimit' type='text' /></li></ul></li>";
        }
        else if(typeOfGraph=="asymptote")
        {
             return "<li><label>Type</label><select class='graphTypes'>"+graphTypes+"</select><img class='deleteMappingObject' src='img/x.png' /></li>"+
               "<li><label>Formula</label><input name='formula' type='text' /><label>Inverted</label><input name='inverted' type='checkbox' /></li>"+
               "<li><ul><li><label>Left Bound</label><input name='leftbound' type='text' /></li><li><label>Right Bound</label><input name='rightbound' type='text' /></li><li><label>Points</label><input name='points' type='text' /></li></ul></li>";
        }
        else if(typeOfGraph=="periodicasymptote")
        {
            return "<li><label>Type</label><select class='graphTypes'>"+graphTypes+"</select><img class='deleteMappingObject' src='img/x.png' /></li>"+
               "<li><label>Formula</label><input name='formula' type='text' /><label>Inverted</label><input name='inverted' type='checkbox' /></li>";
        }
        else if(typeOfGraph=="polarequation")
        {
            return "<li><label>Type</label><select class='graphTypes'>"+graphTypes+"</select><img class='deleteMappingObject' src='img/x.png' /></li>"+
               "<li><label>Formula</label><input name='formula' type='text' /></li>"+
               "<li><ul><li><label>Left Bound</label><input name='leftbound' type='text' /></li><li><label>Right Bound</label><input name='rightbound' type='text' /></li><li><label>Points</label><input name='points' type='text' /></li></ul></li>";
        }
        else if(typeOfGraph=="formulapoints")
        {
             return "<li><label>Type</label><select class='graphTypes'>"+graphTypes+"</select><img class='deleteMappingObject' src='img/x.png' /></li>"+
                   "<li><label>Formula</label><input name='formula' type='text' /><label>Inverted</label><input name='inverted' type='checkbox' /></li>"+
                   "<li><ul><li><label>Left Bound</label><input name='leftbound' type='text' /></li><li><label>Right Bound</label><input name='rightbound' type='text' /></li><li><label>Points</label><input name='points' type='text' /></li></ul></li>";
        }
        else if(typeOfGraph=="individualpoints")
        {
            return "<li><label>Type</label><select class='graphTypes'>"+graphTypes+"</select><img class='deleteMappingObject' src='img/x.png' /></li>"+
               "<li><label>Points</label><textarea name='pointlist' rows='5' columns='30' /></li>"+
               "<li><label>Fill</label><input name='fill' type='checkbox' /></li>";
        }
    },
    
    // DESC: inserts a new mapping object into the current mapping
    // PARAMETER: type is the type of mapping to be added
    // RETURNS: void
    insertNewMappingObject: function(type)
    {
        type = typeof(type)=='undefined' ? "function" : type;
        var slide = $("<div class='slide'><h5>Mapping</h5><ul></ul></div>");
        slide.children('ul').append(graphMappingEntity.getMappingHTML(type));
        
        if($('#graphMappingSlideHolder').children('.slide').size()>0)
        {
            $('#graphMappingSlideHolder').children('.slide').eq(graphMappingEntity.currentPosition).after(slide);
        }
        else
        {
            $('#graphMappingSlideHolder').append(slide);
        }
        graphMappingEntity.updateMappingSlidesWidth();
        graphMappingEntity.updateMappingLink();
        graphMappingEntity.updateSlideIcons(graphMappingEntity.mappingLink,graphILO.checkAllGraphData(ILOContents.ILOArray['ilo-1']));
        graphMappingEntity.updateSlideIconControlDisplay();
    },
    
    // DESC: updates slide icon control display
    // RETURNS: void
    updateSlideIconControlDisplay: function()
    {
        if(graphMappingEntity.slideIconPosition<(graphMappingEntity.numberOfSlides-4))
        {
            $('.graphMappingSlideControl#rightControl').css('visibility','visible');
        }
        else
        {
            $('.graphMappingSlideControl#rightControl').css('visibility','hidden');
        }
        
        if(graphMappingEntity.slideIconPosition>0)
        {
            $('.graphMappingSlideControl#leftControl').css('visibility','visible');
        }
        else
        {
            $('.graphMappingSlideControl#leftControl').css('visibility','hidden');
        }
    },
    
    // DESC: fills input fields to match the mapping link
    // PARAMETER: mappingObject is the object that contains the characteristics for the slides
    // PARAMETER: mappingEditor is the editor to which to attach the slide
    // RETURNS: void
    updateMappingSlides: function(mappingObject,mappingEditor)
    {
        $.each(mappingObject, function(index,functionVal)
        {
            var newSlide = $("<div class='slide'><h5>Mapping</h5><ul></ul></div>");
            newSlide.children('ul').append(graphMappingEntity.getMappingHTML(functionVal.type));
            if("formula" in functionVal){newSlide.find('[name="formula"]').val(functionVal.formula)}
            if("inverted" in functionVal && (functionVal.inverted===true || functionVal.inverted==="true")){newSlide.find('[name="inverted"]').attr('checked','checked')}
            if("domain" in functionVal && "leftbound" in functionVal.domain){newSlide.find('[name="leftbound"]').val(functionVal.domain.leftbound)}
            if("domain" in functionVal && "rightbound" in functionVal.domain){newSlide.find('[name="rightbound"]').val(functionVal.domain.rightbound)}
            if("points" in functionVal){newSlide.find('[name="points"]').val(functionVal.points)}
            if("leftLimitOfIntegration" in functionVal){newSlide.find('[name="leftlimit"]').val(functionVal.leftLimitOfIntegration)}
            if("rightLimitOfIntegration" in functionVal){newSlide.find('[name="rightlimit"]').val(functionVal.rightLimitOfIntegration)}
            if("pointlist" in functionVal){newSlide.find('[name="pointlist"]').val(graphMappingEntity.formatPointText(functionVal.pointlist))}
            if("fill" in functionVal && (functionVal.fill===true || functionVal.fill==="true")){newSlide.find('[name="fill"]').attr('checked','checked')}
            
            mappingEditor.find("#graphMappingSlides>#graphMappingSlideHolder").append(newSlide);
        });
    },
    
    // DESC: transfers data from a slide during a type change
    // PARAMETER: oldInputs are a clone of the old inputs
    // PARAMETER: slideToUpdate is the slide that is to get the old input values
    // RETURNS: void
    transferSlideData: function(oldInputs, slideToUpdate)
    {
        slideToUpdate.find('[name="formula"]').val(oldInputs.filter('[name="formula"]').val());
        slideToUpdate.find('[name="leftbound"]').val(oldInputs.filter('[name="leftbound"]').val());
        slideToUpdate.find('[name="rightbound"]').val(oldInputs.filter('[name="rightbound"]').val());
        slideToUpdate.find('[name="leftlimit"]').val(oldInputs.filter('[name="leftlimit"]').val());
        slideToUpdate.find('[name="rightlimit"]').val(oldInputs.filter('[name="rightlimit"]').val());
        slideToUpdate.find('[name="points"]').val(oldInputs.filter('[name="points"]').val());
        slideToUpdate.find('[name="pointlist"]').val(oldInputs.filter('[name="pointlist"]').val());
        slideToUpdate.find('[name="inverted"]').attr("checked",oldInputs.filter('[name="inverted"]').attr("checked"));
    },
    
    // DESC: updates graph mapping slides' to account for all the slides
    // RETURNS: void
    updateMappingSlidesWidth: function()
    {
        $('#graphMappingSlideHolder').width($('#graphMappingSlideHolder>.slide').size()*($('#graphMappingSlideHolder>.slide').first().outerWidth()+2*parseInt($('#graphMappingSlideHolder>.slide').css('border-left-width'))+2));
    },
    
    // DESC: select a particular mapping slide
    // PARAMETER: slideNumber is the slide number to get to
    // RETURNS: void
    selectSlide: function(slideNumber)
    {
        $('.slideIcon').removeClass('selected');
        $('.slideIcon:eq('+slideNumber+')').addClass('selected');
        graphMappingEntity.currentPosition = slideNumber;
        
        $('#graphMappingSlideHolder').animate({'marginLeft' : (-$('#graphMappingSlideHolder>.slide').first().outerWidth(true))*slideNumber},300,'swing',function()
        {
        });
    },
    
    // DESC: update mapping link with a new mappingObject
    // RETURNS: void
    updateMappingLink: function()
    {
        var updatedContent = [];
        $('#graphMappingSlideHolder>.slide').each(function(index,mappingSlide)
        {
            var newFunction = {};
            newFunction.type = $(mappingSlide).find('.graphTypes option:selected').val();
            switch(newFunction.type)
            {
                case 'integral':
                    newFunction.leftLimitOfIntegration = $(mappingSlide).find('[name="leftlimit"]').val();
                    newFunction.rightLimitOfIntegration = $(mappingSlide).find('[name="rightlimit"]').val();
                    // no break, flow into next cases
                case 'function': case 'asymptote': case 'formulapoints':
                    newFunction.inverted = $(mappingSlide).find('[name="inverted"]').is(':checked') ? true : false;
                    // no break, flow into next cases
                case 'polarequation':
                    newFunction.formula = $(mappingSlide).find('[name="formula"]').val();
                    newFunction.domain = {};
                    newFunction.domain.leftbound = $(mappingSlide).find('[name="leftbound"]').val();
                    newFunction.domain.rightbound = $(mappingSlide).find('[name="rightbound"]').val();
                    newFunction.points = $(mappingSlide).find('[name="points"]').val();
                    break;
                case 'periodicasymptote':
                    newFunction.formula = $(mappingSlide).find('[name="formula"]').val();
                    newFunction.inverted = $(mappingSlide).find('[name="inverted"]').is(':checked') ? true : false;
                    break;
                case 'individualpoints':
                    newFunction.pointlist = graphMappingEntity.extractPoints($(mappingSlide).find('[name="pointlist"]').val());
                    newFunction.fill = $(mappingSlide).find('[name="fill"]').attr('checked') == 'checked';
                    break;
            }
            updatedContent[index] = $.extend({},newFunction);
        });
        graphMappingEntity.mappingLink.mappingObject = updatedContent;
    },
    
    // DESC: formats the points from a CSV like listing to one that can be digested by flot
    // PARAMETER: pointText is the text that is to be parsed
    // RETURNS: properly formatted string that can be read by flot
    extractPoints: function(pointText)
    {
        return ("["+pointText.replace(/\n/g,"],[").replace(/\[\],/g,"").replace(/,\[$/,"]")+"]").replace(/\]+/g,"]");
    },
    
    // DESC: formats the points from the mapping object into a CSV like listing
    // PARAMETER: points is the text describing points that can be read by flot
    // RETURNS: CSV-like listing
    formatPointText: function(points)
    {
        if(typeof(points)!="undefined")
        {
            return points.replace(/\],\[/g,"\n").replace(/[\[\]]/g,"");
        }
    },
    
    // DESC: updates the slide icons in the graph mapping navigation
    // PARAMETER: mappingLink is the link that contains the mapping information
    // PARAMETER: graphProperties contains the properties of the main lightbox graph
    // RETURNS: void
    updateSlideIcons: function(mappingLink,graphProperties)
    {
        $('#graphMappingIcons ul').empty();
        graphMappingEntity.numberOfSlides = 0;
        var iterator = 0;

        $.each(mappingLink.mappingObject, function(index,functionVal)
        {
            var newSlideIcon = $('<li class="slideIcon" data-order="'+index+'"></li>');
            
            if(graphMappingEntity.currentPosition==iterator)
            {
                newSlideIcon.addClass('selected');
            }
            
            $('#graphMappingIcons ul').append(newSlideIcon);
            graphMappingEntity.drawGraphIcon(newSlideIcon,functionVal,graphProperties);
            graphMappingEntity.numberOfSlides++;
            iterator++;
        });
    },
    
    // DESC: draws a small icon graph
    // PARAMETER: graphIcon is the icon where the graph should be drawn
    // PARAMETER: formula is the object literal containing the formula to be graphed
    // PARAMETER: graphProperties contains the properties of the main lightbox graph 
    // RETURNS: void
    drawGraphIcon: function(graphIcon,formula,graphProperties)
    {
        var graphFuncs = graphILO.getGraphFunctions([{"mapping":[formula]}],graphProperties);

        var graphColor = graphILO.colors[$(graphMappingEntity.mappingLink).parents('li').first().prevAll('li').size()];

        $.each(graphFuncs,function(index)
        {
            graphFuncs[index].color = graphColor;
            if("lines" in graphFuncs[index]) {graphFuncs[index].lines.lineWidth = 1}
            if("points" in graphFuncs[index]) {graphFuncs[index].points.radius = 1}
            if("dashes" in graphFuncs[index]) {graphFuncs[index].dashes.lineWidth = 1}
        })

        $.plot(graphIcon,graphFuncs,
        {
            series: 
			{
				lines: {show: true},
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
                show: false
            }
        });
    }
}