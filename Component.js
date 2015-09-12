jQuery.sap.declare("shambles.blog.Component");
jQuery.sap.require("shambles.blog.MyRouter");

sap.ui.core.UIComponent.extend("shambles.blog.Component", {
	metadata : {
		name : "Electron Test",
		version : "1.0",
		includes : [],
		dependencies : {
			libs : ["sap.m", "sap.ui.layout"],
			components : []
		},

		rootView : "shambles.blog.view.App",

		config : {
			resourceBundle : "i18n/messageBundle.properties",
			serviceConfig : {
				name : "Northwind",
				serviceUrl : "http://services.odata.org/V2/(S(sapuidemotdg))/OData/OData.svc/"
			}
		},

		routing : {
			config : {
				routerClass : shambles.blog.MyRouter,
				viewType : "XML",
				viewPath : "shambles.blog.view",
				targetAggregation : "detailPages",
				clearTarget : false
			},
		}
	},

	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var mConfig = this.getMetadata().getConfig();

		// always use absolute paths relative to our own component
		// (relative paths will fail if running in the Fiori Launchpad)
		var rootPath = jQuery.sap.getModulePath("shambles.blog");

		// Create and set domain model to the component
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		this.setModel(oModel);

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : sap.ui.Device.system.phone,
			isNoPhone : !sap.ui.Device.system.phone,
			listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
			listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		this.setModel(deviceModel, "device");

		this.getRouter().initialize();

	}

});
