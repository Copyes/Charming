/**
 * Created by fanchao on 16/3/13.
 */
;(function(){
    var play = document.getElementById('play'),
        page1 = document.getElementById('page1'),
        page2 = document.getElementById('page2'),
        page3 = document.getElementById('page3'),
        audio = document.getElementsByTagName('audio')[0];
    //音乐未完
    play.addEventListener('touchstart',function(){
        if(audio.paused){
            audio.play();
            this.className ='play';
            //this.style.animationPlayState = 'running';
        }else{
            audio.pause();
            this.className = ' ';
            //this.style.animationPlayState = 'paused';
        }
    },false);

    //音乐停止的做法
    audio.addEventListener('ended',function(){
      play.className = ' ';
    });

    page1.addEventListener('touchstart',function(){
        page1.style.display = 'none';
        page2.style.display = 'block';
        page3.style.display = 'block';
        page3.style.top = '100%';
        setTimeout(function(){
            page2.className = 'page fadeOut';
            page3.className = 'page fadeIn';
        },5500);
    },false);
})();