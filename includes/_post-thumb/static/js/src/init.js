/**
 * post_thumb
 * 
 * @version 1.0.3
 * @author INN STUDIO <inn-studio.com>
 */
define(function(require, exports, module){
	'use strict';
	var dialog = require('modules/jquery.dialog');
	/**
	 * init
	 * 
	 * @return 
	 * @example 
	 * @version 1.0.0
	 * @author INN STUDIO <inn-studio.com>
	 * @copyright Copyright (c) 2011-2013 INN STUDIO. (http://www.inn-studio.com)
	 **/
	exports.init = function(){
		jQuery(document).ready(function(){
			exports.bind();
		});
	};
	/**
	 * config for post_thumb
	 * 
	 * @version 1.0.1
	 * @author INN STUDIO <inn-studio.com>
	 * 
	 */
	exports.config = {
		post_thumb_id 				: '.theme-thumb',
		post_thumb_count_id			: '.count',
		post_thumb_up_id 			: '.theme-thumb .theme-thumb-up',
		post_thumb_down_id 			: '.theme-thumb .theme-thumb-down',
		post_thumb_up_count_id 		: '.theme-thumb .theme-thumb-up .count',
		post_thumb_down_count_id 	: '.theme-thumb .theme-thumb-down .count',
		lang : {
			M00001 : 'Loading, please wait...',
			E00001 : 'Server error or network is disconnected.'
		},
		process_url : ''
	};
	exports.init = function(){
		jQuery(document).ready(function(){
			exports.bind();
		});
	};
	exports.cache = {};
	/**
	 * Binding the <a> tag
	 * 
	 * @version 1.0.2
	 * @author INN STUDIO <inn-studio.com>
	 * 
	 */
	exports.bind = function(){
		jQuery(exports.config.post_thumb_id).on('click',function(){
			exports.cache.$post_thumb = jQuery(this);
			/** 
			 * need data-post-thumb="post_id,up"
			 */
			var attr_data = exports.cache.$post_thumb.data('postThumb'),
				attr_data_array = attr_data.split(',');
			eval('var ajax_data = {' + attr_data_array[1] + ' :  parseInt(attr_data_array[0])}');

			/** 
			 * ajax start
			 */
			exports.hook.dialog({
				id : 'post-thumb',
				content : tools.status_tip('loading',exports.config.lang.M00001)
			});
			jQuery.ajax({
				url : exports.config.process_url,
				dataType : 'json',
				data : ajax_data
			}).done(function(data){
				if(data && data.status && data.status === 'success'){
					// console.log(exports.hook.dialog);
					exports.hook.dialog({
						content : tools.status_tip('success',data.msg)
					});
					/** 
					 * add a new vote
					 */
					var $count = exports.cache.$post_thumb.find(exports.config.post_thumb_count_id);
					$count.text(parseInt($count.text()) + 1);							
				}else if(data && data.status && data.status === 'error'){
					exports.hook.dialog({
						content : tools.status_tip('warning',data.msg)
					});
				}else{
					exports.hook.dialog({
						content : tools.status_tip('error',exports.config.lang.E00001)
					});
				}
				try{
					exports.cache.dialog.show(exports.cache.$post_thumb[0]);
				}catch(e){}
				
			}).fail(function(){
				exports.hook.dialog.content({
					content : tools.status_tip('error',exports.config.lang.E00001)
				});
			});
		});
	};
	exports.hook = {
		dialog : function(args){
			args.quickClose = true;
			var set_content = function(){
				if(args.id){
					dialog.get(args.id).content(args.content).show(exports.cache.$post_thumb[0]);
				}else{
					exports.cache.dialog.content(args.content).show(exports.cache.$post_thumb[0]);
				}
			},
			retry_set = function(){
				exports.cache.dialog = dialog(args).show(exports.cache.$post_thumb[0]);
			};
			try{
				set_content();
			}catch(e){
				retry_set();
			}
		}
	};

});