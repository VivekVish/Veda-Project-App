<?php

# Libs and defines 
require_once("config/defines.php");
require_once('config/smartyconfig.php');

require_once("lib/Api.php");
require_once("lib/Usersession.php");
require_once("lib/openid.php");

foreach (glob("lib/Auth/*.php") as $filename)
{
    require_once($filename);
}

# Setup session handler
$userSession = new Usersession();
	
if(!isset($userSession->navstyle))
{
	$userSession->navstyle = 'icons';
	$userSession->navcontents = '';
	$userSession->fulllinks = '';
	$userSession->navfixed = false;
	$userSession->notesfixed = false;
}

# Pass messages to smarty
/*$GLOBALS['messages'] = $userSession->Messages;
if (!empty($GLOBALS['messages']))
{
	$smarty->assign("messages", $GLOBALS['messages']);
}
$userSession->Messages = "";
*/
# Smarty Vars
$smarty->assign('site_root', SITE_ROOT);
//$smarty->assign('navstyle', $userSession->navstyle);
//$smarty->assign('navfixed', $userSession->navfixed);
//$smarty->assign('notesfixed', $userSession->notesfixed);
$smarty->assign('title', 'The Veda Project');	

?>
