////////////////////////////////////////////////////////////////
// The equationILO object handles the display of equation     //
// ILOs as well as events from users but not from content     //
// providers.                                                 //
//															  //
// REQUIRES: jQuery, flot									  //
////////////////////////////////////////////////////////////////

var equationILO =
{
	// DESC: handles events from the user
	// PARAMETER: e is the event being passed
	// RETURNS: void
	handleUserEvent: function(e)
	{

	},
	
	// DESC: displays an individual equation ILO
	// PARAMETER: targetEquation is the equation to be drawn
	// RETURNS: void
	display: function(targetEquation)
	{
		$(targetEquation).html("\\("+ILOContents.ILOArray[$(targetEquation).attr('id')]['content']+"\\)");
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	}
}