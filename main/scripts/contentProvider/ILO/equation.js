////////////////////////////////////////////////////////////////
// The equation namespace receives and processes events from  //
// rangeTraverse.	When the caret is within equation or  //
// when an equation is clicked, the equation is highlighted,  //
// and users have the option of editing or deleting the 	  //
// equation. 												  //
//															  //
// REQUIRES: rangeTraverse.js, jQuery						  //
////////////////////////////////////////////////////////////////

var equation = 
{	
    // DESC: createEquationStarted is true if an equation has started to be added
    createEquationStarted: false,
    
	// DESC: creates a lightbox in which the content provider can edit or add an equation
	// PARAMETER: targetEquation is the ILO to be edited.  If it is undefined, a new ILO will be added at the caret position
	// RETURNS: void
	editMode: function(targetEquation)
	{
		ilo.checkForRepeatILOs();
		var equationData = typeof(targetEquation)=='undefined' ? "" : ILOContents.ILOArray[$(targetEquation).attr('id')]['content'];
        
		if($('#lightbox').size()>0)
		{
			return;	
		}

		if(typeof(targetEquation) == 'undefined')
		{
			if((!rangeTraverse.within('#content'))||rangeTraverse.within('.ilo')||rangeTraverse.within(':header'))
			{
				return;
			}
			insertionPoint = rangeTraverse.getCurrentRange();
		}

		createLightBox('#content','Equation Editor','<div id="EqEditorHolder"></div>',$('#content').width()/2);
		$('#EqEditorHolder').append('<ul></ul>');
		$('#EqEditorHolder ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');
		$('#equationText').val(equationData);
		newEquationEditor.updateEquation();
		$('#equationEditor').show();
		
		$('#tempEquationEditor ul').children().remove().prependTo('#EqEditorHolder ul');
		
		equation.createEquationStarted = false;
		centerLightBox();
        
        $('#equationText').focus();
        
        function createEquation(targetEquation)
        {
            if(!equation.createEquationStarted)
			{
                function afterILOCreation()
                {
                    equationILO.display(targetEquation);
                    $('#equationText').die('keydown');

                    delete ILOContents.ILOArray['ilo-1'];

                    $('#lightbox').fadeOut('fast',function() {$('#EqEditorHolder ul').children('li:not(:last-child)').remove().prependTo('#tempEquationEditor ul');$(this).remove()});
                    $('#overlay').fadeOut('fast',function() 
                                                 {
                                                     $(this).remove();
                                                     MathJax.Hub.Queue(function()
                                                     {
                                                         rangeTraverse.setCurrentRange(ilo.savedRange);
                                                     });
                                                 });
                }
                
				equation.createEquationStarted = true;
				if(typeof(targetEquation) == 'undefined' || $('#content').find(targetEquation).size()==0)
				{
                    targetEquation = document.createElement('span');
                    ilo.insertILO(insertionPoint, targetEquation, "insertNode");
					
					ilo.createILO(targetEquation,{'type':'equation','version':'1.0','content':$('#equationText').val()},afterILOCreation,function(targetEquation){equation.createEquationStarted = false; $(targetEquation).remove();}, [targetEquation]);
				}
				else
				{
                    console.log($(targetEquation).attr('id'));
					ilo.editILO($(targetEquation).attr('id'),{'type':'equation','version':'1.0','content':$('#equationText').val()},afterILOCreation,function(){ equation.createEquationStarted = false });
				}
			}
        }
        
        function cancel()
        {
            delete ILOContents.ILOArray['ilo-1'];
            $('#equationText').die('keydown');
            $('#lightbox').fadeOut('fast',function() {$('#EqEditorHolder ul').children('li:not(:last-child)').remove().prependTo('#tempEquationEditor ul');$(this).remove();});
			$('#overlay').fadeOut('fast',function() {$(this).remove();});
        }
        
        $('#EqEditorHolder button.create')[0].targetEquation = targetEquation;
		$('#EqEditorHolder button.create').click(function()
		{
			createEquation(this.targetEquation);
		});
        
        $('#EqEditorHolder button.cancel').click(function()
		{
			cancel();
		});
        
        $('#equationText').die('keydown');
        $('#equationText').live('keydown', function(e)
        {
            switch(e.keyCode)
            {
                // Enter
                case 13:
                    e.preventDefault();
                    createEquation(targetEquation);
                    break;
                // Escape
                case 27:
                    cancel();
                    break;
            }
        })
	}
}