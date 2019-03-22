/*
获取元素的某一个样式
如果可以去单位则去单位
处理了opacity兼容
 */
function getCss(curEle,attr) {
    var val = null,
        reg = null;
    if(window.getComputedStyle){
        val =  window.getComputedStyle(curEle,null)[attr];
    }else{
        if(attr === 'opacity'){
            val = curEle.currentStyle['filter'];
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
            val = reg.test(val) ? reg.exec(val)[1]/100 : 1;
        }else{
            val =  curEle.currentStyle[attr];
        }
    }
    reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)$/i;
    return reg.test(val) ? parseFloat(val) : val;
}
/*
给元素设置样式
如果value加单位了则无需处理，但是如果没加单位则需要加上单位px
 */
function setCss(curEle,attr,value) {
    if(attr === 'opacity'){
        curEle.style['opacity'] = value;
        curEle.style['filter'] = 'alpha(opacity="+value*100+")';
        return;
    }
    if(attr === 'float'){
        curEle.style['cssFloat'] = value;
        curEle.style['styleFloat'] = value;
        return;
    }
    var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Right|Bottom|Left)?))$/;
    if(reg.test(attr)){
        if(!isNaN(value)){
            value += 'px';
        }
    }
    curEle.style[attr] = value;
}
function setCssGroup(curEle,options) {
    options = options || 0;
    if(options.toString() !== '[object Object]'){
        return;
    }
    for(var key in options){
        if(options.hasOwnProperty(key)){
            setCss(curEle,key,options[key]);
        }
    }
}
/*
实现样式的获取，设置和批量设置
 */
function css(curEle) {
    var argTwo = arguments[1];
    if(typeof argTwo === 'string'){
        var argThree = arguments[2];
        //第二个参数使字符串且没有第三个参数，则是获取样式
        if(!argThree){
            return getCss.apply(this,arguments);
            //return getCss(curEle,argTwo);
        }
        //如果由第三个参数则是设置样式
        setCss.apply(this,arguments);
    }
    argTwo = argTwo || 0;
    if(argTwo.toString() === '[object Object]'){
        setCssGroup.apply(this,arguments);
    }
}
/*
判断curEle的类是否包含className
 */
function hasClass(curEle,className) {
    //正则：开头可以没有空格或多个空格，结尾可以没有或者有多个空格，中间是className
    var reg = new RegExp("(^| +)"+className+"( +|$)");
    return reg.test(curEle.className);
}
/*
实现：给curEle如果类中没有className则添加，如果有则不添加
 */
function addClass(curEle,className) {
    var ary = [];
    ary = className.split(/ +/g);
    for(var i=0,len=ary.length;i<len;i++){
        if(!hasClass(curEle,ary[i])){
            curEle.className += ' '+ary[i];
        }
    }
}
function removeClass(curEle,className) {
    var ary = [];
    ary = className.split(/ +/g);
    for(var i=0,len=ary.length;i<len;i++){
        if(hasClass(curEle,ary[i])){
            var reg = new RegExp("(^| +)"+ary[i]+"( +|$)","g");
            curEle.className = curEle.className.replace(reg," ");
        }
    }
}
/*
获取元素的所有哥哥元素节点
原DOM库中没有，自己写一个方法
解决办法：一直往前找哥哥节点，如果是元素节点则放入数组，知道找到所有的哥哥节点
 */
function prevAll(curEle) {
    var pre = curEle.previousSibling;
    var ary = [];
    while (pre){
        if(pre.nodeType === 1){
            ary.unshift(pre);
        }
        pre = pre.previousSibling;
    }
    return ary;
}
/*
有几个哥哥元素节点索引就是几
 */
function index(curEle) {
    return prevAll(curEle).length;
}