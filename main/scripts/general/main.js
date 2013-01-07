$(document).ready(function()
{
    window.WINDOWHEIGHT = $(window).height();
});

function compareArrays(arr1,arr2)
{
    if (arr1.length != arr2.length) return false;
    for (var i = 0; i < arr2.length; i++) 
    {
        if (arr1[i].compareArrays) 
        { //likely nested arr2ay
            if (!arr1[i].compareArrays(arr2[i])) return false;
            else continue;
        }
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

function getJSONArrayLength(myObject)
{
    var keepGoing = true;
    var objectLength = 0;
    if(myObject==null)
    {
        return objectLength;
    }

    while(keepGoing)
    {
        if(myObject[objectLength]==null)
        {
            keepGoing=false;
        }
        else
        {
            objectLength++;
        }
    }

    return objectLength;
}

function css(a)
{
    var sheets = document.styleSheets, o = {};
    for(var i in sheets) 
    {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for(var r in rules) 
        {
            if(a.is(rules[r].selectorText))
            {
                o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
            }
        }
    }
    return o;
}

function css2json(css)
{
    var s = {};
    if(!css) return s;
    if(css instanceof CSSStyleDeclaration) 
    {
        for(var i in css) 
        {
            if((css[i]).toLowerCase) 
            {
                s[(css[i]).toLowerCase()] = (css[css[i]]);
            }
        }
    } 
    else if(typeof css == "string") 
    {
        css = css.split("; ");          
        for (var i in css) 
        {
            var l = css[i].split(": ");
            s[l[0].toLowerCase()] = (l[1]);
        };
    }
    return s;
}