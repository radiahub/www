// ============================================================================
// Module      : www/radiahub.js
// Version     : 1.0
//
// Author      : Denis Patrice <denispatrice@yahoo.com>
// Copyright   : Copyright (c) Denis Patrice Dipl.-Ing. 2010-2025
//               All rights reserved
//
// Application : radiahub website
// Description : application first page
//
// Date+Time of change   By     Description
// --------------------- ------ ----------------------------------------------
// 20-Jan-25 00:00 WIT   Denis  Deployment V. 2025 "Raymond Chandler"
//
// ============================================================================

var radiahub = {

	page : null, myform : null,
	

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
		//console.log("IN radiahub.onbackbutton()");
		radiahub.hide();
	},

	onwindowresize: function()
	{
		return new Promise(
			(yes, no) => {
				console.info("IN radiahub.onwindowresize() page_id='" + radiahub.page.options.page_id + "'");
				myform.onwindowresize()
				.then (()=>{
					yes();
				})
				.catch(()=>{
					console.error("Rejected by myform.onwindowresize()");
					yes();
				});				
			}
		);
	},

	onthemechanged: function(newThemeID)
	{
		return new Promise(
			(yes, no) => {
				//console.log("IN radiahub.onthemechanged() newThemeID='" + newThemeID + "'");
				//Do something useful
				yes();
			}
		);
	},

	onshow: function()
	{
		//console.log("IN radiahub.onshow()");
		//console.log(pages.dump());

		myform = new form("FORM_SSO_QRLOGIN");

		var input_id = "inp_qrcode";
		var value = file2bin(context.libpath() + "radiahub_denis.vcf");
		myform.set(input_id, value);


		jQuery("#BTN_TEST_GET").off("click").on("click", function(){
			var input_id = "inp_qrcode";
			console.log(myform.get(input_id));
		});

		jQuery("#BTN_TEST_SET").off("click").on("click", function(){
			var input_id = "inp_qrcode";
			var value = file2bin(context.libpath() + "radiahub_denis.vcf");
			myform.set(input_id, value);
		});
		
		jQuery("#BTN_TEST_ERROR").off("click").on("click", function(){
			var input_id = "inp_qrcode";
			myform.error(input_id,"Error tested " + datetime.now());
		});

		jQuery("#BTN_TEST_UPLOAD").off("click").on("click", function(){
			var input_id = "inp_qrcode";
			myform.upload(input_id)
			.then ((binary_id)=>{
				console.log("Resolved by myform.upload() binary_id='" + binary_id + "'");
			})
			.catch(()=>{
				console.error("Rejected by myform.upload()");
			});
		});

		/*
		//console.log(application.package_id);
		//console.log(device.uuid);
		//console.log(decodeURIComponent(application.domURL));
		//console.log(application.iabLoadDelay);
		//console.log(String(application.sid));
		*/
		jQuery("#LINK_GOSSIP_GO_PAGER_API_S, #LINK_GOSSIP_GO_PAGER_API_L").off("click").on("click", function(){
			ripple(this, function(){
				sysmon.show();
			});
		});

		jQuery("#BTN_GOSSIP_DOWNLOAD_PAGER").off("click").on("click", function(){
			ripple(this, function(){
				var dataType = "FCMWEB_TEST_DATA";
				var data = {
					first_name : "Denis",
					best_name  : "Auguste Richard",
					timestamp  : datetime.now()
				};
				//fcmweb.push(fcmweb.pin, dataType, data, "Notification title", "You have a new message")
				fcmweb.push(ipc.pin, dataType, data)
				.then (()=>{
					//console.log("Resolved by fcmweb.push()");
				})
				.catch(()=>{
					//console.error("Rejected by fcmweb.push()");
				});
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
		//console.log("IN radiahub.hide()");
		if (radiahub.page !== null) {
			radiahub.page.remove();
			radiahub.page = null;
		}
		application.mobileExit();
	},

	show: function()
	{
		//console.log("IN radiahub.show()");	

		radiahub.page = new page({
			page_id          : "page_radiahub",
			contentURI       : "app/html/radiahub.html",
			scriptURI        : "app/js/radiahub.js",
			windowObjectName : "radiahub",
			onbackbutton     : radiahub.onbackbutton,
			onshow           : radiahub.onshow,
			onwindowresize   : radiahub.onwindowresize,
			onthemechanged   : radiahub.onthemechanged,
			globalize        : true
		});

		if (radiahub.page !== null) { 			
			radiahub.page.show();
		}
	}

};




// End of file: radiahub.js
// ============================================================================