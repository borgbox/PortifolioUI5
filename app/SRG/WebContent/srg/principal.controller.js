sap.ui.controller("srg.principal", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf srg.principal
	 */
	onInit : function() {

	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf srg.principal
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf srg.principal
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf srg.principal
	 */
	// onExit: function() {
	//
	// }
	
	sairAplicacao : function() {

		navigator.app.exitApp();
	},

	
	validarSairApp : function() {
		var oConfirmationDialog = new sap.ui.commons.Dialog("DialogConf", {
			title : "Confirmação",
			modal : true,
			//height : "60%",
			width : "60%"
		});
		var oTextView = new sap.ui.commons.TextView("txtViewconf", {
			text : "Deseja realmente deixar a aplicação ?"
		});
		oConfirmationDialog.addContent(oTextView);
		oConfirmationDialog.addButton(new sap.ui.commons.Button({
			text : "Sim",
			//width : "100%",
			press : function() {
				navigator.app.exitApp();
				oConfirmationDialog.close();
			}
		}));
		oConfirmationDialog.addButton(new sap.ui.commons.Button({
			text : "Não",
			//width : "100%",
			press : function() {
				oConfirmationDialog.close();
			}
		}));

		oConfirmationDialog.open();
		
	},

	onNavToRelatorioFat : function() {
		var proximaView = sap.ui.getCore().byId("view_relat_fat");
		sap.ui.getCore().byId("main_container").to(proximaView, "slide");
	},

});