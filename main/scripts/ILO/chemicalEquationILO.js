////////////////////////////////////////////////////////////////
// The chemicalEquationILO object handles the display of     //
// chemistry equations ILOs as well as events from users      //
// but not from content providers.                            //
//                                                            //
//															  //
// REQUIRES: jQuery, flot									  //
////////////////////////////////////////////////////////////////

var chemicalEquationILO =
{
	// DESC: handles events from the user
	// PARAMETER: e is the event being passed
	// RETURNS: void
	handleUserEvent: function(e)
	{

	},
	
	// DESC: displays an individual chemistry equation ILO
	// PARAMETER: targetChemEquation is the equation to be drawn
	// RETURNS: void
	display: function(targetChemEquation)
	{
		$(targetChemEquation).html("\\(\\mathrm{"+ILOContents.ILOArray[$(targetChemEquation).attr('id')]['content']+"}\\)");
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	}
}