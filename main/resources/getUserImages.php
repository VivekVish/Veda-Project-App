<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()))
{
    die("Access Denied.");
}

$username = $userSession->getUsername();

$api = new Api();

$result = $api->get("/user/$username/images/");

print_r($result);