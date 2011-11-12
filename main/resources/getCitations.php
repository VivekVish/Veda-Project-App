<?php
    # Includes
    require_once("../../config/main.inc.php");

    # Retrieve and sanitize data
    if (isset($_REQUEST['citationIds']) && !empty($_REQUEST['citationIds']))
    {
        $citationIds = trim(json_encode($_REQUEST['citationIds']),"[]");
    }

    # Instantiate api class and make request
    $api = new Api();
    $api->setContentType("application/json");
    $api->setAcceptType("application/json");

    $response = $api->get("/data/citation/$citationIds");
    echo $response;