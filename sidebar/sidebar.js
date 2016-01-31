(function(){

	//菜单按钮区域
	var MenuBar = function(){
		var self  = this;
		this.elem = document.querySelector('#sidebar ul');
		this.state = 'allClosed';
		this.currentOpenedElem = null;
		var forEach = Array.prototype.forEach;
		this.elem.addEventListener('click',function(e){
			e.stopPropagation();
		});
		this.menuList = document.querySelectorAll('#sidebar ul li');
		console.log(this.menuList);
		for (var i = 0; i < this.menuList.length; i++) {
			this.menuList[i].addEventListener('click',function(e){
				var menuContentElem = document.getElementById(e.currentTarget.id + '-content');
				if (self.state === 'allClosed') {
					console.log('打开' + menuContentElem.id);
					menuContentElem.className = 'nav-content';
					menuContentElem.style.top ='0';
					menuContentElem.style.left ='-90px';
					menuContentElem.classList.add('menuContentElem-move-right');
					self.state = 'hasOpened';
					self.currentOpenedElem = menuContentElem;
				}else{
					self.currentOpenedElem.className = 'nav-content';
					self.currentOpenedElem.style.top ='0';
					self.currentOpenedElem.style.left = '10px';
					self.currentOpenedElem.classList.add('menuContentElem-move-left');
					console.log('打开' + menuContentElem.id);
					menuContentElem.className = 'nav-content';
					menuContentElem.style.top ='250px';
					menuContentElem.style.left = '10px';
					menuContentElem.classList.add('menuContentElem-move-up');
					self.currentOpenedElem = menuContentElem;
				}
			});
		}
		//处理打开的内容框
		/*var menuCloseList = document.querySelectorAll('.nav-content > div.nav-con-close');
        forEach.call(menuCloseList, function(navConCloseBar){
            navConCloseBar.addEventListener('click',function(evt) {
                var currentEl = evt.currentTarget.parentNode;
                currentOpenedElem.className = 'nav-content';
                currentOpenedElem.style.top = '0px';
                currentOpenedElem.style.left = '35px';
                currentOpenedElem.classList.add('nc_move_left');
                self.state = 'allClosed';
            });
        });*/
		var menuCloseList = document.querySelectorAll('.nav-content > div.nav-con-close');
		console.log(menuCloseList);
		for (var j = 0; j< menuCloseList.length; j++) {
			menuCloseList[j].addEventListener('click',function(e){
				var menuContent = e.currentTarget.parentNode;
				console.log(menuContent);
				menuContent.className = 'nav-content';
				menuContent.style.top ='0';
				menuContent.style.left ='10px';
				menuContent.classList.add('menuContentElem-move-left');
				self.state = 'allClosed';
			});
		}
		MenuBar.prototype.close =function(){
			this.currentOpenedElem.className = 'nav-content';
			this.currentOpenedElem.style.top ='0';
			this.currentOpenedElem.style.left ='10px';
			this.currentOpenedElem.classList.add('menuContentElem-move-left');
			this.state = 'allClosed';

		}
		/*forEach.call(menuCloseList,function(closeBarItem){
			console.log(closeBarItem);
			closeBarItem.addEventListener('click',function(e){
				var menuContent = e.currentTarget.parentNode;
				console.log(menuContent);
				menuContent.className = 'nav-content';
				menuContent.style.top ='0';
				menuContent.style.left ='10px';
				menuContent.classList.add('menuContentElem-move-left');
				self.state = 'allClosed';
			});
		});*/
	};
	var menuBar = new MenuBar();
	//处理侧边栏的对象
	var SideBar = function(elemId,closeBarId){
		var self = this;
		this.state = 'opened';
		this.elem = document.getElementById(elemId || 'sidebar');
		this.closeElem = document.getElementById(closeBarId || 'close');
		//this.menubar = new MenuBar();
		this.elem.addEventListener('click',function(event){
			if(event.target !== self.elem){
				self.triggerSwitch();
			}
		});
	};
	//关闭侧边栏
	SideBar.prototype.close =function(){
		console.log('close');
		menuBar.close();
		this.elem.style.left = '0';
		this.closeElem.style.left = '0';
		this.state = 'closed';
		this.elem.className = ' sidebar-move-left';
		this.closeElem.className = ' close-move-right';

	};
	//打开侧边栏
	SideBar.prototype.open = function(){
		console.log('open');
		this.state = 'opened';
		this.elem.style.left = -40 +'px';
		this.elem.className = ' sidebar-move-right';
		this.closeElem.style.left = 80 +'px';
		this.closeElem.className = ' close-move-left';

	};
	//侧边栏开关
	SideBar.prototype.triggerSwitch = function(){
		if (this.state === 'opened') {
			this.close();
		}else if(this.state === 'closed'){
			this.open();
		}
	};

	var sidebar = new SideBar();
})();














