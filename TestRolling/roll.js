/**
 * Created by chao.fan1 on 2016/3/22.
 */
var Roll = {
    element : {},
    list : [],
    hasRoll : false,
    rollContent:0,
    lastNode : null,

    init : function(){
        this.element.content = document.getElementById('content');
        this.list = ['测试数据1','测试数据2','测试数据3'
            ,'测试数据4','测试数据5','测试数据6'];
    },

    startRoll :function(){
        this.rollContent = 3;
        var self = this;
        setInterval(function(){
            self.addItem();
        },1000);
    },
    addItem : function(){
        this.rollContent++;
        if(this.rollContent > this.list.length-1){
            this.rollContent = 0;
        }
        //生成新的一条数据
        var oLi = document.createElement('li');
        oLi.className = 'adding';
        oLi.innerHTML = this.list[this.rollContent];
        //将新产生的数据插如最后后一条后面
        this.element.content.appendChild(oLi,this.element.content.lastChild);

        if(this.hasRoll){
            this.element.content.removeChild(this.element.content.firstChild);
        }

        this.hasRoll = true;

        if(this.lastNode){
            this.lastNode.className = '';
        }

        this.lastNone  = oLi;
    }
};


Roll.init();
Roll.startRoll();
