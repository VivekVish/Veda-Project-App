////////////////////////////////////////////////////////////////
// The chemicalEquation object handles processing of content  //
// provider editing of chemical equations.                    //
//															  //
// REQUIRES: rangeTraverse.js, jQuery						  //
////////////////////////////////////////////////////////////////

var chemicalEquation = 
{	
	// DESC: creates a lightbox in which the content provider can edit or add an equation
	// PARAMETER: targetChemicalEquation is the ILO to be edited.  If it is undefined, a new ILO will be added at the caret position
	// RETURNS: void
	editMode: function(targetChemicalEquation)
	{
		ilo.checkForRepeatILOs();
		var equationData = typeof(targetChemicalEquation)=='undefined' ? "" : ILOContents.ILOArray[$(targetChemicalEquation).attr('id')]['content'];
        
		if($('#lightbox').size()>0)
		{
			return;	
		}

		if(typeof(targetChemicalEquation) == 'undefined')
		{
			if((!rangeTraverse.within('#content'))||rangeTraverse.within('.ilo')||rangeTraverse.within(':header'))
			{
				return;
			}
			insertionPoint = rangeTraverse.getCurrentRange();
		}

		createLightBox('#content','Chemical Equation Editor','<div id="chemicalEqEditorHolder"></div>',$('#content').width()/2);
		$('#chemicalEqEditorHolder').append('<ul></ul>');
		$('#chemicalEqEditorHolder ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');
		$('#chemicalEquationText').val(equationData);
		newEquationEditor.updateEquation();
		$('#chemicalEquationEditor').show();
		
		$('#tempChemicalEquationEditor ul').children().remove().prependTo('#chemicalEqEditorHolder ul');
		
		var createEquationStarted = false;
		centerLightBox();
        
        $('#chemicalEquationText').focus();
        
        function createEquation(targetChemicalEquation)
        {
            if(!createEquationStarted)
			{
				createEquationStarted = true;
				if(typeof(targetChemicalEquation) == 'undefined')
				{
                    targetChemicalEquation = document.createElement('span');
                    ilo.insertILO(insertionPoint, targetChemicalEquation, "insertNode");
					
					ilo.createILO(targetChemicalEquation,{'type':'chemicalEquation','version':'1.0','content':$('#chemicalEquationText').val()});
				}
				else
				{
					ilo.editILO($(targetChemicalEquation).attr('id'),{'type':'chemicalEquation','version':'1.0','content':$('#chemicalEquationText').val()});
				}
				
				chemicalEquationILO.display(targetChemicalEquation);
                $('#chemicalEquationText').die('keydown');
				
				$('#lightbox').fadeOut('fast',function() {$('#chemicalEqEditorHolder ul').children('li:not(:last-child)').remove().prependTo('#tempChemicalEquationEditor ul');$(this).remove()});
				$('#overlay').fadeOut('fast',function() 
                                             {
                                                 $(this).remove();
                                                 MathJax.Hub.Queue(function()
                                                 {
                                                     rangeTraverse.setCurrentRange(ilo.savedRange);
                                                 });
                                             });
			}
        }
        
        function cancel()
        {
            $('#chemicalEquationText').die('keydown');
            $('#lightbox').fadeOut('fast',function() {$('#chemicalEqEditorHolder ul').children('li:not(:last-child)').remove().prependTo('#tempChemicalEquationEditor ul');$(this).remove();});
			$('#overlay').fadeOut('fast',function() {$(this).remove();});
        }
        
        $('#chemicalEqEditorHolder button.create')[0].targetChemicalEquation = targetChemicalEquation;
		$('#chemicalEqEditorHolder button.create').click(function()
		{
			createEquation(this.targetChemicalEquation);
		});
        
        $('#chemicalEqEditorHolder button.cancel').click(function()
		{
			cancel();
		});
        
        $('#chemicalEquationText').live('keydown', function(e)
        {
            switch(e.keyCode)
            {
                // Enter
                case 13:
                    createEquation(targetChemicalEquation);
                    break;
                // Escape
                case 27:
                    cancel();
                    break;
            }
        })
	}
}

