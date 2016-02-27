;(function($){
	var LightBox = function(){
		var self = this;

		this.oMask = $('<div class="mask" id＝"mask">');
		this.openWin = $('<div class="pop" id="pop">');
		
		this.bodyNode = $(document.body);
		//渲染dom节点
		this.renderDom();
		//图片预览区域
		this.picViewArea = this.openWin.find('div.lightbox-img');
		//图片
		this.popImg = this.openWin.find('img.images');
		//图片描述区域
		this.picCaption = this.openWin.find('div.lightbox-word');
		//prev按钮
		this.btnPrev = this.openWin.find('a.prev');
		//next按钮
		this.btnNext = this.openWin.find('a.next');
		//文字标题
		this.wordDesc = this.openWin.find('p.description');
		//index
		this.imgIndex = this.openWin.find('span.index');
		//close
		this.btnClose = this.openWin.find('span.close');



		this.groupName = null;
		//放置同一组数据进去
		this.groupData = [];
		//事件委托的机制来完成
		this.bodyNode.delegate('.js-lightbox,*[data-role=lightbox]', 'click', function(event) {
			var e = event || window.event;
			e.stopPropagation();

			var curGroupName = $(this).attr('data-group');
			//获取当前组名
			if(curGroupName != self.groupName){
				self.groupName = curGroupName;
				//根据组名获取同一组数据的
				self.getGroupData();
			}

			self.initPopwin($(this));
			console.log(222);
		});

	};
	LightBox.prototype = {
		
		initPopwin:function(curObj){
			var self = this,
			sourceSrc = curObj.attr('data-src'),
			curId = curObj.attr('data-id');

			this.showMaskAndOpenwin(sourceSrc,curId);
		},
		showMaskAndOpenwin : function(sourceSrc,curId){
			var self = this;
			this.popImg.hide();
			this.picCaption.hide();

			this.oMask.fadeIn();
			
			var winWidth = $(window).width(),
				winHeight = $(window).height();

			console.log(winHeight);
			this.picViewArea.css({
				width : winWidth/2,
				height : winHeight/2
			});	

			var viewHight = winHeight/2 +10;

			this.openWin.css({
				width : winWidth/2 + 10,
				height : viewHight,
				marginLeft : -(winWidth/2 + 10)/2,
				top: -viewHight
			}).animate({
				top:(winHeight-viewHight)/2

			},function(){
				//加载图片
				self.loadPicSize(sourceSrc);
			});	
		//根据当前点击的元素id获取在当前图片组里面的索引
		

		this.index = this.getIndexOf(curId);
		
		var groupDataLen = this.groupData.length;
		if(groupDataLen>1){
			if(this.index === 0){
				this.btnPrev.addClass('disabled');
				this.btnNext.removeClass('disabled');
			}else if(this.index === groupDataLen-1){
				this.btnPrev.removeClass('disabled');
				this.btnNext.addClass('disabled');
			}else{
				this.btnNext.removeClass('disabled');
				this.btnPrev.removeClass('disabled');
			}
		}
		console.log(this.index);
		this.openWin.fadeIn();

		},

		loadPicSize : function(sourceSrc){
			var self = this;

			this.preLoadImag(sourceSrc,function(){

				self.popImg.attr('src', sourceSrc);

				var picWidth = self.popImg.width(),
				picHeight = self.popImg.height();

				self.changePic(picWidth,picHeight);
			});
		},
		changePic:function(picWidth,picHeight){
			var self = this,
				winHeight = $(window).height(),
				winWidth = $(window).width();

			//如果图片的宽高大于浏览器的宽高
			
			var scale = Math.min(winWidth/(picWidth+10),winHeight/(picHeight+10),10);

			picWidth = picWidth*scale;
			picHeight = picHeight*scale;


			this.picViewArea.animate({
				width:picWidth-10,
				height:picHeight-10
			});

			this.openWin.animate({
				width:picWidth,
				height:picHeight,
				marginLeft:-(picWidth/2),
				top:(winHeight-picHeight)/2
			},function(){
				self.popImg.css({
					width:picWidth-10,
					height:picHeight-10
				}).fadeIn();

				self.picCaption.fadeIn();
			});

			//设置文字描述和索引
			this.wordDesc.text(this.groupData[this.index].caption);
			this.imgIndex.text('当前索引：'+(this.index+1)+' of ' + this.groupData.length);
		},

		preLoadImag:function(sourceSrc,callback){
			var img = new Image();
			if(!!window.ActiveObject){
				img.onreadystatechange = function(){
					if(this.readyState == 'complete'){
						callback();
					}
				}
			}else{
				img.onload = function(){
					callback();
				}
			}
			img.src = sourceSrc;
		},

		getIndexOf : function(curId){

			var index = 0;
			$(this.groupData).each(function(i){
				index = i;

				if(this.id === curId){
					return false;
				}
			});

			return index;
		},


		getGroupData : function(){

			var self = this;

			//根据当前的组名获取页面中所有相同组名的对象
			var groupList = this.bodyNode.find('*[data-group='+this.groupName+']');

			this.groupData.length = 0;
			groupList.each(function() {
				self.groupData.push({
					src:$(this).attr('data-src'),
					id:$(this).attr('data-id'),
					caption:$(this).attr('data-caption'),
				});
			});

			console.log(this.groupData);
		},
		renderDom : function(){
			var strDom = '<div class="lightbox-img">'+
							'<a href="javascript:;" class="btn prev icon-prev"></a>'+
							'<img class="images" src="./images/2-2.jpg" alt=""／>'+
							'<a href="javascript:;" class="btn next icon-next"></a>'+
						'</div>'+
						'<div class="lightbox-word">'+
							'<div class="caption">'+
								'<p class="description">图片标题</p>'+
								'<span class="index">索引</span>'+
							'</div>'+
							'<span class="close"></span>'+
						'</div>';
		
			this.openWin.html(strDom);

			this.bodyNode.append(this.oMask,this.openWin);
		}
	};

	window['LightBox'] = LightBox;


})(jQuery);