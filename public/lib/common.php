<?php

	$protocol = empty($_SERVER['HTTPS']) ? 'http' : 'https';
	$port = $_SERVER['SERVER_PORT'];
	$disp_port = ($protocol == 'http' && $port == 80 || $protocol == 'https' && $port == 443) ? '' : ":$port";
	$domain = $_SERVER['SERVER_NAME'];
	$full_url = $protocol . '://' . $domain . $disp_port . '/';

	$hostLocation = $full_url;

	require_once('config.php');

	$db_connection = new mysqli($db_info['server'], $db_info['username'], $db_info['password']);

	if ($db_connection->connect_error) {
		die('Connection failed: ' . $db_connection->connect_error);
	}

?>