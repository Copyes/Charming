require.config({
		paths:{
		jquery : 'jquery-2.1.1.min'
	}
});



require(['jquery','Window'],function($,w){
	$("#a").click(function(){
		new w.Window().alert({
			content:'welcome',
			handler:function(){
			alert('你确定要点？');
		},
			width:300,
			height:150,
			y:50
		});
	});
});