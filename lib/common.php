<?php

	$protocol = empty($_SERVER['HTTPS']) ? 'http' : 'https';
	$port = $_SERVER['SERVER_PORT'];
	$disp_port = ($protocol == 'http' && $port == 80 || $protocol == 'https' && $port == 443) ? '' : ":$port";
	$domain = $_SERVER['SERVER_NAME'];
	$full_url = "${protocol}://${domain}${disp_port}/";

	$hostLocation = $full_url;

?>