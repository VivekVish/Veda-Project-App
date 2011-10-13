<?php
	// put full path to Smarty.class.php
	require('smarty_libs/Smarty.class.php');
	$smarty = new Smarty();

	$smarty->template_dir = '../templates';
	$smarty->compile_dir = '../templates_c';
	$smarty->cache_dir = '../smarty/cache';
	$smarty->config_dir = '../smarty/configs';
?>
