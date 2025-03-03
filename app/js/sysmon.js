// ============================================================================
// Module      : sysmon.js
// Version     : 1.0
//
// Author      : Denis Patrice <denispatrice@yahoo.com>
// Copyright   : Copyright (c) Denis Patrice Dipl.-Ing. 2010-2025
//               All rights reserved
//
// Application : Generic
// Description : Pages support: sysmon page object
//
// Date+Time of change   By     Description
// --------------------- ------ ----------------------------------------------
// 20-Jan-25 00:00 WIT   Denis  Deployment V. 2025 "Raymond Chandler"
//
// ============================================================================

var sysmon = {

	page : null,
	
	// **************************************************************************
	// **************************************************************************
	// 
	// RUNTIME EVENTS
	//
	// **************************************************************************
	// **************************************************************************
	/*
	onbackbutton     : noop, // mandatory
	onwindowresize   : null, // null, or Promise()
	onthemechanged   : null, // null, or Promise()
	onprofilechanged : null, // null, or Promise()
	onshow           : noop, // mandatory
	*/

	onbackbutton: function()
	{
		console.log("IN sysmon.onbackbutton()");
		sysmon.hide();
	},

	onwindowresize: function()
	{
		return new Promise(
			(yes, no) => {
				console.info("IN sysmon.onwindowresize() page_id='" + sysmon.page.options.page_id + "'");
				
				var DOMdivContainer = null;

				if (strlen(sysmon.options.containerID) > 0) {
					DOMdivContainer = document.getElementById(sysmon.options.containerID);
				}
				else {
					DOMdivContainer = document.getElementById(sysmon.page.options.page_id);
				}

				var H = DOMdivContainer.getBoundingClientRect().height;
				var W = DOMdivContainer.getBoundingClientRect().width ;

				console.log("Page container resized to H=" + String(H) + ", W=" + String(W));
				//Do something useful
				yes();
			}
		);
	},

	onthemechanged: function(newThemeID)
	{
		return new Promise(
			(yes, no) => {
				console.log("IN sysmon.onthemechanged() newThemeID='" + newThemeID + "'");
				//Do something useful
				yes();
			}
		);
	},

	// newUser: plain object object
	/*
	`phone_no`        VARCHAR(100) NOT NULL DEFAULT '', -- Unique verified user identifier
	`displayName`     VARCHAR(30)  NOT NULL DEFAULT '', -- Default display name or profile alias
	`image_binary_id` VARCHAR(30)  NOT NULL DEFAULT '', -- Default profile image
	*/
	onprofilechanged: function(newUser)
	{
		return new Promise(
			(yes, no) => {
				console.info("IN sysmon.onprofilechanged() newUser='" + JSON.stringify(newUser) + "'");
				//Do something useful
				yes();
			}
		);
	},

	onshow: function()
	{
		console.log("IN sysmon.onshow()");
		jQuery("#BTN_SYSMON_PAGER_S,#BTN_SYSMON_PAGER_L").off("click").on("click",function(){
			ripple(this, function(){
				pager.show();
			});
		});
	},


	// **************************************************************************
	// **************************************************************************
	//
	// DISPLAY API
	//
	// **************************************************************************
	// **************************************************************************

	hide : function() 
	{
		console.log("IN sysmon.hide()");
		if (sysmon.page !== null) {
			sysmon.page.remove();
			sysmon.page = null;
		}
	},

	show: function()
	{
		console.log("IN sysmon.show()");	

		sysmon.page = new page({
			page_id          : "page_sysmon",
			contentURI       : "app/html/sysmon.html",
			scriptURI        : "app/js/sysmon.js",
			windowObjectName : "sysmon",
			onbackbutton     : sysmon.onbackbutton,
			onshow           : sysmon.onshow,
			onwindowresize   : sysmon.onwindowresize,
			onthemechanged   : sysmon.onthemechanged,
			onprofilechanged : sysmon.onprofilechanged,
			globalize        : true
		});

		if (sysmon.page !== null) { 			
			sysmon.page.show();
		}
	}

};


// End of file: sysmon.js
// ============================================================================