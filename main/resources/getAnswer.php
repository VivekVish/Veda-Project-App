<?php
    # Includes
    require_once("../../config/main.inc.php");

    # Retrieve and sanitize data
    $questionId = $_POST['questionId'];

    # Instantiate api class and make request
    $api = new Api();
    $api->setContentType("application/json");
    $api->setAcceptType("application/json");

    $response = $api->get("/data/material/questionBlueprint/$questionId/");
    print_r($response);