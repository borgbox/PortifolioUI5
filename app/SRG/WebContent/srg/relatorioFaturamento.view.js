sap.ui
		.jsview(
				"srg.relatorioFaturamento",
				{

					/**
					 * Specifies the Controller belonging to this View. In the
					 * case that it is not implemented, or that "null" is
					 * returned, this View does not have a Controller.
					 * 
					 * @memberOf srg.relatorioFaturamento
					 */
					getControllerName : function() {
						return "srg.relatorioFaturamento";
					},

					/**
					 * Is initially called once after the Controller has been
					 * instantiated. It is the place where the UI is
					 * constructed. Since the Controller is given to this
					 * method, its event handlers can be attached right away.
					 * 
					 * @memberOf srg.relatorioFaturamento
					 */
					createContent : function(oController) {

						/*
						 * ÍNICIO GRÁFICO 01 FATURAMENTO PREVISTO X FATURAMENTO
						 * REALIZADO X COMPRAS REALIZADAS
						 */
						// (function() {
						/*
						 * Cria o dataset que alimentnará o gráfico de
						 * Faturamento Previsto X Faturamento Realizado X
						 * Compras Realizadas
						 */
						var dataset = new sap.viz.ui5.data.FlattenedDataset({
							dimensions : [ {
								axis : 1,
								name : 'Data',
								value : "{data}"
							} ],
							measures : [ {
								name : 'Faturamento Previsto',
								value : '{Fatprevisto}'
							}, {
								name : 'Faturamento Realizado',
								value : '{Fatrealizado}'
							}, {
								name : 'Compras Realizadas',
								value : '{Comprasrealizadas}'
							} ],
							data : {
								path : "/Faturamento/item"
							}

						});

						/*
						 * Cria o dataset que alimentnará o gráfico de
						 * Faturamento Previsto X Faturamento Realizado X
						 * Compras Realizadas
						 */
						var oVizContainer = new sap.viz.ui5.VizContainer({
							'uiConfig' : {
								'layout' : 'vertical',
								'enableMorphing' : true
							},
							'width' : '100%',
							'height' : '100%',
							title : {
								visible : true,
								text : 'Faturamentos e Compras (%)'
							}
						});

						// Associa o modelo ao gráfico
						oVizContainer.setVizData(dataset)
						oVizContainer.setModel(sap.ui.getCore().getModel());

						// Sate feeds
						var aobjData = new sap.viz.ui5.controls.common.feeds.AnalysisObject(
								{
									uid : "data_id",
									name : "Data",
									type : "Dimension"
								}), aobjFatprevisto = new sap.viz.ui5.controls.common.feeds.AnalysisObject(
								{
									uid : "Fatprevisto_id",
									name : "Faturamento Previsto",
									type : "Measure"
								}), aobjFatRealizado = new sap.viz.ui5.controls.common.feeds.AnalysisObject(
								{
									uid : "Fatrealizado_id",
									name : "Faturamento Realizado",
									type : "Measure"
								}), aobjComprasRealizadas = new sap.viz.ui5.controls.common.feeds.AnalysisObject(
								{
									uid : "Comprasrealizadas_id",
									name : "Compras Realizadas",
									type : "Measure"
								});

						var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem(
								{
									uid : "primaryValues",
									type : "Measure",
									values : [ aobjFatprevisto,
											aobjFatRealizado,
											aobjComprasRealizadas ]
								}), feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem(
								{
									uid : "axisLabels",
									type : "Dimension",
									values : [ aobjData ]
								});

						oVizContainer.addFeed(feedPrimaryValues);
						oVizContainer.addFeed(feedAxisLabels);

						// attach event listener for feedschange
						oVizContainer
								.attachEvent(
										'feedsChanged',
										function(e) {
											// You could add your own logic
											// to handle feedsChanged to set
											// new dataset to vizContainer.
											// Reset current data for demo
											// purpose.
											oVizContainer
													.setVizData(new sap.viz.ui5.data.FlattenedDataset(
															{
																dimensions : [ {
																	axis : 1,
																	name : 'Data',
																	value : "{data}"
																} ],
																measures : [
																		{
																			name : 'Faturamento Previsto',
																			value : '{Fatprevisto}'
																		},
																		{
																			name : 'Faturamento Realizado',
																			value : '{Fatrealizado}'
																		},
																		{
																			name : 'Compras Realizadas',
																			value : '{Comprasrealizadas}'
																		} ],
																data : {
																	path : "/Faturamento/item"
																}
															}));
											oVizContainer.setModel(sap.ui
													.getCore().getModel());
										});

						/*
						 * OBS.: No evento onAfterRendering no controller existe
						 * lógica para esconder as opções de gráfico indesejadas
						 */

						// })();
						/*
						 * FIM GRÁFICO 01 FATURAMENTO PREVISTO X FATURAMENTO
						 * REALIZADO X COMPRAS REALIZADAS
						 */

						/*
						 * ÍNICIO GRÁFICO 02 TOTAIS
						 */
						var dataset2 = new sap.viz.ui5.data.FlattenedDataset({
							dimensions : [ {
								axis : 1,
								name : 'Centro',
								value : "{Centro}"
							} ],
							measures : [ {
								name : 'Faturamento Previsto (R$)',
								value : '{Fatprevisto}',
								formatter : function(g) {
									oController.formataMoeda(g);
								}
							}, {
								name : 'Faturamento Realizado (R$)',
								value : '{Fatrealizado}',
								formatter : function(g) {
									oController.formataMoeda(g);
								}
							}, {
								name : 'Compras Realizadas (R$)',
								value : '{Comprasrealizadas}',
								formatter : function(g) {
									oController.formataMoeda(g);
								}
							} ],
							data : {
								path : "/totais"
							}

						});

						var grfColunaTotais = new sap.viz.ui5.Column({
							id : "colunaTotais",
							width : "100%",
							height : "100%",
							plotArea : {
							// 'colorPalette' : d3.scale.category20().range()
							},
							title : {
								visible : true,
								text : ' '
							},
							xAxis : {
								title : {
									visible : true
								}
							},
							dataset : dataset2
						});
						/*
						 * FIM GRÁFICO 02 TOTAIS
						 */

						/*
						 * ÍNICIO GRÁFICO 03 PERCENTUAIS
						 */
						var dataset3 = new sap.viz.ui5.data.FlattenedDataset({
							dimensions : [ {
								axis : 1,
								name : 'Centro',
								value : "{Centro}"
							} ],
							measures : [ {
								name : 'Percentual de Compra Ideal',
								value : '{Fatprevisto}',
								formatter : function(g) {
									oController.formataMoeda(g);
								}
							}, {
								name : 'Compra Realizada x Fat. Realizado',
								value : '{Fatrealizado}'
							}, {
								name : 'Compra Realizada x Projetada',
								value : '{Comprasrealizadas}'
							} ],
							data : {
								path : "/percentuais"
							}

						});

						var grfColunaPercentuais = new sap.viz.ui5.Column({
							id : "colunaPercentuais",
							width : "100%",
							height : "100%",
							plotArea : {
							// 'colorPalette' : d3.scale.category20().range()
							},
							title : {
								visible : true,
								text : ' '
							},
							xAxis : {
								title : {
									visible : true
								}
							},
							dataset : dataset3
						});
						/*
						 * FIM GRÁFICO 03 PERCENTUAIS
						 */

						/*
						 * ÍNICIO GRÁFICO 04 PERCENTUAIS
						 */
						var dataset4 = new sap.viz.ui5.data.FlattenedDataset({
							dimensions : [ {
								axis : 1,
								name : 'Data',
								value : "{data}"
							} ],
							measures : [ {
								name : 'Percentual de Compra Ideal',
								value : '{Fatprevisto}',
								formatter : function(g) {
									oController.formataMoeda(g);
								}
							}, {
								name : 'Compra Realizada x Projetada',
								value : '{Comprasrealizadas}'
							} ],
							data : {
								path : "/percentuaisvstempo/item"
							}

						});

						var grfPercCompraReal = new sap.viz.ui5.Line({
							id : "grfPercCompraReal",
							width : "100%",
							height : "100%",
							plotArea : {
							// 'colorPalette' : d3.scale.category20().range()
							},
							title : {
								visible : true,
								text : ' '
							},
							xAxis : {
								title : {
									visible : true
								}
							},
							dataset : dataset4
						});
						/*
						 * FIM GRÁFICO 04 PERCENTUAIS
						 */

						var oTable = new sap.ui.table.Table("tblFatPrev", {
							visibleRowCount : 5,
							editable : false,
							rows : '{/Faturamento/item}'
						});

						oTable.addColumn(new sap.ui.table.Column({

							label : new sap.ui.commons.Label({
								text : "Data"
							}),
							visible : true,
							template : new sap.ui.commons.TextView({
								text : "{data}"
							})

						}));

						oTable
								.addColumn(new sap.ui.table.Column(
										{

											label : new sap.ui.commons.Label({
												text : "Faturamento Previsto"
											}),
											visible : true,
											template : new sap.ui.commons.TextView(
													{
														text : {
															path : "Fatprevisto",
															formatter : function(
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
															}
														}
													})

										}));

						oTable
								.addColumn(new sap.ui.table.Column(
										{

											label : new sap.ui.commons.Label({
												text : "Faturamento Realizado"
											}),
											visible : true,
											template : new sap.ui.commons.TextView(
													{
														text : {
															path : "Fatrealizado",
															formatter : function(
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
															}
														}
													})

										}));

						oTable
								.addColumn(new sap.ui.table.Column(
										{

											label : new sap.ui.commons.Label({
												text : "Compras Realizadas"
											}),
											visible : true,
											template : new sap.ui.commons.TextView(
													{
														text : {
															path : "Comprasrealizadas",
															formatter : function(
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
															}
														}
													})

										}));

						/*
						 * ÍNICIO MONTA A APRESENTAÇÃO EM CARROUSSEL
						 */
						// var oCarousel = new sap.ui.commons.Carousel();
						// oCarousel.setWidth("100%");
						// oCarousel.setHeight("60%");
						// oCarousel.setVisibleItems(1);
						// oCarousel.setOrientation("horizontal");
						//
						// oCarousel.addContent(oVizContainer);
						// oCarousel.addContent(grfColunaTotais);
						// oCarousel.addContent(grfColunaPercentuais);
						// oCarousel.addContent(grfPercCompraReal);
						/*
						 * FIM
						 */

						/*
						 * ÍNICIO DA APRESENTAÇÃO EM ABAS
						 */
						var oTabStrip1 = new sap.ui.commons.TabStrip("TabStrip1");
						oTabStrip1.setWidth("100%");
						oTabStrip1.setHeight("60%");
												
						oTab1 = new sap.ui.commons.Tab("tab1");
						oTab1.setTitle(new sap.ui.core.Title("Title1",{text:"Variação no tempo", icon : "sap-icon://column-chart-dual-axis"}));
						oTab1.addContent(oVizContainer);
						oTabStrip1.addTab(oTab1);
						
						oTab2 = new sap.ui.commons.Tab("tab2");
						oTab2.setTitle(new sap.ui.core.Title("Title2",{text:"Gráfico de Totais", icon : "sap-icon://bar-chart"}));
						oTab2.addContent(grfColunaTotais);
						oTabStrip1.addTab(oTab2);
						
						oTab3 = new sap.ui.commons.Tab("tab3");
						oTab3.setTitle(new sap.ui.core.Title("Title3",{text:"Gráfico de Percentuais", icon : "sap-icon://bar-chart"}));
						oTab3.addContent(grfColunaPercentuais);
						oTabStrip1.addTab(oTab3);
						
						oTab4 = new sap.ui.commons.Tab("tab4");
						oTab4.setTitle(new sap.ui.core.Title("Title4",{text:"Percentual X Compras Real", icon : "sap-icon://line-charts"}));
						oTab4.addContent(grfPercCompraReal);
						oTabStrip1.addTab(oTab4);
						/*
						 * FIM MONTA A APRESENTAÇÃO EM CARROUSSEL
						 */

						var oDivider2 = new sap.ui.commons.HorizontalDivider(
								"divider2", {
									width : "70%",
									type : "Page",
									height : "Large"
								});


						
						return new sap.m.Page({
							title : "FATURAMENTO PREVISTO  X FATURAMENTO REALIZADO  X COMPRAS REALIZADAS",
							footer : new sap.m.Bar({
								contentRight : new sap.m.Button({
									text : "Voltar",
									press : oController.voltarPrincipal
								})

							}),
							content : [oTabStrip1, oDivider2 , oTable ]

						});
					},

				});