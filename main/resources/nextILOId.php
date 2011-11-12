<?php

# Includes
require_once("config/main.inc.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()))
{
    die("Access Denied.");
}


# Instantiate api class
$api = new Api();

# Make request
$result = $api->get("/data/nextiloid/");

echo $result;