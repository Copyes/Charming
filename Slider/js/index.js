//数据源
var data = [{img:'1',h2:'精彩人生',h3:'美丽中国'},
			{img:'2',h2:'绝妙人生',h3:'魅力中国'},
			{img:'3',h2:'Charming',h3:'就是我'},
			{img:'4',h2:'Beautiful',h3:'美丽人生'},
			{img:'5',h2:'Pretty',h3:'相当可爱'},
			{img:'6',h2:'Cute',h3:'小可爱'},
			{img:'7',h2:'Fantistic',h3:'棒极了'}];
//1、获取元素
var get = function(name){
	if(name.substr(0,1) == '.'){
		return document.getElementsByClassName(name.substr(1));
	}
	return document.getElementById(name);
}
function addSliders(){
	//2、获取模板
	var main_html = get("template-main").innerHTML.replace(/(^\s*)|(\s*$)/g, "").toString();
	var ctrl_html = get("template-ctrl").innerHTML.replace(/(^\s*)|(\s*$)/g, "").toString();
	//3、循环生成
	var main_html_arr = [];
	var ctrl_html_arr = [];
	for(var item in data){
		console.log("'"+data[item].img+"'");
		var main_temp = main_html.replace(/{{index}}/g,data[item].img)
								 .replace(/{{h2}}/g,data[item].h2)
								 .replace(/{{h3}}/g,data[item].h3);
		var ctrl_temp = ctrl_html.replace(/{{index}}/g,data[item].img);
		main_html_arr.push(main_temp);
		ctrl_html_arr.push(ctrl_temp);
	}
	//4将模板渲染到页面
	get("template-main").innerHTML = main_html_arr.join(' ');
	get("template-ctrl").innerHTML = ctrl_html_arr.join(' ');
	
	
	//生成background模板
	get("template-main").innerHTML += main_html.replace(/{{index}}/g,'{{index}}')
								 	.replace(/{{h2}}/g,data[item].h2)
								 	.replace(/{{h3}}/g,data[item].h3);
	get('main_{{index}}').id = 'main_background';
								 	
}
//幻灯片切换函数
function switchSlider(n){
	var main = get('main_' + n);
	var ctrl = get('ctrl_' + n);
	
	var clearMain = get('.main-i');
	var clearCtrl = get('.ctrl-i');
	for (var i = 0; i < clearCtrl.length; i++) {
		clearMain[i].className = clearMain[i].className.replace(' main-active','');	
		clearCtrl[i].className = clearCtrl[i].className.replace(' active','');
	}
	
	main.className += ' main-active';
	ctrl.className += ' active';
	//延时执行背景图为上一张图片
	setTimeout(function(){
			get('main_background').innerHTML = main.innerHTML;
	},1000);

}

function movePictures(){
	var pictures = get(".picture");
	for (var i = 0; i < pictures.length; i++) {
		pictures[i].style.marginTop = (-1*pictures[i].clientHeight/2)+ 'px';
	}
}

window.onload = function (){
	addSliders();
	switchSlider(1);
	setTimeout(function(){
		movePictures();
	},100);
}












