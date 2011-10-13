////////////////////////////////////////////////////////////////
// The formValidator namespace has a variety of functions 	  //
// that take strings as arguments and determine whether they  //
// are of a certain form. 									  //
//															  //
// REQUIRES: jQuery						  					  //
////////////////////////////////////////////////////////////////

var formValidator =
{
	// DESC: checks whether the given string is an integer
	// PARAMETER: checkString is the string to be checked
	// RETURNS: boolean, true if checkString is an integer, false otherwise
	isInteger: function(checkString)
	{
		return checkString.replace(/[\-]{0,1}[0-9]+/,"")=="" ? true : false;
	},
	
	// DESC: checks whether the given string is a positive integer
	// PARAMETER: checkString is the string to be checked
	// RETURNS: boolean, true if checkString is a positive integer, false otherwise
	isPositiveInteger: function(checkString)
	{
		return checkString.replace(/[0-9]+/,"")=="" ? true : false;
	},
	
	// DESC: checks whether the given string is a number
	// PARAMETER: checkString is the string to be checked
	// RETURNS: boolean, true if checkString is a number, false otherwise
	isNumber: function(checkString)
	{
		return checkString.replace(/[\-]{0,1}[0-9]+[\.]*[0-9]*|[\-]{0,1}[0-9]*[\.]*[0-9]+]/,"")=="" ? true : false;
	},
    
    isPositiveNumber: function(checkString)
    {
        return checkString.replace(/[0-9]+[\.]*[0-9]*|[0-9]*[\.]*[0-9]+]/,"")=="" ? true : false;
    },
	
	// DESC: checks whether the given string is a valid function
	// PARAMETER: checkString is the string to be checked
	// RETURNS: returns string "true" if checkString is a function, an error message otherwise
	isFunction: function(checkString)
	{
		var countParentheses = 0;
		var countAbsValSigns = 0;
		
		// operators after an opening parenthesis or before a closing parenthesis
		if(checkString.search(/\(([\^]|[\+]|[\/]|[\*])/)>-1||checkString.search(/([\^]|[\+]|[\-]|[\/]|[\*])\)/)>-1)
		{
			return "operators follow an opening parenthesis or precede a closing parenthesis";	
		}
		
		// two operators together
		if(checkString.search(/([\^]|[\+]|[\-]|[\/]|[\*])([\^]|[\+]|[\/]|[\*])/)>-1)
		{
			return "two operators are side by side";
		}
		
		// operators before AND after an absolute value sign or letters and numbers before and after an absolute value sign
		if(checkString.search(/([\^]|[\+]|[\/]|[\*])[\|]([\^]|[\+]|[\/]|[\*])/)>-1||checkString.search(/[a-zA-Z0-9][\|][a-zA-Z0-9]/)>-1)
		{
			return "operators both precede and follow an absolute value sign";
		}
		
		// letters and numbers before and after an absolute value sign
		if(checkString.search(/[a-zA-Z0-9][\|][a-zA-Z0-9]/)>-1)
		{
			return "letters or numbers both precede and follow an absolute value sign";
		}
		
		// two absolute value signs together
		if(checkString.search(/[\|]{2}/)>-1)
		{
			return "two absolute value signs are side by side";
		}
		
		// invalid characters
		if(checkString.replace(/X|\.|x|e|pi|asin|acos|atan|acsc|asec|acot|sin|cos|tan|csc|sec|cot|abs|ln|log_|[0-9]|sqrt|\(|\)|\+|\-|\*|\/|\^|\|/g,"")!="")
		{
			return "invalid characters or functions are present";
		}
		
		// function not followed by an opening parenthesis
		if(checkString.search(/(asin|acos|atan|acsc|asec|acot|sin|cos|tan|csc|sec|cot|abs|ln|log_[0-9]+|log_x|sqrt)[^\(]/)>-1||checkString.search(/(asin|acos|atan|sin|cos|tan|abs|ln|log_[0-9]+|log_x|sqrt)$/)>-1)
		{
			return "a function is not followed by an opening parenthesis";
		}
		
		// starts with an operator
		if(checkString.search(/^([\+]|[\*]|[\/]|[\^]|[\)])/)>-1)
		{
			return "an operator starts the function";	
		}
		
		// ends with an operator or an opening parenthesis
		if(checkString.search(/([\+]|[\-]|[\*]|[\/]|[\^]|[\(]|[a-w]|[A-W])$/)>-1)
		{
			return "an operator or an opening parenthesis ends the function";
		}
		
		// letters next to numbers or numbers next to letters
		if(checkString.search(/[a-zA-Z][0-9]/)>-1||checkString.search(/[0-9][a-zA-Z]/)>-1)
		{
			return "letters are adjacent to numbers without operators between them";
		}		
		
		// numbers or letters after a closing parenthesis
		if(checkString.search(/\)[0-9a-zA-Z]/)>-1)
		{
			return "numbers or letters follow a closing parenthesis without an operator";	
		}
		
		// empty parenthesis or parentheses side by side
		if(checkString.search(/\(\)/)>-1)
		{
			return "a pair of parentheses is empty";
		}
		
		// parentheses side by side
		if(checkString.search(/\)\(/)>-1)
		{
			return "parentheses are side by side without an operator between them";
		}
		
		for(i=0;i<checkString.length;i++)
		{			
			if(checkString[i]=="(")
			{
				countParentheses++;	
			}
			else if(checkString[i]==")")
			{
				countParentheses--;
			}
			
			if(checkString[i]=="|")
			{
				if(i==0)
				{
					if(i+1>=checkString.length)	
					{
						return "the function is just a single absolute value sign";	
					}
					
					if(checkString[i+1].search(/\+|\*|\/|\^/)>-1)
					{
						return "an end absolute value sign starts the function";
					}
					else
					{
						countAbsValSigns++;	
					}
				}
				else if(i==checkString.length-1)
				{
					if(checkString[i-1].search(/\+|\-|\*|\/|\^/)>-1)
					{
						return "a start absolute value sign ends the function";
					}
					else
					{
						countAbsValSigns--;	
					}
				}
				else
				{
					if(checkString[i-1].search(/\+|\-|\*|\/|\^|\(/)>-1)
					{
						countAbsValSigns++;
					}
					else if(checkString[i+1].search(/\+|\-|\*|\/|\^|\)/)>-1)
					{
						countAbsValSigns--;
					}
					else
					{
						return "an absolute value sign is missing operators";	
					}
				}
			}
			
			if(countParentheses<0)
			{
				return "a closing parenthesis is missing an opening parenthesis";	
			}
			
			if(countAbsValSigns<0)
			{
				return "a close absolute value sign is missing an open absolute value sign";	
			}
		}
		
		if(countParentheses>0)
		{
			return "not all parentheses are closed";	
		}
		
		if(countAbsValSigns>0)
		{
			return "not all absolute value signs are closed";	
		}
		
		return "true";
		
	}
}