define(function(require,exports,module){
	'use strict';
	var tools = require('modules/tools');
	exports.init = function(){
		tools.ready(exports.bind);
	}
	var cache = {};
	exports.bind = function(){
		cache.$slide = document.querySelector('.slidebox-container');
		if(!cache.$slide)
			return;
		cache.$blurs = cache.$slide.querySelectorAll('.area-blur .item');
		cache.$mains = cache.$slide.querySelectorAll('.area-main .item');
		cache.$thumbnails = cache.$slide.querySelectorAll('.area-thumbnail .item');
		
		cache.len = cache.$thumbnails.length;
		cache.current_i = 0;
		
		function event_hover(e){
			var current_i = this.getAttribute('data-i');
			if(cache.current_i == current_i)
				return false;
			cache.current_i = current_i;
			for(var i = 0; i < cache.len; i++){
				//console.log(i);
				cache.$blurs[i].classList.contains('active') && cache.$blurs[i].classList.remove('active');
				
				cache.$mains[i].classList.contains('active') && cache.$mains[i].classList.remove('active');
				
				cache.$thumbnails[i].classList.contains('active') && cache.$thumbnails[i].classList.remove('active');
			}
			this.classList.add('active');
			cache.$blurs[current_i].classList.add('active');
			cache.$mains[current_i].classList.add('active');
		}
		for(var i = 0; i < cache.len; i++){
			cache.$thumbnails[i].setAttribute('data-i',i);
			cache.$thumbnails[i].addEventListener('mouseover', event_hover);
		}
	}
});