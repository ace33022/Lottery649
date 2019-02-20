/**
 *
 * @description Lottery649
 *
 * @version 2018/08/05 初始版本。
 *
 * @author ace
 *
 * @see {@link http://requirejs.org/|RequireJS}
 *
 * @see {@link https://jquery.com/|jQuery}
 *
 * @see {@link https://getbootstrap.com/|Bootstrap · The most popular HTML, CSS, and JS library in the world.}
 *
 * @see {@link http://underscorejs.org/|Underscore.js}
 * @see {@link https://github.com/jashkenas/underscore|jashkenas/underscore: JavaScript's utility _ belt}
 *
 * @see {@link http://backbonejs.org/|Backbone.js}
 * @see {@link https://github.com/jashkenas/backbone|jashkenas/backbone: Give your JS App some Backbone with Models, Views, Collections, and Events}
 * @see {@link https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites|Tutorials, blog posts and example sites · jashkenas/backbone Wiki}
 *
 * @see {@link https://api.jquery.com/attribute-equals-selector/|Attribute Equals Selector [name=”value”] | jQuery API Documentation}
 * @see {@link https://api.jquery.com/multiple-attribute-selector/|Multiple Attribute Selector [name=”value”][name2=”value2″] | jQuery API Documentation}
 *
 * @see {@link https://github.com/tristen/tablesort|tristen/tablesort: A small tablesorter in plain JavaScript}
 *
 * @see {@link https://www.highcharts.com/|Interactive JavaScript charts for your webpage | Highcharts}
 *
 * @see {@link https://learn.jquery.com/using-jquery-core/faq/how-do-i-disable-enable-a-form-element/|How do I disable/enable a form element? | jQuery Learning Center}
 * @see {@link http://zh-tw.learnlayout.com/display.html|CSS - 關於 "display" 屬性}
 * @see {@link https://stackoverflow.com/questions/4942070/differences-between-detach-hide-and-remove-jquery|javascript - Differences between detach(), hide() and remove() - jQuery - Stack Overflow}
 *
 * @see {@link https://stackoverflow.com/questions/18432394/how-to-make-twitter-bootstrap-modal-full-screen|css - How to make Twitter bootstrap modal full screen - Stack Overflow}
 * @see {@link https://stackoverflow.com/questions/35177128/radio-buttons-in-bootstrap-navigation-bar|css - Radio buttons in bootstrap navigation bar - Stack Overflow}
 *
 */

Configurations.loadJS(Configurations.requirejsFile, function() {

	requirejs.config(tw.ace33022.RequireJSConfig);
	
	requirejs(["tw.ace33022.util.browser.ReUtils"], function(ReUtils) {
	
		ReUtils.beforeInitEnv(function() {
		
			requirejs(["tw.ace33022.backbone.view.MSC00010", "tw.ace33022.util.browser.FormUtils"], function(View, FormUtils) {
			
				var view = new View({});
				
				view.addDropdownMenu({

					"menuCaption": "其它",
					"items": [
						{
							"caption": "關於",
							"click": function(event) {

								FormUtils.showAbout();
							}
						},
						{
							"caption": "建議/問題反應",
							"click": function(event) {

								FormUtils.showTextareaModal({
								
									"title": "建議事項／問題回報",
									"callback": function(data) {
									
										var ajaxSettings = {
									
											// "contentType": "application/json; charset=utf-8",
											"dataType": "json",
											"url": "https://script.google.com/macros/s/AKfycbzZhqYzi19HEWCuTY6HyzwtbLBJlUbzC3vOZ831/exec",
											"data": data,
											"type": "POST",
											"success": function(data, textStatus, jqXHR) {
										
												if (data["error_code"] == 0) {
											
													// FormUtils.showMessage('感謝提供建議或問題反應！！');
												}
												else {
											
													// show error message
												}
											},
											"error": function(jqXHR, textStatus, errorThrown) {
										
												// show error message
											}
										};
									
										if (data === '') {
										
											FormUtils.showMessage('內容空白？！', function() { jQuery(event.target).trigger('click'); });
										}
										else {
										
											jQuery.ajax(ajaxSettings);
											
											FormUtils.showMessage('感謝提供建議或問題反應！！');
										}
									}
								});
							}
						}
					]
				});

				FormUtils.showLoadingEffect(
				
					function(closeLoadingEffect) {
					
						var url = 'https://script.google.com/macros/s/AKfycbwISkmpTFPRT0i-3nqBvsi_JNGiz95jYdtIv1_h/exec';
						
						jQuery.getJSON(url, function(data, textStatus, jqXHR) {
						
							if (data["error_code"] === 0) {
		
								view.setArrCheckedNum([]);
								
								view.loadDataFromJSONArray(data["result"], function() {
								
									var tag = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
													+ '<!-- Lottery649 -->'
													+ '<ins class="adsbygoogle" style="display: inline-block; width: 100%; height:90px;" data-ad-client="ca-pub-2244483882494685" data-ad-slot="6983669039" data-ad-format="auto" data-full-width-responsive="true"></ins>'
													+ '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';

									view.getContainer().find('tbody').parent().parent().scrollTop(view.getContainer().find('tbody').parent().parent()[0].scrollHeight);
									
									closeLoadingEffect();
								
									if ((location.protocol == 'http:') || (location.protocol == 'https:')) {
									
										view.getContainer().append(tag);
									}
									
									jQuery(window).trigger('resize');
								});
							}
							else {

								closeLoadingEffect();
					
								FormUtils.showMessage('資料處理過程有誤，錯誤訊息：' + data['error_message']);
							}
						});
					}
				);
			});
		});
	});
});
