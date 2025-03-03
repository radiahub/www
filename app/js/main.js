// ============================================================================
// Module      : www/main.js
// Version     : 1.0
//
// Author      : Denis Patrice <denispatrice@yahoo.com>
// Copyright   : Copyright (c) Denis Patrice Dipl.-Ing. 2010-2025
//               All rights reserved
//
// Application : radiahub website
// Description : application main entry point
//
// Date+Time of change   By     Description
// --------------------- ------ ----------------------------------------------
// 20-Jan-25 00:00 WIT   Denis  Deployment V. 2025 "Raymond Chandler"
//
// ============================================================================

var main = {

	init : function()
	{
		return new Promise(
			(resolve, reject) => {
				console.info("IN main.init()");
				resolve();
			}
		);
	},

	run : function()
	{
		return new Promise(
			(resolve, reject) => {
				console.info("IN main.run()");
				setTimeout(
					function() {
						/*
						console.log(application.package_id);
						console.log(application.device_id);
						console.log(decodeURIComponent(application.domURL));
						console.log(application.iabLoadDelay);
						console.log(String(application.sid));
						*/
						radiahub.show();
						resolve();
					},
					100
				);
			}
		);
	}

};


// End of file: main.js
// ============================================================================