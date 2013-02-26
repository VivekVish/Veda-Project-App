////////////////////////////////////////////////////////////////
// The equationEditor object creates an equation editor tied  //
// to a textbox, which stores TeX and a display area for the  //
// equation itself.  Different sets of buttons can be shown.  //
//															  //
// requires: MathJax 										  //
////////////////////////////////////////////////////////////////

// Images and display that correspond with each button
equationEditor.prototype.icons =
{
    'sum'				:	{'image':'\\sum'								,	'display':'\\sum'},
    'sum_limits' 		:   {'image':'\\sum_{a}^{b}'						,	'display':'\\sum_{}^{}'},
    'product'			:	{'image':'\\prod'								,	'display':'\\prod'},
    'product_limits'    :   {'image':'\\prod_{a}^{b}'   					,	'display':'\\prod_{}^{}'},
    'coproduct'			:	{'image':'\\coprod'								, 	'display':'\\coprod'},  
    'coproduct_limits'	:	{'image':'\\coprod_{a}^{b}'						,	'display':'\\coprod_{}^{}'},
    'square_root'		:	{'image':'\\sqrt{x}'							, 	'display':'\\sqrt{}'},
    'nth_root'			:	{'image':'\\sqrt[n]{x}'							, 	'display':'\\sqrt[]{}'},
    'exponent' 			:   {'image':'x^{b}'								, 	'display':'^{}'},
    'base'				:	{'image':'x_{b}'								,	'display':'_{}'},
    'base_exponent'		:	{'image':'x_{a}^{b}'							,	'display':'_{}^{}'},
    'bounds'			:	{'image':'_{a}^{b}\\textrm{C}'		 			,	'display':'_{}^{}\\textrm{}'},				
    'fraction'			:	{'image':'\\frac{a}{b}'							,	'display':'\\frac{}{}'},
    'partial_fraction'	:	{'image':'\\frac{\\partial }{\\partial x}'		,	'display':'\\frac{\\partial }{\\partial x}'},
    'sqr_partial_frac'	:	{'image':'\\frac{\\partial^2 }{\\partial x^2}'	,	'display':'\\frac{\\partial^2 }{\\partial x^2}'},
    'diff_frac'			:	{'image':'\\frac{\\mathrm{d} }{\\mathrm{d} x}'	,	'display':'\\frac{\\mathrm{d} }{\\mathrm{d} x}'},
    'integral'			:	{'image':'\\int'								,	'display':'\\int'},
    'line_integral'		:	{'image':'\\oint'								,	'display':'\\oint'},
    'line_int_limits'	:	{'image':'\\oint_{a}^{b}'						,	'display':'\\oint_{}^{}'},
    'double_integral'	:	{'image':'\\iint_{a}^{b}'						,	'display':'\\iint_{}^{}'},
    'intersection'		:	{'image':'\\bigcap '							, 	'display':'\\bigcap'},
    'var_intersection'	:	{'image':'\\bigcap_{a}^{b}'						, 	'display':'\\bigcap_{}^{}'},
    'union'				:	{'image':'\\bigcup'								, 	'display':'\\bigcup'},
    'var_union'			:	{'image':'\\bigcup_{a}^{b}'						, 	'display':'\\bigcup_{}^{}'},
    'limit'				:	{'image':'\\lim'								, 	'display':'\\lim_{}'},
    'plus_minus'		:	{'image':'\\pm'									, 	'display':'\\pm'},
    'minus_plus'		:	{'image':'\\mp'									, 	'display':'\\mp'},
    'times'				:	{'image':'\\times'								, 	'display':'\\times'},
    'asterisk'			:	{'image':'\\ast'								, 	'display':'\\ast'},
    'division'			:	{'image':'\\div'								, 	'display':'\\div'},
    'setminus'			:	{'image':'\\setminus'							, 	'display':'\\setminus'},
    'amalgamation'		:	{'image':'\\amalg'								, 	'display':'\\amalg'},
    'dagger'			:	{'image':'\\dagger'								, 	'display':'\\dagger'},
    'double_dagger'		:	{'image':'\\ddagger'							, 	'display':'\\ddagger'},
    'wr'				:	{'image':'\\wr'									,	'display':'\\wr'},
    'diamond'			:	{'image':'\\diamond'							, 	'display':'\\diamond'},
    'cap'				:	{'image':'\\cap'								, 	'display':'\\cap'},
    'square_cap'		:	{'image':'\\sqcap'								, 	'display':'\\sqcap'},
    'wedge'				:	{'image':'\\wedge'								, 	'display':'\\wedge'},
    'triangle'			:	{'image':'\\triangle'							, 	'display':'\\triangle'},
    'triangle_left'		:	{'image':'\\triangleleft'						, 	'display':'\\triangleleft'},
    'triangle_right'	:	{'image':'\\triangleright'						, 	'display':'\\triangleright'},
    'triangle_down'		:	{'image':'\\bigtriangledown'					, 	'display':'\\bigtriangledown'},
    'circle'			:	{'image':'\\circ'								, 	'display':'\\circ'},
    'ominus'			:	{'image':'\\ominus'								, 	'display':'\\ominus'},
    'om_slash'			:	{'image':'\\oslash'								, 	'display':'\\oslash'},
    'cup'				:	{'image':'\\cup'								, 	'display':'\\cup'},
    'square_cup'		:	{'image':'\\sqcup'								, 	'display':'\\sqcup'},
    'vee'				:	{'image':'\\vee'								, 	'display':'\\vee'},
    'bullet'			:	{'image':'\\bullet'								, 	'display':'\\bullet'},
    'oplus'				:	{'image':'\\oplus'								, 	'display':'\\oplus'},
    'otimes'			:	{'image':'\\otimes'								, 	'display':'\\otimes'},
    'odot'				:	{'image':'\\odot'								, 	'display':'\\otimes'},
    'cdot'				:	{'image':'\\cdot'								, 	'display':'\\cdot'},
    'union_plus'		:	{'image':'\\uplus'								, 	'display':'\\uplus'},
    'star'				:	{'image':'\\star'								, 	'display':'\\star'},
    'big_sqr_cup'		:	{'image':'\\bigsqcup'							, 	'display':'\\bigsqcup'},
    'horizontaldots'	:	{'image':'\\dots'								, 	'display':'\\dots'},
    'verticaldots'		:	{'image':'\\vdots'								, 	'display':'\\vdots'},
    'diagonaldots'		:	{'image':'\\ddots'								, 	'display':'\\ddots'},
    'section'			:	{'image':'\\S'									, 	'display':'\\S'},
    'paragraph'			:	{'image':'\\P'									, 	'display':'\\P'},
    'copyright'			:	{'image':'\\copyright'							, 	'display':'\\copyright'},
    'partial'			:	{'image':'\\partial'							, 	'display':'\\partial '},
    'imath'				:	{'image':'\\imath'								, 	'display':'\\imath'},
    'jmath'				:	{'image':'\\jmath'								, 	'display':'\\jmath'},
    'real'				:	{'image':'\\Re'									, 	'display':'\\Re'},
    'imaginary'			:	{'image':'\\Im'									, 	'display':'\\Im'},
    'forall'			:	{'image':'\\forall'								, 	'display':'\\forall'},
    'exists'			:	{'image':'\\exists'								, 	'display':'\\exists'},
    'top'				:	{'image':'\\top'								, 	'display':'\\top'},
    'Pmath'				:	{'image':'\\mathbb{P}'							, 	'display':'\\mathbb{P}'},
    'Nmath'				:	{'image':'\\mathbb{N}'							, 	'display':'\\mathbb{N}'},
    'Zmath'				:	{'image':'\\mathbb{Z}'							, 	'display':'\\mathbb{Z}'},
    'Imath'				:	{'image':'\\mathbb{I}'							, 	'display':'\\mathbb{I}'},
    'Qmath'				:	{'image':'\\mathbb{Q}'							, 	'display':'\\mathbb{Q}'},
    'Rmath'				:	{'image':'\\mathbb{R}'							, 	'display':'\\mathbb{R}'},
    'Cmath'				:	{'image':'\\mathbb{C}'							, 	'display':'\\mathbb{C}'},
    'angle'				:	{'image':'\\angle'								, 	'display':'\\angle'},
    'emptyset'			:   {'image':'\\emptyset'							, 	'display':'\\emptyset'},
    'infinity'			:	{'image':'\\infty'								, 	'display':'\\infty'}, 
    'wp'				:	{'image':'\\wp'									, 	'display':'\\wp'},  
    'dollar'			:	{'image':'\\$'									,	'display':'\\$'},
    'sqsubseteq'		:	{'image':'\\sqsubseteq'							,	'display':'\\sqsubseteq'},
    'subset'			:	{'image':'\\subset'								,	'display':'\\subset'},
    'subseteq'			:	{'image':'\\subseteq'							,	'display':'\\subseteq'},
    'in'				:	{'image':'\\in'									,	'display':'\\in'},
    'notin'				:	{'image':'\\notin'								,	'display':'\\notin'},
    'supset'			:	{'image':'\\supset'								,	'display':'\\supset'},
    'supseteq'			:	{'image':'\\supseteq'							,	'display':'\\supseteq'},
    'ni'				:	{'image':'\\ni'									,	'display':'\\ni'},
    'dot'				:	{'image':'\\dot{a}'								,	'display':'\\dot{}'},
    'hat'				:	{'image':'\\hat{a}'								,	'display':'\\hat{}'},
    'grave'				:	{'image':'\\grave{a}'							,	'display':'\\grave{}'},
    'tilde'				:	{'image':'\\tilde{a}'							,	'display':'\\tilde{}'},
    'bar'				:	{'image':'\\bar{a}'								,	'display':'\\bar{}'},
    'ddot'				:	{'image':'\\ddot{a}'							,	'display':'\\ddot{}'},
    'check'				:	{'image':'\\check{a}'							,	'display':'\\check{}'},
    'acute'				:	{'image':'\\acute{a}'							,	'display':'\\acute{}'},
    'breve'				:	{'image':'\\breve{a}'							,	'display':'\\breve{}'},
    'vec'				:	{'image':'\\vec{a}'								,	'display':'\\vec{}'},
    'degrees'			:	{'image':'a^\\circ'								,	'display':'^\\circ'},
    'wide_tilde'		:	{'image':'\\widetilde{abc}'						,	'display':'\\widetilde{}'},
    'wide_hat'			:	{'image':'\\widehat{abc}'						,	'display':'\\widehat{}'},
    'over_right_arrow'	:	{'image':'\\overrightarrow{abc}'				,	'display':'\\overrightarrow{}'},
    'under_right_arrow'	:	{'image':'\\underrightarrow{abc}'				,	'display':'\\underrightarrow{}'},
    'over_left_arrow'	:	{'image':'\\overleftarrow{abc}'					,	'display':'\\overleftarrow{}'},
    'under_left_arrow'	:	{'image':'\\underleftarrow{abc}'				,	'display':'\\underleftarrow{}'},
    'overline'			:	{'image':'\\overline{abc}'						,	'display':'\\overline{}'},
    'underline'			:	{'image':'\\underline{abc}'						,	'display':'\\underline{}'},
    'overbrace'			:	{'image':'\\overbrace{abc}'						,	'display':'\\overbrace{}'},
    'underbrace'		:	{'image':'\\underbrace{abc}'					,	'display':'\\underbrace{}'},
    'overset'			:	{'image':'\\overset{a}{b}'						,	'display':'\\overset{}{}'},
    'underset'			:	{'image':'\\underset{a}{b}'						,	'display':'\\underset{}{}'},
    'maps_to'			:	{'image':'\\mapsto'								,	'display':'\\mapsto'},
    'left_arrow'		:	{'image':'\\leftarrow'							,	'display':'\\leftarrow'},
    'Left_arrow'		:	{'image':'\\Leftarrow'							,	'display':'\\Leftarrow'},
    'left_right_arrow'	:	{'image':'\\leftrightarrow'						,	'display':'\\leftrightarrow'},
    'left_harpoon_up'	:	{'image':'\\leftharpoonup'						,	'display':'\\leftharpoonup'},
    'left_harpoon_down'	:	{'image':'\\leftharpoondown'					,	'display':'\\leftharpoondown'},
    'overset_left_arrow':	{'image':'\\overset{a}{\\leftarrow}'			,	'display':'\\overset{}{\\leftarrow}'},
    'undrset_left_arrow':	{'image':'\\underset{a}{\\leftarrow}'			,	'display':'\\underset{}{\\leftarrow}'},
    'right_arrow'		:	{'image':'\\rightarrow'							,	'display':'\\rightarrow'},
    'Right_arrow'		:	{'image':'\\Rightarrow'							,	'display':'\\Rightarrow'},
    'right_harpoon_up'	:	{'image':'\\rightharpoonup'						,	'display':'\\rightharpoonup'},
    'right_harpoon_down':	{'image':'\\rightharpoondown'					,	'display':'\\rightharpoondown'},
    'rightleft_harpoons':	{'image':'\\rightleftharpoons'					,	'display':'\\rightleftharpoons'},
    'overset_right_arrow'	:	{'image':'\\overset{a}{\\rightarrow}'			,	'display':'\\overset{}{\\rightarrow}'},
    'underset_right_arrow':	{'image':'\\underset{a}{\\rightarrow}'			,	'display':'\\underset{}{\\rightarrow}'},
    'parentheses'		:	{'image':'\\left(a\\right)'						,	'display':'\\left( \\right)'},
    'square_brackets'	:	{'image':'\\left[a\\right]'						,	'display':'\\left[ \\right]'},
    'curly_brackets'	:	{'image':'\\left\\{a\\right\\}'					,	'display':'\\left\\{ \\right\\}'},
    'pipe'				:	{'image':'\\left|a\\right|'						,	'display':'\\left| \\right|'},
    'text_curly_left'	:	{'image':'\\left\\{a \\right.'					,	'display':'\\left\\{ \\right.'},
    'text_pipes'		:	{'image':'\\left\\|a \\right\\|'				,	'display':'\\left\\| \\right\\|'},
    'angle_brackets'	:	{'image':'\\left \\langle a \\right \\rangle' 	, 	'display':'\\left \\langle \\right \\rangle'},
    'floor_brackets'	:	{'image':'\\left \\lfloor a \\right \\rfloor'	,	'display':'\\left \\lfloor \\right \\rfloor'},
    'ceiling_brackets'	:	{'image':'\\left \\lceil a \\right \\rceil'		,	'display':'\\left \\lceil \\right \\rceil'},
    'text_curly_right'	:	{'image':'\\left. a \\right \\}'				,	'display':'\\left. \\right \\}'},
    'matrix'			:	{'image':'\\begin{matrix}a\\\\b\\end{matrix}'	,	'display':'\\begin{matrix}\\end{matrix}'},
    'parentheses_matrix':	{'image':'\\begin{pmatrix}a\\\\b\\end{pmatrix}'	,	'display':'\\begin{pmatrix}\\end{pmatrix}'},
    'pipe_matrix'		:	{'image':'\\begin{vmatrix}a\\\\b\\end{vmatrix}'	,	'display':'\\begin{vmatrix}\\end{vmatrix}'},
    'double_pipe_matrix':	{'image':'\\begin{Vmatrix}a\\\\b\\end{Vmatrix}'	,	'display':'\\begin{Vmatrix}\\end{Vmatrix}'},
    'left_pipe'			:	{'image':'\\left|\\begin{matrix}a\\\\b\\end{matrix}\\right.'	,	'display':'\\left| \\begin{matrix}\\end{matrix}\\right.'},
    'right_pipe'		:	{'image':'\\left.\\begin{matrix}a\\\\b\\end{matrix}\\right|'	,	'display':'\\left. \\begin{matrix}\\end{matrix}\\right|'},
    'sqr_bracket_matrix':	{'image':'\\begin {bmatrix}a\\\\b\\end {bmatrix}'	, 	'display':'\\begin{bmatrix}\\end{bmatrix}'},
    'curly_matrix'		:	{'image':'\\begin{Bmatrix}a\\\\b\\end{Bmatrix}'	,	'display':'\\begin{Bmatrix}\\end{Bmatrix}'},
    'binom'				:	{'image':'{a \\choose b} '						,	'display':'\\binom{}{}'},
    'cases'				:	{'image':'\\begin{cases}a\\\\b\\end{cases}'		,	'display':'\\begin{cases}\\end{cases}'},
    'align_eqs'			:	{'image':'\\begin{align}&=\\\\\n&=\\end{align}'	,	'display':'\\begin{align}\\end{align}'},
    'alpha'				:	{'image':'\\alpha'								,	'display':'\\alpha'},
    'beta'				:	{'image':'\\beta'								,	'display':'\\beta'},
    'gamma'				:	{'image':'\\gamma'								,	'display':'\\gamma'},
    'delta'				:	{'image':'\\delta'								,	'display':'\\delta'},
    'epsilon'			:	{'image':'\\epsilon'							,	'display':'\\epsilon'},
    'zeta'				:	{'image':'\\zeta'								,	'display':'\\zeta'},
    'eta'				:	{'image':'\\eta'								,	'display':'\\eta'},
    'theta'				:	{'image':'\\theta'								,	'display':'\\theta'},
    'iota'				:	{'image':'\\iota'								,	'display':'\\iota'},
    'kappa'				:	{'image':'\\kappa'								,	'display':'\\kappa'},
    'lambda'			:	{'image':'\\lambda'								,	'display':'\\lambda'},
    'mu'				:	{'image':'\\mu'									,	'display':'\\mu'},
    'nu'				:	{'image':'\\nu'									,	'display':'\\nu'},
    'xi'				:	{'image':'\\xi'									,	'display':'\\xi'},
    'omicron'			:	{'image':'\\omicron'							,	'display':'\\omicron'},
    'pi'				:	{'image':'\\pi'									,	'display':'\\pi'},
    'rho'				:	{'image':'\\rho'								,	'display':'\\rho'},
    'sigma'				:	{'image':'\\sigma'								,	'display':'\\sigma'},
    'tau'				:	{'image':'\\tau'								,	'display':'\\tau'},
    'upsilon'			:	{'image':'\\upsilon'							,	'display':'\\upsilon'},
    'phi'				:	{'image':'\\phi'								,	'display':'\\phi'},
    'chi'				:	{'image':'\\chi'								,	'display':'\\chi'},
    'psi'				:	{'image':'\\psi'								,	'display':'\\psi'},
    'omega'				:	{'image':'\\omega'								,	'display':'\\omega'},
    'varepsilon'		:	{'image':'\\varepsilon'							,	'display':'\\varepsilon'},
    'vartheta'			:	{'image':'\\vartheta'							,	'display':'\\vartheta'},
    'varpi'				:	{'image':'\\varpi'								,	'display':'\\varpi'},
    'varsigma'			:	{'image':'\\varsigma'							,	'display':'\\varsigma'},
    'varphi'			:	{'image':'\\varphi'								,	'display':'\\varphi'},
    'varrho'			:	{'image':'\\varrho'								,	'display':'\\varrho'},
    'Gamma'				:	{'image':'\\Gamma'								,	'display':'\\Gamma'},
    'Theta'				:	{'image':'\\Theta'								,	'display':'\\Theta'},
    'Xi'				:	{'image':'\\Xi'									,	'display':'\\Xi'},
    'Sigma'				:	{'image':'\\Sigma'								,	'display':'\\Sigma'},
    'Phi'				:	{'image':'\\Phi'								,	'display':'\\Phi'},
    'Omega'				:	{'image':'\\Omega'								,	'display':'\\Omega'},
    'Delta'				:	{'image':'\\Delta'								,	'display':'\\Delta'},
    'Lambda'			:	{'image':'\\Lambda'								,	'display':'\\Lambda'},
    'Pi'				:	{'image':'\\Pi'									,	'display':'\\Pi'},
    'Upsilon'			:	{'image':'\\Upsilon'							,	'display':'\\Upsilon'},
    'Psi'				:	{'image':'\\Psi'								,	'display':'\\Psi'},
    '<'					:	{'image':'<'									,	'display':'<'},
    '>'					:	{'image':'>'									,	'display':'>'},
    '='					:	{'image':'='									,	'display':'='},
    'less_equal'		:	{'image':'\\leq'								, 	'display':'\\leq'},
    'great_equal'		:	{'image':'\\geq'								,	'display':'\\geq'},
    'precise'			:	{'image':'\\prec'								,	'display':'\\prec'},
    'precise_equal'		:	{'image':'\\preceq'								,	'display':'\\preceq'},
    'll'				:	{'image':'\\ll'									,	'display':'\\ll'},
    'vdash'				:	{'image':'\\vdash'								, 	'display':'\\vdash'},
    'smile'				:	{'image':'\\smile'								, 	'display':'\\smile'},
    'models'			:	{'image':'\\models'								,	'display':'\\models'},
    'mid'				:	{'image':'\\mid'								,	'display':'\\mid'},
    'bowtie'			:	{'image':'\\bowtie'								,	'display':'\\bowtie'},
    'succ'				:	{'image':'\\succ'								, 	'display':'\\succ'},
    'succ_eq'			:	{'image':'\\succeq'								,	'display':'\\succeq'},
    'gg'				:	{'image':'\\gg'									,	'display':'\\gg'},
    'dashv'				:	{'image':'\\dashv'								,	'display':'\\dashv'},
    'frown'				:	{'image':'\\frown'								, 	'display':'\\frown'},
    'perp'				:	{'image':'\\perp'								,	'display':'\\perp'},
    'parallel'			:	{'image':'\\parallel'							,	'display':'\\parallel'},
    'not_equal'			:	{'image':'\\neq'								,	'display':'\\neq'},
    'equivalent'		:	{'image':'\\equiv'								,	'display':'\\equiv'},
    'doteq'				:	{'image':'\\doteq'								, 	'display':'\\doteq'},
    'sim'				:	{'image':'\\sim'								, 	'display':'\\sim'},
    'approx'			:	{'image':'\\approx'								, 	'display':'\\approx'},
    'sim_eq'			:	{'image':'\\simeq'								, 	'display':'\\simeq'},
    'congruous'			:	{'image':'\\cong'								, 	'display':'\\cong'},
    'asymptote'			:	{'inage':'\\asymp'								, 	'display':'\\asymp'},
    'proportional_to'	:	{'image':'\\propto'								, 	'display':'\\propto'},
    'thin_space'		:	{'image':'a\\,b'								, 	'display':'\\,'},
    'medium_space'		:	{'image':'a\\:b'								, 	'display':'\\:'},
    'thick_space'		:	{'image':'a\\;b'								, 	'display':'\\;'},
    'negative_space'	:	{'image':'a\\!b'								, 	'display':'\\!'},
    'sin'				:	{'image':'\\sin'								,	'display':'\\sin'},
    'cos'				:	{'image':'\\cos'								,	'display':'\\cos'},
    'tan'				:	{'image':'\\tan'								,	'display':'\\tan'},
    'csc'				:	{'image':'\\csc'								,	'display':'\\csc'},
    'sec'				:	{'image':'\\sec'								,	'display':'\\sec'},
    'cot'				:	{'image':'\\cot'								,	'display':'\\cot'},
    'arcsin'			:	{'image':'\\arcsin'								,	'display':'\\arcsin'},
    'arccos'			:	{'image':'\\arccos'								,	'display':'\\arccos'},
    'arctan'			:	{'image':'\\arctan'								,	'display':'\\arctan'},
    'mod'				:	{'image':'\\mod{}'								,	'display':'\\mod{}'},
    'log'				:	{'image':'\\log'								,	'display':'\\log'},
    'ln'				:	{'image':'\\ln'									,	'display':'\\ln'},
    'chem_superscript'  :   {'image':'\\mathrm{^1H^+}'                      ,   'display':'^{}'},
    'chem_subscript'    :   {'image':'\\mathrm{_1H_2}'                      ,   'display':'_{}'},
    'chem_under_right_arrow'	:	{'image':'\\mathrm{\\underrightarrow{heat}}' ,   'display':'\\underrightarrow{}'}
}

// DESC: Updates the equation in targetDisplayArea based on text in targetTextArea
// PARAMETERS: italics is a boolean which says whether the default is italics or not
//             italics default value is true
// RETURNS: void
equationEditor.prototype.updateEquation = function(italics)
{
    italics = typeof(italics) == "undefined" ? true : italics;
    var targetDisplayArea = this.targetDisplayArea;
    if(italics)
    {
        targetDisplayArea.innerHTML = '\\('+this.targetTextArea.value+'\\)';
    }
    else
    {
        targetDisplayArea.innerHTML = '\\(\\mathrm{'+this.targetTextArea.value+'}\\)';
    }
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,targetDisplayArea]);
}

// DESC: Gets the caret position in a textarea
// PARAMETERS: el is the element in which the selection is being checked
// RETURNS: an array including the selection start and the selection end
equationEditor.prototype.getCaret = function(el)
{ 
    if (el.selectionStart) 
    {
        return [el.selectionStart,el.selectionEnd]; 
    }
    //IE Hack
    else if (document.selection)
    { 
        el.focus(); 

        var r = document.selection.createRange(); 
        if (r == null)
        { 
          return 0; 
        } 

        var re = el.createTextRange();
        var	rc = re.duplicate(); 
        re.moveToBookmark(r.getBookmark()); 
        rc.setEndPoint('EndToStart', re); 

        var returnHolder = new Array();
        returnHolder[0] = typeof(rc.text.length)=='undefined' ? 0 : rc.text.length;

        rc.setEndPoint('EndToEnd',re);

        returnHolder[1] = typeof(rc.text.length)=='undefined' ? 0 : rc.text.length;
        return returnHolder; 
    }  
    return [0,0]; 
}

// DESC: Determines whether obj is an array
// PARAMETER: obj is any object
// RETURNS: boolean, true if the object is an array, false otherwise
equationEditor.prototype.isArray = function(obj) 
{
    if (obj.constructor.toString().indexOf("Array") == -1)
        return false;
    else
        return true;
}

// DESC: gets all elements of a class checkedClass within parentElement
// PARAMETER: checkedClass is the class we are searching for
// PARAMETER: parenteElement is the element which will be searched
// RETURNS: array of elements of class checkedClass
equationEditor.prototype.getElementsByClass = function(checkedClass, parentElement)
{
    parentElement = typeof(parentElement)=='undefined' ? document : parentElement;
		
    var allChildElements = parentElement.getElementsByTagName('*');
    var returnHolder = new Array();;

    for(i=0; i<allChildElements.length; i++)
    {
        if(allChildElements[i].className==checkedClass)
        {
            returnHolder.push(allChildElements[i]);
        }
    }

    return returnHolder;
}

// DESC: selects a range in a textarea or input
// PARAMETER: input is the textarea or input in which text should be selected
// PARAMETER: selectionStart is an integer denoting the start of the selection
// PARAMETER: selectionEnd is an integer denoting the end of the selection
// RETURNS: void
equationEditor.prototype.setSelectionRange = function(input, selectionStart, selectionEnd)
{
    if (input.setSelectionRange)
    {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange)
    {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

// DESC: adds an equation editor button to the equation button menu or submenu
// PARAMETER: buttonLabel is the label from icons corresponding to the button to be added
// PARAMETER: buttonContainer is the container for the button
// RETURNS: newly added button
equationEditor.prototype.addEquationEditorButton = function(buttonLabel,buttonContainer)
{
    var equationEditorButton 		= document.createElement('div');
    equationEditorButton.className  = 'equationEditorButton';
    equationEditorButton.id 		= 'equationEditorButton-'+buttonLabel;
    var equationEditorDisplay 		= document.createElement('div');
    try
    {
        equationEditorDisplay.innerHTML = '\\('+this.icons[buttonLabel].image+'\\)';
    }
    catch(e)
    {
        new Message(buttonLabel);
    }

    equationEditorButton.appendChild(equationEditorDisplay);
    buttonContainer.appendChild(equationEditorButton);

    return equationEditorButton;
}

function equationEditor(targetTextArea,targetDisplayArea,options)
{
    var thisObject = this;
    
    this.targetDisplayArea = targetDisplayArea;
    this.targetTextArea = targetTextArea;
    this.options = options;
    
	if(typeof(options)!='undefined')
	{
        options.italics = typeof(options.italics) == "undefined" ? true : options.italics;
        
		if(typeof(options.buttons)!='undefined'&&typeof(options.buttonLocation)!='undefined')
		{
			options.subMenubButtonsPerColumn = typeof(options.subMenubButtonsPerColumn) == 'undefined' ? 5   : options.subMenubButtonsPerColumn;
			options.menuButtonsPerRow 		 = typeof(options.menuButtonsPerRow) 		== 'undefined' ? 100 : options.menuButtonsPerRow;
			
			for(var i=0;i<options.buttons.length;i++)
			{
				if((i+1)%options.menuButtonsPerRow==1)
				{
					var rowDiv = document.createElement('div');
					rowDiv.className = 'equationEditorRow';
					options.buttonLocation.appendChild(rowDiv);
				}
				if(this.isArray(options.buttons[i]))
				{
					var firstButton = this.addEquationEditorButton(options.buttons[i][0],rowDiv);
					var buttonHolder = document.createElement('div');
					firstButton.appendChild(buttonHolder);
					
					for(j=1;j<options.buttons[i].length;j++)
					{
						if(j%options.subMenubButtonsPerColumn==1)
						{
							var nextSpan = document.createElement('span');
							buttonHolder.appendChild(nextSpan);
						}
						this.addEquationEditorButton(options.buttons[i][j],nextSpan);
					}

					buttonHolder.style.width = (buttonHolder.childNodes.length * nextSpan.offsetWidth) + 'px';
				}
				else
				{
					this.addEquationEditorButton(options.buttons[i],rowDiv);
				}
			}
			
			var allEquationEditorButtons = this.getElementsByClass('equationEditorButton',options.buttonLocation);
			
			for(i=0; i<allEquationEditorButtons.length; i++)
			{
				allEquationEditorButtons[i].onclick = function(e)
				{
					var textAreaCaret    = thisObject.getCaret(targetTextArea);
					var textAreaVal      = targetTextArea.value;
					var buttonName 	     = this.id.substring(this.id.search('-')+1,this.id.length);			

					targetTextArea.value = textAreaVal.slice(0,textAreaCaret[0])+thisObject.icons[buttonName].display+" "+textAreaVal.slice(textAreaCaret[1],textAreaVal.length);
					
					thisObject.updateEquation(options.italics);
					
					var bracePos   = thisObject.icons[buttonName].display.search('{}');
					var bracketPos = thisObject.icons[buttonName].display.search('\\[\\]');
					var newTextPosition;
					
					if((bracePos==-1&&bracketPos>0)||(bracePos>-1&&bracketPos>-1&&bracketPos<bracePos))
					{
						newTextPosition = textAreaCaret[0]+bracketPos+1;
						
					}
					else if((bracketPos==-1&&bracePos>0)||(bracketPos>-1&&bracePos>-1&&bracePos<bracketPos))
					{
						newTextPosition = textAreaCaret[0]+bracePos+1;
					}
					else
					{
						if(thisObject.icons[buttonName].display.search('\\\\begin\{.+?\}')>-1)
						{
							newTextPosition = textAreaCaret[0]+thisObject.icons[buttonName].display.search('}')+1;		
						}
						else
						{
							newTextPosition = textAreaCaret[0]+thisObject.icons[buttonName].display.length+1;
						}
					}
					
					thisObject.setSelectionRange(targetTextArea,newTextPosition,newTextPosition);
					
					e.stopPropagation();
				}				
			}

				
			MathJax.Hub.Queue(["Typeset",MathJax.Hub,options.buttonLocation]);
			MathJax.Hub.Queue(function()
			{
				for(i=0;i<allEquationEditorButtons.length;i++)
				{
					var clientButtonHeight = allEquationEditorButtons[i].clientHeight;
					var clientButtonWidth  = allEquationEditorButtons[i].clientWidth;
					var imageLeft 		   = (clientButtonWidth - allEquationEditorButtons[i].firstChild.clientWidth)/2;
					var imageTop 		   = (clientButtonHeight - allEquationEditorButtons[i].firstChild.clientHeight)/2;
					allEquationEditorButtons[i].firstChild.style.left = imageLeft+"px";					
					allEquationEditorButtons[i].firstChild.style.top  = imageTop+"px";
				}
			});
		}
	}
	
	this.updateEquation(options.italics);
	
	targetTextArea.onblur = function()
	{
		thisObject.updateEquation(options.italics);
	}
	
	targetTextArea.onkeyup = function()
	{
		thisObject.updateEquation(options.italics);	
	}
	
	if(typeof(options.callback)=='function')
	{
		options.callback.call(this);
	}
}