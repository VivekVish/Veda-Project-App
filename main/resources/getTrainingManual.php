<?php

require_once("../../config/main.inc.php");

$uri = $_REQUEST['uri'];

$api = new Api();
$api->setContentType("application/json");
$api->setAcceptType("application/json");

$response = $api->get($uri);
echo $response;