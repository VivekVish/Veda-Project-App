<!DOCTYPE html>

<html>
	<head>
    	<meta charset="utf-8">
		<title>{$title}</title>

{* Add CSS Files *}
{foreach from=$cssfiles item=cssfile}
        	<link href="css/{$cssfile}.css" rel="stylesheet" type="text/css" />
{/foreach}

{* Add Javascript Files for IE Versions lower than 9 *}
<!--[if lt IE 9]>
{foreach from=$iejavascriptfiles item=iejavascriptfile}
        	<script type="text/javascript" src="{$iejavascriptfile}"></script>
{/foreach}
<![endif]-->

{* Add Javascript Files *}
{foreach from=$javascriptfiles item=javascriptfile}
        	<script type="text/javascript" src="scripts/{$javascriptfile}.js"></script>
{/foreach}

{* Add JS Files without .js *}
{foreach from=$fullnamejavascriptfiles item=javascriptfile}
        	<script type="text/javascript" src="scripts/{$javascriptfile}"></script>
{/foreach}

{literal}
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-25916765-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
{/literal}
    </head>
    <body>
{foreach from=$bodytemplates item=template}
{include file="$template.tpl"}
{/foreach}
    </body>
</html>
