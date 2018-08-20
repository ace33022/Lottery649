/**
 *
 * Lottery649
 *
 * @description
 *
 * @version 2018/08/05 初始版本。
 *
 * @author ace
 *
 * @see <a href="http://requirejs.org/">RequireJS</a>
 *
 * @see <a href="https://jquery.com/">jQuery</a>
 *
 * @see <a href="http://underscorejs.org/">Underscore.js</a>
 * @see <a href="https://github.com/jashkenas/underscore">jashkenas/underscore: JavaScript's utility _ belt</a>
 * @see <a href="http://backbonejs.org/">Backbone.js</a>
 * @see <a href="https://github.com/jashkenas/backbone">jashkenas/backbone: Give your JS App some Backbone with Models, Views, Collections, and Events</a>
 * @see <a href="https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites">Tutorials, blog posts and example sites · jashkenas/backbone Wiki</a>
 *
 * @see <a href="https://getbootstrap.com/">Bootstrap · The most popular HTML, CSS, and JS library in the world.</a>
 *
 * @comment
 *
 * @todo
 *
 */

Configurations.loadJS(Configurations.requirejsFile, function() {

	requirejs.config(tw.ace33022.RequireJSConfig);
	
	requirejs(["tw.ace33022.util.browser.ReUtils", "tw.ace33022.util.browser.FormUtils", "underscore"], function(ReUtils, FormUtils) {
	
		jQuery(document).ready(function() {

			ReUtils.beforeInitEnv(function() {
			
				requirejs(["tw.ace33022.backbone.view.MSC00010", "tw.ace33022.util.StringUtils"], function(View, StringUtils) {
				
					var appId = 'appId' + Math.random().toString(36).substr(2, 6);

					var view;

					var btnLottery649NumPadId = 'btnLottery649NumPad' + Math.random().toString(36).substr(2, 6);
					var chart01Id = 'chart01' + Math.random().toString(36).substr(2, 6);
					var chart02Id = 'chart02' + Math.random().toString(36).substr(2, 6);
					var report01Id = 'report01' + Math.random().toString(36).substr(2, 6);
					var dataFilterId = 'dataFilter01' + Math.random().toString(36).substr(2, 6);

					jQuery('body').append('<div id="' + appId + '" class="container-fluid"></div>');

					view = new View({

						"el": '#' + appId,
						"buttonAddedTrigger": function() {

							if (this.getArrLottery649LogsVO().length == 0) {

								jQuery('#' + btnLottery649NumPadId).parent().addClass('disabled');
								jQuery('#' + chart01Id).parent().addClass('disabled');
								jQuery('#' + chart02Id).parent().addClass('disabled');
								jQuery('#' + report01Id).parent().addClass('disabled');
								jQuery('#' + dataFilterId).parent().addClass('disabled');
							}
							else {

								jQuery('#' + btnLottery649NumPadId).parent().removeClass('disabled');
								jQuery('#' + chart01Id).parent().removeClass('disabled');
								jQuery('#' + chart02Id).parent().removeClass('disabled');
								jQuery('#' + report01Id).parent().removeClass('disabled');
								jQuery('#' + dataFilterId).parent().removeClass('disabled');
							}
						},
						"dataChangeTrigger": function() {
					
							if (this.getArrLottery649LogsVO().length == 0) {

								jQuery('#' + btnLottery649NumPadId).parent().addClass('disabled');
								jQuery('#' + chart01Id).parent().addClass('disabled');
								jQuery('#' + chart02Id).parent().addClass('disabled');
								jQuery('#' + report01Id).parent().addClass('disabled');
								jQuery('#' + dataFilterId).parent().addClass('disabled');
							}
							else {

								jQuery('#' + btnLottery649NumPadId).parent().removeClass('disabled');
								jQuery('#' + chart01Id).parent().removeClass('disabled');
								jQuery('#' + chart02Id).parent().removeClass('disabled');
								jQuery('#' + report01Id).parent().removeClass('disabled');
								jQuery('#' + dataFilterId).parent().removeClass('disabled');
							}
						}
					});

					view.addDropdownMenu({

						"menuCaption": "載入資料",
						"items": [
							{
								"caption": "From File",
								"click": function(event) {

									jQuery('.collapse').collapse('hide');

									FormUtils.selectFileModal({

										"title": "選取檔案",
										"callback": function(file) {

											if (file != null) view.loadDataFromCSVFile(file);
										}
									});
								}
							},
							{
								"caption": "選取號碼",
								"id": btnLottery649NumPadId,
								"click": function(event) {

									jQuery('.collapse').collapse('hide');

									view.showLottery649NumberPad();
								}
							},
							{
								"caption": "排序/篩選",
								"id": dataFilterId,
								"click": function(event) {

									var tag;
								
									var modalHeader, modalBody, modalFooter;
									var baseModal;
									
									jQuery('.collapse').collapse('hide');

									tag = '<div class="modal-header">'
											+ '  <h4 style="text-align: center;">排序/篩選</h4>'
											+ '</div>';
									modalHeader = jQuery(tag);

									tag = '<div class="modal-footer">'
											+ '  <input type="button" class="btn btn-primary" data-dismiss="modal" value="關閉" />'
											+ '</div>';
									modalFooter = jQuery(tag);

									tag = '<div style="margin-top: 2px; margin-bottom: 2px;">'
											+ '  <span>獎號順序：</span>'
											+ '  <div class="btn-group">'
											+ '    <label class="btn" style="overflow: hidden; vertical-align: middle;"><input type="radio" style="position: absolute; vertical-align: middle; height: 1px; width: 1px; top: -20px;" name="sortType" value="prizeSort">獎號開出順序</label>'
											+ '    <label class="btn" style="overflow: hidden; vertical-align: middle;"><input type="radio" style="position: absolute; vertical-align: middle; height: 1px; width: 1px; top: -20px;" name="sortType" value="numberSort">獎號大小順序</label>'
											+ '  </div>'
											+ '</div>'
											+ '<div style="margin-top: 2px; margin-bottom: 2px;">'
											+ '  <span>獎號篩選：</span>'
											+ '  <div class="btn-group">'
											+ '    <label class="btn" style="overflow: hidden; vertical-align: middle;"><input type="radio" style="position: absolute; vertical-align: middle; height: 1px; width: 1px; top: -20px;" name="prize" value="all">ALL</label>'
											+ '    <label class="btn" style="overflow: hidden; vertical-align: middle;"><input type="radio" style="position: absolute; vertical-align: middle; height: 1px; width: 1px; top: -20px;" name="prize" value="prize01">只顯示頭獎開出資料</label>';
											+ '  </div>'
											+ '</div>';
									modalBody = jQuery(tag);
								
									modalBody.find('input').on('click', function(event) {
								
										jQuery(this).parent().siblings().removeClass('btn-primary');
										jQuery(this).parent().siblings().removeClass('btn-default');
									
										modalBody.find('input[name="' + jQuery(this).prop('name') + '"]').each(function(index, element) {
								
											if (jQuery(element).prop('checked') == true) {
									
												jQuery(element).parent().addClass('btn-primary');
											}
											else {
									
												jQuery(element).parent().addClass('btn-default');
											}
										});
									});
								
									baseModal = FormUtils.addBaseModal(modalHeader, modalBody, modalFooter);
								
									baseModal.on('shown.bs.modal', function(event) {
								
										var filterCondition = view.getFilterCondition();
								
										modalBody.find('input[name="prize"][value="' + filterCondition["prize"] + '"]').prop('checked', true);
										modalBody.find('input[name="sortType"][value="' + filterCondition["sortType"] + '"]').prop('checked', true);

										modalBody.find('input[name="prize"][value="' + filterCondition["prize"] + '"]').trigger('click');
										modalBody.find('input[name="sortType"][value="' + filterCondition["sortType"] + '"]').trigger('click');
									});
								
									baseModal.on('hidden.bs.modal', function(event) {
								
										var filterCondition = {
									
											"prize": baseModal.find('input[name="prize"]:checked').val(),
											"sortType": baseModal.find('input[name="sortType"]:checked').val()
										};
									
										jQuery(this).remove();
									
										view.setFilterCondition(filterCondition);
									});
	
									baseModal.modal('show');
								}
							}
						]
					});

					view.addDropdownMenu({

						"menuCaption": "Chart",
						"items": [
							{
								"caption": "獎號統計圖",
								"id": chart01Id,
								"click": function(event) {
							
									// Display Chart Column

									jQuery('.collapse').collapse('hide');
								
									view.showChart01();
								}
							},
							{
								"caption": "獎號總和線形圖",
								"id": chart02Id,
								"click": function(event) {
							
									// Display Chart Column
								
									jQuery('.collapse').collapse('hide');
								
									view.showChart02();
								}	
							}
						]
					});

					view.addDropdownMenu({

						"menuCaption": "Report",
						"items": [
							{
								"caption": "獎號近期資訊",
								"id": report01Id,
								"click": function(event) {

									jQuery('.collapse').collapse('hide');

									requirejs(["moment", "sprintfjs"], function(moment) {

										function findLastAppeared(num) {

											var result = null;

											var index = view.getArrLottery649LogsVO().length - 1;
											var vo;

											for (; index >= 0; index--) {

												vo = view.getArrLottery649LogsVO()[index];

												if (((vo.getNum01() === num) || (vo.getNum02() === num) || (vo.getNum03() === num) || (vo.getNum04() === num) || (vo.getNum05() === num) || (vo.getNum06() === num)) === true) {

													result = vo;
													break;
												}
											}

											return result;
										}

										var index;
										var vo;

										var tag;
										var trElement;

										var modalHeader, modalBody, modalFooter;
										var baseModal;

										tag = '<div class="modal-header">'
												+ '  <h4 style="text-align: center;">獎號近期資訊</h4>'
												+ '</div>';
										modalHeader = jQuery(tag);

										tag = '<div class="modal-footer">'
												+ '  <input type="button" class="btn btn-primary" data-dismiss="modal" value="關閉" />'
												+ '</div>';
										modalFooter = jQuery(tag);

										tag = '<table class="table table-hover table-bordered">'
												+ '  <thead>'
												+ '    <tr>'
												+ '      <th style="text-align: center; background-color: #A9A9A9; cursor: default;">獎號</th>'
												+ '      <th style="text-align: center; background-color: #A9A9A9; cursor: default;">開獎日</th>'
												+ '    </tr>'
												+ '  </thead>'
												+ '  <tbody class="rowlink"></tbody>'
												+ '</table>';
										modalBody = jQuery(tag);

										for (index = 1; index <= 49; index++) {

											vo = findLastAppeared(sprintf('%02d', index));

											if (vo !== null) {

												tag = '<tr>'
														+ '  <td style="text-align: center;">' + sprintf('%02d', index) + '</td>'
														+ '  <td style="text-align: center;">' + moment(vo.getDrawDate(), 'YYYYMMDD', true).format('YYYY/MM/DD') + '</td>'
														+ '</tr>';
												trElement = jQuery(tag);

												// if (_.indexOf(view.getArrCheckedNum(), sprintf('%02d', index)) != -1) trElement.find('td').addClass('bg-primary');
												if (_.indexOf(view.getArrCheckedNum(), sprintf('%02d', index)) != -1) trElement.find('td').css({"background-color": "#337AB7"});

												modalBody.find('tbody').append(trElement);
											}
										}

										baseModal = FormUtils.addBaseModal(modalHeader, modalBody, modalFooter);

										baseModal.find('tbody td').on('click', function(event) {
									
											if (StringUtils.rgb2hex(jQuery(event.target).css('background-color')) == '337AB7') {
										
												jQuery(event.target).parent().find('td').css({"background-color": "#FFFFFF"});
											}
											else {
										
												jQuery(event.target).parent().find('td').css({"background-color": "#337AB7"});
											}
										});
									
										baseModal.on('shown.bs.modal', function(event) {
									
											requirejs(["tablesort"], function() {
										
												new Tablesort(baseModal.find('table')[0]);
											});
										});

										baseModal.on('hidden.bs.modal', function(event) {
									
											var arrCheckedNum = new Array();
										
											baseModal.find('tbody tr').each(function(index, element) {
										
												if (StringUtils.rgb2hex(jQuery(element).find('td').first().css('background-color')) == '337AB7') arrCheckedNum.push(jQuery(element).find('td').first().text());
											});

											jQuery(this).remove();
										
											view.setArrCheckedNum(arrCheckedNum);
										});
	
										baseModal.modal('show');
									});
								}
							}
						]
					});
				});
			});
		});	// document ready
	});
});