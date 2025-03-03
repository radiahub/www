<?php require_once ("config.radia.php"); autoload();
// ============================================================================
// Module      : firebaseConfig.php
// Version     : 1.0
// PHP version : PHP 7+
//
// Author      : Denis Patrice <denispatrice@yahoo.com>
// Copyright   : Copyright (c) Denis Patrice Dipl.-Ing. 2011,2022
//               All rights reserved
//
// Application : Labs Studio
// Description : Keys server
//
// Date+Time of change   By     Description
// --------------------- ------ ----------------------------------------------
// 12-May-24 00:00 WIT   Denis  Deployment V. 2024 "LEO MALET"
//
// ============================================================================

$json = '{'
			. '  "apiKey": "AIzaSyBMtLvOQGzzak8qTg04WU4AqdcENMzpyiA",'
			. '  "authDomain": "radiahub-105.firebaseapp.com",'
			. '  "databaseURL": "https://radiahub-105.firebaseio.com",'
			. '  "projectId": "radiahub-105",'
			. '  "storageBucket": "radiahub-105.firebasestorage.app",'
			. '  "messagingSenderId": "526889796130",'
			. '  "appId": "1:526889796130:web:04a3a4a5a2c4345b22807b",'
			. '  "measurementId": "G-J1WE2X0X5X"'
			. '}';

$json = payload_encode($json);
echo $json;


// End of file: firebaseConfig.php
// ============================================================================
?>