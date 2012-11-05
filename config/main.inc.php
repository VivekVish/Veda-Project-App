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
$GLOBALS['userSession'] = new Usersession();
$GLOBALS['api'] = new Api();
$GLOBALS['url'] = ($_SERVER["REQUEST_URI"]=="/" || $_SERVER["REQUEST_URI"]=="/index.php") ? "index.php" : $_SERVER["REQUEST_URI"];

# Smarty Vars
$smarty->assign('SITE_ROOT', SITE_ROOT);