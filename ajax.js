~function () {
    var jsonDate = null,
        inner = document.getElementById('inner'),
        imgList = inner.getElementsByTagName('img'),
        bannerTip = document.getElementById('bannerTip');
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
        }
        inner.innerHTML = str;
        bannerTip.innerHTML = li;
        inner.style['width'] = jsonDate.length*800+'px';

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
}()