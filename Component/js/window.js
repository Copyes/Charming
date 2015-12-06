define(['jquery'],function($){
	
	function Window(){
		this.config = {
			width:500,
			height:300,
			title:'系统消息',
			content:'',
			handler:null
		}
	}
	
	Window.prototype = {
		alert : function(config){
			var Config = $.extend(this.config,config);
			var alertBox = $(
				'<div class="window_alertBox">'+
					'<div class="window_header">'+Config.title +'</div>' +
					'<div class="window_content">'+Config.content +'</div>' +
					'<div class="window_footer"><input type="button"  value="确定"/></div>' +
				'</div>'
				);
			alertBox.appendTo('body');
			var btn = alertBox.find(".window_footer input");
			btn.on('click',function(){
				Config.handler && Config.handler();
				alertBox.remove();
			});
			alertBox.css({
				width : Config.width + 'px',
				height: Config.height + 'px',
				left: (Config.x || (window.innerWidth - Config.width)/2) + 'px',
				top : (Config.y || (window.innerHeight - Config.height)/2) +'px'
			});
		},
		confirm : function(){
			
		},
		prompt : function(){
			
		}
	}
	
	return {
		Window : Window
	}
});