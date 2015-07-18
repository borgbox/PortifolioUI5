sap.ui.jsview("srg.principal", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf srg.principal
	 */
	getControllerName : function() {
		return "srg.principal";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf srg.principal
	 */
	createContent : function(oController) {

		// title : "Hello Eclipse",
		// info : "Estrutura de um projeto MVC",
		// numberUnit: "Dificuldade",
		// number: "1",
		// icon: "icons/alarm.png",
		// press: function(){
		// window.location.href = "../hello_eclipse/WebContent";
		// }

		// MONTA LAUNCH PAD E SEUS ITENS
		var container1 = new sap.m.TileContainer({
			height : "100%",
			width : "100%",
			tiles : [ new sap.m.StandardTile({
				icon : "sap-icon://line-chart",
				title : "Relatório de Faturamento",
				press : oController.onNavToRelatorioFat
			}),

			new sap.m.StandardTile({
				icon : "sap-icon://bar-chart",
				title : "Relatório de Contas"

			}),

			new sap.m.StandardTile({
				icon : "sap-icon://bar-chart",
				title : "Relatório de Eficiência"

			}),

			new sap.m.StandardTile({
				icon : "sap-icon://bar-chart",
				title : "Relatório de Vendas"

			}),

			new sap.m.StandardTile({
				icon : "sap-icon://line-chart",
				title : "Relatório de Materiais"

			}),

			new sap.m.StandardTile({
				icon : "sap-icon://line-chart",
				title : "Relatório de Produção"

			})

			]

		});

		return new sap.m.Page({
			title : "SRG - Sistema de Relatórios Gerenciais",
			footer : new sap.m.Bar({
				contentRight : new sap.m.Button({
					text : "Sair",
					press : oController.validarSairApp
				})
			}),
			content : [ container1 ]
		});
	}

});