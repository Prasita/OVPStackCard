/**

 */
(function () {
    "use strict";
    /*global jQuery, sap */

    jQuery.sap.declare("mock.OVPMockTest1.ext.task.Component");
    jQuery.sap.require("sap.ovp.cards.custom.Component");

    sap.ovp.cards.custom.Component.extend("mock.OVPMockTest1.ext.task.Component", {
        // use inline declaration instead of component.json to save 1 round trip
        metadata: {
            properties: {
                "headerFragment": {
                    "type": "string",
                    "defaultValue": ""
                },
                "footerFragment":{
                    "type": "string",
                    "defaultValue": ""
                },
                "contentFragment": {
                    "type": "string",
                    "defaultValue": "mock.OVPMockTest1.ext.task.Task"
                }

            },

            version: "@version@",

            library: "sap.ovp",

            includes: [],

            dependencies: {
                libs: [ "sap.m" ],
                components: []
            },
            config: {},
            customizing: {
                "sap.ui.controllerExtensions": {
                    "sap.ovp.cards.generic.Card": {
                        controllerName: "mock.OVPMockTest1.ext.task.Task"
                    }
                }
            }
        }
    });
})();
