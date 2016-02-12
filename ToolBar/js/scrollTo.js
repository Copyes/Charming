define(['jquery'],function($){
	function ScrollTo(opts){
		this.opts = $.extend({},ScrollTo.DEFAULT,opts);
		this.$elem = $('html,body');
	}
	
	ScrollTo.prototype.move = function(){
		var opts = this.opts;
		var dest = this.opts.dest;
		if($(window).scrollTop() != dest){
			if(!this.$elem.is(':animated')){
				this.$elem.animate({
					scrollTop:dest	
				},opts.speed);
			}
		}
	}
	
	ScrollTo.prototype.go = function(){
		var dest = this.opts.dest;
		if($(window).scrollTop() != dest){
			this.$elem.scrollTop(dest);
		}
	}
	
	ScrollTo.DEFAULT = {
		dest:0,
		speed:800
	}
	
	return {
		ScrollTo : ScrollTo
	};
})