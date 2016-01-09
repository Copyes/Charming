$(document).ready(function(){
	var Main ={
		imgData : {"data":[{"src":"bgimage.png"},{"src":"big.jpg"},{"src":"Chrysanthemum.jpg"},{"src":"bgimage.png"},{"src":"big.jpg"}]},
		imgLocaltion :function(){
			var oBoxs = $('.box');
			//计算一排最多可以放置多少个图片
			var boxWidth = oBoxs.eq(0).width();
			var nums = Math.floor($('.container').width()/boxWidth);
			var boxArr = [];
			//遍历照片，存放照片的高度；
			oBoxs.each(function(index,value){
				var boxHeight = $(this).height();
				
				if (index < nums) {
					boxArr[index] = boxHeight;
				}else{
					//寻找最低高度的盒子
					var minBoxHeight = Math.min.apply(null,boxArr);
					var minBoxIndex = $.inArray(minBoxHeight,boxArr);
					$(value).css({
						'position':'absolute',
						'top':minBoxHeight,
						'left':oBoxs.eq(minBoxIndex).position().left
					});
					boxArr[minBoxIndex] += oBoxs.eq(index).height(); 
				}
			});
		},
		scrollSide : function(){
			var oBoxs = $('.box');
			//最后一张图片的高度
			var lastBoxHeight = oBoxs.last().get(0).offsetTop + Math.floor(oBoxs.last().height()/2);
			console.log(lastBoxHeight);
			var windowHeight = $(window).height();//浏览器可是区域的高度
			var scrollHight = $(window).scrollTop();//滚动条的高度

			return (lastBoxHeight < windowHeight+scrollHight)?true:false;
		}
	};
	Main.imgLocaltion();
	
	window.onscroll = function(){
		if(Main.scrollSide()){
			$.each(Main.imgData.data,function(index,value){
				var box = $("<div>").addClass('box').appendTo($('.container'));
				var content = $("<div>").addClass('content').appendTo(box);
				$("<img>").attr('src',"./images/"+ $(value).attr('src')).appendTo(content);
			});
			Main.imgLocaltion();
		}
	}
});