// ============================================================================
// Module      : pager.js
// Version     : 1.0
//
// Author      : Denis Patrice <denispatrice@yahoo.com>
// Copyright   : Copyright (c) Denis Patrice Dipl.-Ing. 2010-2025
//               All rights reserved
//
// Application : Generic
// Description : Pages support: pager page object
//
// Date+Time of change   By     Description
// --------------------- ------ ----------------------------------------------
// 20-Jan-25 00:00 WIT   Denis  Deployment V. 2025 "Raymond Chandler"
//
// ============================================================================

var pager = {

	page : null,
	
	// **************************************************************************
	// **************************************************************************
	// 
	// RUNTIME EVENTS
	//
	// **************************************************************************
	// **************************************************************************

	onbackbutton: function()
	{
		console.log("IN pager.onbackbutton()");
		pager.hide();
	},

	onwindowresize: function()
	{
		return new Promise(
			(yes, no) => {
				console.info("IN pager.onwindowresize() page_id='" + pager.page.options.page_id + "'");
				var elmnt = document.getElementById("PANEL_SLIDER");
				var container = document.getElementById("DIV_GLOBAL_CONTAINER");
				var left = elmnt.offsetLeft;
				document.getElementById("PANEL_LEFT").style.width = left + "px";
				left = left + parseInt(elmnt.style.width);
				var width = container.getBoundingClientRect().width - left;
				//console.log(width);
				document.getElementById("PANEL_RIGHT").style.left  = left  + "px";
				document.getElementById("PANEL_RIGHT").style.width = width + "px";
				pager.reposition_pager();
				yes();
			}
		);
	},

	onthemechanged: function(newThemeID)
	{
		return new Promise(
			(yes, no) => {
				console.log("IN pager.onthemechanged() newThemeID='" + newThemeID + "'");
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
				console.info("IN pager.onprofilechanged() newUser='" + JSON.stringify(newUser) + "'");
				//Do something useful
				yes();
			}
		);
	},

	onshow: function()
	{
		console.info("IN pager.onshow()");

		console.log(jQuery("#INP_SEARCH").attr("type"));

		pager.onwindowresize();

		(function(){
			draggable("DIV_CONT_PAGER", function(top, left){
				pager.reposition_pager();
			});
			multitap(
				"BTN_NAVIGATION", 4,
				function() {
					console.log("4x clicks or more");
				},
				function() {
					console.log("At most 1x click");
				}
			);
			longtap(
				"BTN_DISPLAY_MODE",
				function() {
					console.log("Longtap identified");
				},
				function() {
					console.log("At most a click");
				}
			)
		})();

		(function(){

			var posX = 0, startX = 0, elmnt = document.getElementById("PANEL_SLIDER");
			var container = document.getElementById("DIV_GLOBAL_CONTAINER");

			function onmouseup() {
				document.onmouseup   = null;
				document.onmousemove = null;
				//document.getElementById("PANEL_RIGHT").style.display = "block";
			};

			function onmousemove(e) {
				e = e || window.event;
				e.preventDefault();
				// calculate the new cursor position:
				posX = startX - e.clientX;
				startX = e.clientX;
				// set the element's new position:
				var left = elmnt.offsetLeft - posX;
				//console.log(left);
				elmnt.style.left = left + "px";
				//elmnt.style.left = (elmnt.offsetLeft - posX) + "px";
				document.getElementById("PANEL_LEFT").style.width = left + "px";
				left = left + parseInt(elmnt.style.width);
				//console.log(left);

				//var width = parseInt(document.body.clientWidth) - left;
				var width = container.getBoundingClientRect().width - left;
				//console.log(width);
				document.getElementById("PANEL_RIGHT").style.left  = left  + "px";
				document.getElementById("PANEL_RIGHT").style.width = width + "px";
			}

			function onmousedown(e) {
				e = e || window.event;
				e.preventDefault();
				//document.getElementById("PANEL_RIGHT").style.display = "none";
				startX = e.clientX;
				document.onmouseup   = onmouseup;
				document.onmousemove = onmousemove;
			};

			elmnt.onmousedown = onmousedown;
		})();

		jQuery("#BTN_CLOSE_PAGER").off("click").on("click", function(){
			ripple(this, function(){
				//jQuery("#mydiv").hide();
			});
		});

		jQuery("#BTN_CLOSE_PAGER").off("click").on("click", function(){
			ripple(this, function(){
				//jQuery("#mydiv").hide();
			});
		});

		jQuery("#BTN_PROFILE").off("click").on("click", function(){
			ripple(this, function(){
				media(context.libpath() + "mp3/click.mp3");
				//jQuery("#mydiv").hide();
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
		console.log("IN pager.hide()");
		if (pager.page !== null) {
			pager.page.remove();
			pager.page = null;
		}
	},

	reposition_pager: function()
	{
		//console.info("IN pager.reposition_pager()");
		var margin = 0;

		var container = document.getElementById("DIV_GLOBAL_CONTAINER");
		var contWidth = container.getBoundingClientRect().width, contHeight = container.getBoundingClientRect().height;

		var handleHeight = document.getElementById("DIV_CONT_PAGER_HANDLE").getBoundingClientRect().height;

		var posT = document.getElementById("DIV_CONT_PAGER").getBoundingClientRect().top;
		var posL = document.getElementById("DIV_CONT_PAGER").getBoundingClientRect().left;
		var posW = document.getElementById("DIV_CONT_PAGER").getBoundingClientRect().width;
		var posH = document.getElementById("DIV_CONT_PAGER").getBoundingClientRect().height;

		if (posT < margin) {
			posT = margin;
		}
		else if (posT > (contHeight - (handleHeight + margin))) {
			posT = contHeight - (handleHeight + margin) - Math.round(posH / 2);
		}
		document.getElementById("DIV_CONT_PAGER").style.top = posT + "px";

		if (posL < margin) {
			posL = margin;
		}
		else if (posL > (contWidth - (posW + margin))) {
			posL = contWidth - (posW + margin);
		}
		document.getElementById("DIV_CONT_PAGER").style.left = posL + "px";
	},

	show: function()
	{
		console.log("IN pager.show()");	

		pager.page = new page({
			page_id          : "page_pager",
			contentURI       : "app/html/pager.html",
			scriptURI        : "app/js/pager.js",
			windowObjectName : "pager",
			onbackbutton     : pager.onbackbutton,
			onshow           : pager.onshow,
			onwindowresize   : pager.onwindowresize,
			onthemechanged   : pager.onthemechanged,
			onprofilechanged : pager.onprofilechanged,
			globalize        : true
		});

		if (pager.page !== null) { 			
			pager.page.show();
		}
	}

};


// End of file: pager.js
// ============================================================================