requirejs.config({
	paths:{
		jquery: "jquery-1.11.3.min"
	}
});
requirejs(['jquery','scrollTo'],function($,scrollTo){
	var scroll = new scrollTo.ScrollTo({
		//dest:500,
		//speed:2000
	});
	
	$('#backTop').on('click',$.proxy(scroll.move,scroll));
	$(window).on('scroll',function(){
		checkPosition($(window).height());
	});
	
	checkPosition($(window).height());
	
	function checkPosition(pos){
		if($(window).scrollTop()>pos){
			$("#backTop").fadeIn();
		}else{
			$("#backTop").fadeOut();
		}
	}
});
