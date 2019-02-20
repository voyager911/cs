/*window.onload = function(){
    var list = document.getElementById("list");
    var pre = document.getElementById("pre");
    var next = document.getElementById("next");

    function animate(offset){
        //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
        //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';
        if(newLeft<-3000){
            list.style.left = -600 + 'px';
        }
        if(newLeft>-600){
            list.style.left = -3000 + 'px';
        }
    }

    pre.onclick = function(){
        animate(600);
    };
    next.onclick = function(){
        animate(-600);
    };
    var timer;
    function play(){
        timer = setInterval(function(){
            pre.onclick()
        },1500)
    }
    play();
    var container =document.getElementById('container');
    function stop(){
        clearInterval(timer);
    }
    container.onmouseover=stop;
    container.onmouseout=play;

}
*/
window.onload=function(){
        var wrap=document.getElementById('wrap'),
            pic=document.getElementById('pic'),
            list=document.getElementById('list').getElementsByTagName('li'),
            index=0,
            timer=null;

        // 定义并调用自动播放函数
        function auto(){
            timer=setInterval(function(){
                index++;
                if(index>=list.length){
                    index=0;
                }
                change(index);
            },1000);
        }
        auto();
        // 定义图片切换函数
        function change(curIndex){
            pic.style.marginTop=-170*curIndex+"px";
            for(var j=0;j<list.length;j++){
                list[j].className="";
            }
            list[curIndex].className="on";
            index=curIndex;
        }

        // 鼠标划过整个容器时停止自动播放
        wrap.onmouseover=function(){
            clearInterval(timer);
        };

        // 鼠标离开整个容器时继续播放至下一张
        wrap.onmouseout=auto;

        // 遍历所有数字导航实现划过切换至对应的图片
        for(var i=0;i<list.length;i++){
            list[i].id=i;
            list[i].onmouseover=function(){
                change(this.id);
            }
        }
    }
    var map = new AMap.Map('container',{
        zoom: 10,
        center: [116.39,39.9]
    });
