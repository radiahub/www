<?php require_once ("config.radia.php"); autoload();
// ============================================================================
// Module      : index.php
// Version     : 1.0
// PHP version : PHP 7+
//
// Author      : Denis Patrice <denispatrice@yahoo.com>
// Copyright   : Copyright (c) Denis Patrice Dipl.-Ing. 2011, 2012
//               All rights reserved
//
// Application : radiahub web site
// Description : main access point
//
// Date+Time of change   By     Description
// --------------------- ------ ----------------------------------------------
// 20-Jan-25 00:00 WIT   Denis  Deployment V. 2025 "Raymond Chandler"
//
// ============================================================================

// ****************************************************************************
// ****************************************************************************
//
// MAIN
//
// ****************************************************************************
// ****************************************************************************

function main ()
{
	$result = array();
	$done = FALSE;

	$errno = session();
	if ($errno === 1000) {
		$json = json_decode(file2bin("index.json"), TRUE);
		if (strlen($json["package_id"]) > 0) {

			$options = array ('expires'=>time()+1800, 'path'=>'/', 'secure'=>B_SECURE_SESSIONS);
			setcookie("package_id", $json["package_id"], $options);
			setcookie("domURL", _DOM_, $options);

			$theme_id = (isset($json["theme_id"])) ? $json["theme_id"] : "light";
			$theme_id = formvar("theme", $theme_id);
			$lang = formvar("lang","EN");
			$filename = "app/html/$lang/index.html";
			$buffer = file2bin($filename);

			if (strlen($buffer) > 0) {
				$buffer = str_replace("[theme_id]", $theme_id, $buffer);
				output($buffer);
				$done = TRUE;
			}

		}
		else {
			$errno = 1010; //SYSTEM ERROR
		}
	}

	if (! $done) {
		$errstr = error_text ($errno);

		$result ["errno"  ] = $errno   ;
		$result ["errstr" ] = $errstr  ;
		$result ["instant"] = sql_timestamp();

		if (! headers_sent()) {
			header("Access-Control-Allow-Origin: *");
			header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
			header("Cache-Control: post-check=0, pre-check=0", false);
			header("Pragma: no-cache");
			header("Expires: -1");
		}
		
		echo json_encode ($result, JSON_PRETTY_PRINT);
	}

	return $errno;
}


// ****************************************************************************
// ****************************************************************************
//
// CORE
//
// ****************************************************************************
// ****************************************************************************

error_reporting (E_ALL ^ E_DEPRECATED);
main ();


// End of file: index.php
// ============================================================================
?>