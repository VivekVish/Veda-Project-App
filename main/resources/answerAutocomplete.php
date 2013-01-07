<?php
	////////////////////////////////////////////////////////////////
	// answerAutocomplete receives an Ajax request from quiz.js   //
	// when a user enters text into an answer field. The entered  //
	// text is stored in $_GET["term"].  answerAutocomplete finds //
	// options that contain words that start with the entered 	  //
	// text. 													  //
	////////////////////////////////////////////////////////////////

	$enteredText = $_GET["term"];
	$answerFieldId = $_GET["answerFieldId"];
	
	// search 
	
	$response = json_encode(array("hello","goodbye"));
	
	echo $response;
?>