sap.ui.core.mvc.Controller.extend("shambles.blog.view.Detail", {

	onInit: function() {
		var view = this.getView();

		sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
			// when detail navigation occurs, update the binding context
			if (oEvent.getParameter("name") === "Detail") {
				var context = new sap.ui.model.Context(view.getModel(), "/" + oEvent.getParameter("arguments").contextPath);
				view.setBindingContext(context);
				// var contextOAuth = view.getBindingContext().getPath() + "/" + "oAuths";
				
				// view.byId("iconTabAjaxTools").setBindingContext(contextOAuth);
				// Make sure the master is here
			}
		}, this);
	},
	
	onExit: function() {
	},
	
	handleNavButtonPress: function(oEvent) {
        var history = sap.ui.core.routing.History.getInstance();
		var url = sap.ui.core.UIComponent.getRouterFor(this).getURL("master", {});
		var direction = history.getDirection(url);
		if ("Backwards" === direction) {
			window.history.go(-1);
		} else {
			var replace = true; // otherwise we go backwards with a forward history
			this.navTo(route, data, replace);
		}
	},
	
});