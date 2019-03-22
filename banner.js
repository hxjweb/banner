~function () {
    var jsonDate = null,
        inner = document.getElementById('inner'),
        banner = document.getElementById('banner'),
        imgList = inner.getElementsByTagName('img'),
        bannerTip = document.getElementById('bannerTip'),
        liTip = bannerTip.getElementsByTagName('li'),
        left = document.getElementById('left'),
        right= document.getElementById('right'),
        count = 0;
    //发送请求
    ~function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get','banner.txt',false);
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
                jsonDate = xhr.responseText;
                jsonDate = 'JSON' in window ? JSON.parse(jsonDate) : eval("("+jsonDate+")");
            }
        }
        xhr.send(null);
    }();
    //拼接字符串
    ~function () {
        if(jsonDate){
            var str = '',
                li = '';
            for(var i=0,len=jsonDate.length;i<len;i++){
                str += '<div><img src="" trueImg="'+jsonDate[i]['image']+'"/></div>';
                i === 0 ? li += '<li class="bg"></li>' : li += '<li></li>';
            }
            str += '<div><img src="" trueImg="'+jsonDate[0]['image']+'"/></div>'
        }
        count = jsonDate.length+1;
        inner.innerHTML = str;
        bannerTip.innerHTML = li;
        inner.style['width'] = count*800+'px';

    }();
    //图片懒加载
    function lazy() {
        for(var i=0,len=imgList.length;i<len;i++){
            ~function (i) {
                var img = new Image;
                img.src = imgList[i].getAttribute('trueImg');
                img.onload = function () {
                    imgList[i].src = this.src;
                    imgList[i].style.display = 'block';
                    animationMove(imgList[i],{
                        'opacity':1
                    },1000)
                    img = null;
                }
            }(i)
        }
    }
    window.setTimeout(lazy,300);
    //实现自动轮播
    var step = 0,interval = 2000;
    var autoTimer = window.setInterval(autoMoveRight,interval);
    //向右
    function autoMoveRight() {
        if(step === (count-1)){
            step = 0;
            setCss(inner,'left',0);
        }
        step++;
        animationMove(inner,{
            'left':-step*800
        },500)
        changeTip();
    }
    //向左
    function autoMoveLeft() {
        if(step === 0){
            step = count-1;
            setCss(inner,'left',-step*800);
        }
        step--;
        animationMove(inner,{
            'left':-step*800
        },500)
        changeTip();
    }
    //焦点对齐
    function changeTip() {
        var tempStep = step === count-1 ? 0 : step;
        for(var i=0,len=liTip.length;i<len;i++){
            if(i === tempStep){
                addClass(liTip[i],'bg');
            }else{
                removeClass(liTip[i],'bg')
            }
        }
    }
    //鼠标停留时停止轮播，否则开始
    banner.onmouseover = function () {
        window.clearInterval(autoTimer);
        left.style.display = right.style.display = 'block';
    }
    banner.onmouseout = function () {
        autoTimer = window.setInterval(autoMoveRight,interval);
        left.style.display = right.style.display = 'none';
    }
    //点击焦点实现轮播图切换
    ~function () {
        for(var i=0,len=liTip.length;i<len;i++){
            var curLi = liTip[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                changeTip();
                animationMove(inner,{
                    'left':-step*800
                },500);
            }
        }
    }()
    //点击左右箭头切换
    ~function () {
       right.onclick = function () {
           autoMoveRight();
       }
       left.onclick = function () {
            autoMoveLeft();
       }
    }()
}()