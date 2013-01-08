<?php

require_once("config/main.inc.php");

$moduleId = $_REQUEST['moduleId'];

$api = new Api();

$result = $api->get("/data/lessonplan/$moduleId/");

echo $result;