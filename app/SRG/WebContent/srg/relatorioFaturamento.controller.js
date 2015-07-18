sap.ui.controller("srg.relatorioFaturamento", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf srg.relatorioFaturamento
*/
	onInit: function() {

//		var oBusinessData = [ {
//			Country : "Canada",
//			revenue : 410.87,
//			profit : -141.25,
//			population : 34789000
//		}, {
//			Country : "China",
//			revenue : 338.29,
//			profit : 133.82,
//			population : 1339724852
//		}, {
//			Country : "France",
//			revenue : 487.66,
//			profit : 348.76,
//			population : 65350000
//		}, {
//			Country : "Germany",
//			revenue : 470.23,
//			profit : 217.29,
//			population : 81799600
//		}, {
//			Country : "India",
//			revenue : 170.93,
//			profit : 117.00,
//			population : 1210193422
//		}, {
//			Country : "United States",
//			revenue : 905.08,
//			profit : 609.16,
//			population : 313490000
//		} ];
//
//		oModel = new sap.ui.model.json.JSONModel();
//
//		oModel.setData({
//			businessData : oBusinessData
//		});
//
//		sap.ui.getCore().setModel(oModel);		

		
		var oModel = new sap.ui.model.xml.XMLModel();
		oModel.loadData("dados/modelo_xml");
		sap.ui.getCore().setModel(oModel);
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf srg.relatorioFaturamento
*/
	onBeforeRendering: function() {
		
	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf srg.relatorioFaturamento
*/
	onAfterRendering: function() {
 
		// Gráfico não estava carregando na tela assim que navegavamos para a mesma
		// é necessário o comando abaixo para gerar o resfresh e o gráfico aparecer
		sap.ui.getCore().getModel( ).refresh(true);	
		
		//Esconde opções de gráficos que não funcionam
		$("#content").find(".viz-controls-switchbar-switcher-container").children(':nth-child(3)').hide();
		$("#content").find(".viz-controls-switchbar-switcher-container").children(':nth-child(4)').hide();
	    $("#content").find(".viz-controls-switchbar-switcher-container").children(':nth-child(5)').hide();
	    $("#content").find(".viz-controls-switchbar-switcher-container").children(':nth-child(6)').hide();
		
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf srg.relatorioFaturamento
*/
//	onExit: function() {
//
//	}

	formataMoeda: function(
			g) {

		if (g != null) {
			var int = parseInt(g
					.replace(
							/[\D]+/g,
							''));

			var tmp = int
					+ '';
			tmp = tmp
					.replace(
							/([0-9]{2})$/g,
							",$1");
			if (tmp.length > 6)
				tmp = tmp
						.replace(
								/([0-9]{3}),([0-9]{2}$)/g,
								".$1,$2");
			return tmp;
		}
	},

	voltarPrincipal: function(){
		var proximaView = sap.ui.getCore().byId("view_princ");
		sap.ui.getCore().byId("main_container").to(proximaView,"flip");
	},
	
	resfreshGrafico: function(){
		sap.ui.getCore().getModel( ).refresh(true);	
	},
	
});