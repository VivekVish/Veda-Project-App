Math.csc = function(x)
{
    return 1/Math.sin(x);
}

Math.sec = function(x)
{
    return 1/Math.cos(x);
}

Math.cot = function(x)
{
    return 1/Math.tan(x);
}

Math.acsc = function(x)
{
    return Math.asin(1/x);
}

Math.asec = function(x)
{
    return Math.acos(1/x);
}

Math.acot = function(x)
{
    if(x>0)
    {
        return Math.atan(1/x);
    }
    else
    {
        return Math.atan(1/x)+Math.PI;
    }
}