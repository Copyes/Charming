define(['jquery'],function($){
	function ScrollTo(opts){
		this.opts = $.extend({},ScrollTo.DEFAULT,opts);
		this.$elem = $('html,body');
	}
	ScrollTo.prototype.move = function(){
		var opts = this.opts;
		this.$elem.animate({
			scrollTop:opts.dest	
		},opts.speed);
	}
	
	ScrollTo.prototype.go = function(){
		this.$elem.scrollTop(this.opts.dest);
	}
	
	ScrollTo.DEFAULT = {
		dest:0,
		speed:800
	}
	
	return {
		ScrollTo : ScrollTo
	};
})