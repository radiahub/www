<?php
// ============================================================================
// Module      : config.radia.php
// Version     : 3.0R0.0
// PHP version : PHP 7+
//
// Author      : Denis Patrice <denispatrice@yahoo.com>
// Copyright   : Copyright (c) Denis Patrice Dipl.-Ing. 2010-2025
//               All rights reserved
//
// Application : global
// Description : configuration settings
//
// Date+Time of change   By     Description
// --------------------- ------ ----------------------------------------------
// 20-Jan-25 00:00 WIT   Denis  Deployment V. 2025 "Raymond Chandler"
//
// ============================================================================

if (! defined ("RADIA_MAJOR_VERSION")) {

  define ("RADIA_MAJOR_VERSION", "2025"            );      // Major yearly version ID
  define ("RADIA_MINOR_VERSION", "A"               );      // Minor version of the currently installed platform
  define ("RADIA_VERSION_NAME",  "Raymond Chandler");      // Name of the release
  define ("RADIA_VERSION_DATE",  "January 2025"    );      // Month of this release

  /*
   * Global binary directories
   *
   */
  define ("_PHP_", "../php/");                             // Directory, where the global PHP library resource is located
  
  /*
   * Base URL
   *
   */
  define ("_URL_", "http://192.168.142.233/www/");
  define ("_DOM_", "http://192.168.142.233/");

  /*
   * Sessions
   *
   */
	define ("B_SECURE_SESSIONS", FALSE);

  /*
   * Database connections
   *
   */
	define (
		"DATABASES",
		serialize (array (
			array (
				"id"       => "radiahub",
				"type"     => "MYSQL",
				"host"     => "localhost",
				"port"     => "3306",
				"database" => "radiahub",
				"user"     => "root",
				"password" => "bel621e"
			)
		))
	);		
		
	/*
   * Date and time format
   *
   */
  define ("ST_DELTA_TIMEZONE", "+0700"        );
  define ("ST_NAME_TIMEZONE",  "Asia/Jakarta" );
 	if (function_exists ("date_default_timezone_set")) {
    date_default_timezone_set (ST_NAME_TIMEZONE );
 	}

  /*
   * File upload
   *
   */
  define ("N_MAX_FILE_SIZE", 20000000);                    // Max file size in bytes
  define ("N_MAX_PIC_SIZE",  20000000);                    // Max picture file size in bytes

  /*
   * File system location
   */
  function installpath ()
  {
    $path = __FILE__ ;
    $path = getcwd();
    return $path ;
  }

  /*
   * Library autoloader
   */
  function autoload ()
  {
    $templist = scandir (_PHP_);
    foreach ($templist as $filename) {
      if (strlen ($filename) > 0) {
        if (! is_dir (_PHP_ . $filename)) {
          if (strcasecmp(pathinfo($filename, PATHINFO_EXTENSION),"php")===0) {
            require_once (_PHP_ . $filename);
          }
        }
      }
    }
  }

  /*
   * Locale support
   *
   */
	define ("ST_NATIONAL_PREFIX", "+62");
	define ("ST_CURRENCY_3LTR",   "IDR");                    // Set the default currency ISO 3 letters code 
	define ("ST_CURRENCY_2LTR",   "RP" );                    // Set the default currency ISO 3 letters code 
	define ("ST_CURRENCY_NAME",   "Indonesian Rupiah");      // Full text name of the default currency
	define ("ST_CURRENCY_TEXT",   "RP [amount]");            // Set the default currency text to display in amount format
	define ("N_CURRENCY_DECIMALS", 0);                       // Number of decimals to use for expressing currency values

  /*
   * number, amount, currency_amount
   *
   * Formats a money/currency FLOAT value into the
   * currency format defined by parameters above
   *
   * const float $val      : the value to format
   * const int   $decimals : number of decimals to accept in the format
   *
   */
  function number ($val, $decimals = N_CURRENCY_DECIMALS)
  {
		try {
	    return number_format (floatval($val), $decimals, ".", ",");
		}
		catch(Exception $e) {
			return NULL;
		}
  }

  function amount ($val)
  {
		try {
			$result = number ($val, N_CURRENCY_DECIMALS);
			$result = str_replace("[amount]", $result, ST_CURRENCY_TEXT);
			return $result;
		}
		catch(Exception $e) {
			return NULL;
		}
  }

}


// End of file: config.radia.php
// ============================================================================
?>