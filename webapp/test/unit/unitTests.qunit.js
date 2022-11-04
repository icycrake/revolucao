/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"thiago/image_search/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
