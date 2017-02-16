function getClass(classname,obj){
      var obj=obj||document;//对obj进行初始化
      var arr=[];
      if(obj.getElementsByClassName){//如果是obj中的类名
         return obj.getElementsByClassName(classname);//则返回到obj中
      }else{//如果不是
         var objs=obj.getElementsByTagName("*");//寻找文档中的所有的标签，通过标签来寻找类名，存储在objs中
         for (var i = 0; i < objs.length; i++) {//这时已经寻找到所有的类名，需要对所寻找到的进行遍历
            if(checkClass(objs[i].className),classname){//                                                                                                                                                                                                                                                            如果遍历时有类名和已经知道的相同，则存储在arr数组中
               arr.push(objs[i]);
            }
         };
         return  arr;//从新来寻找
      }
}
function  checkClass(classname,val){//检查classname中是否有和val相同的类名
      var all=classname.split(" ");//例如   classname ：  box  one   two ， val：two  box中的三个类名之间有空格，就算有相同的名称，无法判定是否是相同的类名，就算去掉空格它也依然能够找到相同的名称，所以可以先判断是否有空格来判断它们不是一体,把classneme中的各个类名和空格存储到all中
      for (var i = 0; i < all.length; i++) {//因为要找到一样的类名  例如  val中的two，所以先遍历一边，挨个寻找
         if(all[i]===val){//判断all中是否有和val相同的
            return true;h                                                                                                  //如果相同则返回true。
         }
      };
      return  false;
}
//获取样式内容兼容函数
//返回值为具体的属性值
//obj 为对象  attr为具体的属性
//return  返回的是具体的属性值
function getStyle(obj,attr){
   if(obj.currentStyle){
      return obj.currentStyle[attr];
   }else{
      return  getComputedStyle(obj,null)[attr];
   }
}
//$对标签和类，id的获取
function $(selector,obj){
   var  obj=obj||document;
   if(typeof selector=="string"){
      var  selector=selector.replace("/^\s*|\s*$/g","");  //判断是否有空格  
      if(selector.charAt(0)=="."){//获取到的标签开头是“。”
         return  getClass(selector.slice(1),obj);//获取到的是除了前面的“。”之外的类名
      }else if(selector.charAt(0)=="#"){
         return  document.getElementById(selector.slice(1));
      }else if(/^[a-zA-Z][a-zA-Z0-6]{0,8}$/.test(selector)){//判断是否是标签，一般标签最多有9位
         return  obj.getElementsByTagName(selector);
      }else if(/^<[a-zA-Z][a-zA-Z0-6]{0,8}>$/.test(selector)){
         return  document.createElement(selector.slice(1,-1))
      }
   }else if(typeof selector=="function"){//判断是否是function函数
      window.onload=function(){//用window.onload来提前加载
         selector();
      }
    }
}
/*****获取节点*********************************************************/

//引入两个参数  “no”只需要元素     “yes”  获取的节点为元素节点和文本节点 
function  getChilds(obj,type){
    var  childs=obj.childNodes;//获取所有的子节点
    var  arr=[];//因为最初的元素节点的内容是集合所以定义数组
    var  type=type||"no";
    for (var i = 0; i < childs.length; i++) {
       if(type=="no"){//如果需要的仅仅是只有元素的时候，只用判断是否是元素节点
         if(childs[i].nodeType==1){
            arr.push(childs[i]);
         }
       }else if(type=="yes"){//如果需要的不仅仅是元素，还需要文本，里面的内容还有空格之类的时候需要把空格替换了
         if(childs[i].nodeType==1||childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,"")){
            arr.push(childs[i])
         }
       }
    };
    return  arr;//返回值与最初的是相近的   所以返回集合的形式
}

/****获取第一个节点****************************************************/

function  getFirst(obj,type){
    var type=type||"no";
    if(type=="no"){
      return  getChilds(obj,"no")[0];
    }else if(type=="yes"){
      return  getChilds(obj,"yes")[0];
    }
}


function  getLast(obj,type){
   var  type=type||"no";
   if(type=="no"){
      return  getChilds(obj,"no")[getChilds(obj,"no").length-1];
   }else if(type=="yes"){
      return  getChilds(obj,"yes")[getChilds(obj,"yes").length-1];
   }
}


function  getNum(obj,type,num){
   var  type=type||"no";
   if(type=="no"){
      return  getChilds(obj,"no")[num-1];
   }else if(type=="yes"){
      return  getChilds(obj,"yes")[num-1];
   }
}




function  getNext(obj,type){
   var  type=type||"no";
   var  next=obj.nextSibling;
   if(next==null){
      return  false;
   }
   if(type=="no"){
      while(next.nodeType==3||next.nodeType==8){
         next=next.nextSibling;
      }
   }else if(type=="yes"){
      while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8){
          next=next.nextSibling;
      }    
   }
   return  next;
}



function  getPrevious(obj,type){
   var  type=type||"no";
   var  pre=obj.previousSibling;
   if(pre==null){
      return  false;
   }
   if(type=="no"){
      while(pre.nodeType==3||pre.nodeType==8){
         pre=pre.previousSibling;
      }
   }else if(type=="yes"){
      while(pre.nodeType==3&&!pre.nodeValue.replace(/^\s*|\s*$/g,"")||pre.nodeType==8){
          pre=pre.previousSibling;
      }    
   }
   return  pre;
}


function  insertBefore(newObj,beforeObj){
   var  parent=beforeObj.parentNode;
   parent.insertBefore(newObj,beforeObj);
}


function  insertAfter(newObj,beforeObj){
  var  next=getNext(beforeObj,"yes");//添加内容到节点的后面   可以找到节点的下一个兄弟节点，因为没有
  var  parent=beforeObj.parentNode;//直接添加到节点的后面   所有通过添加到下一个兄弟节点的前面
  if(next){//通过getNext获取到下一个节点
    parent.insertBefore(newObj,next);
  }else{
    parent.appendChild(newObj);
  }
}


function  addEvent(obj,event,fun){
  if(obj.addEventListener){
    obj.addEventListener(event,funEvent,false);
  }else{//绑定在obj身上的是funEvent；
    obj.attachEvent("on"+event,funEvent);
  }//绑定在obj身上的是funEvent；
  return  funEvent;
  function  funEvent(e){
    //兼容事件对象
    var ev=e||window.event;
    //改变this指针，并且传递事件对象
    fun.call(obj,ev);
  }
}

function  removeEvent(obj,event,fun){
  if(obj.addEventListener){
    obj.removeEventListener(event,fun,false);
    //删除的事件应该是funEvent
    //绑定在obj身上真正的事件对象
  }else{
    obj.detachEvent("on"+event,fun);
  }
}

function   mousewheel(obj,upFun,downFun){
  if(obj.attachEvent){
    obj.attachEvent("onmousewheel",fun)
  }else if(obj.addEventListener){
    obj.addEventListener("mousewheel",fun,false);
    obj.addEventListener("DOMMouseScroll",fun,false);
  }
  function  fun(e){
    var  ev=e||window.event;
    var  num=ev.wheelDelta||ev.detail;
    if(num==120||num==-3){
      upFun.call(obj);
    }
    else if(num==-120||num==3){
      downFun.call(obj);
    }
  }
}



//13.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }



function setCookie(attr,value,time){
    if(time){
      var  newtime=new Date();
      newtime.setTime(newtime.getTime()+time*1000);
      document.cookie=attr+"="+value+';expires='+newtime.toGMTString();
    }else{
      document.cookie=attr+"="+value;
    }
 }


 function  getCookie(attr){
    var cookies=document.cookie;
    var arr=cookies.split("; ");
    for (var i = 0; i < arr.length; i++) {
      var  brr=arr[i].split("=");
      if(brr[0]==attr){
        return  brr[1];
      }
    };
    return  false;
 }



function   delCookie(attr){
      var  newtime=new  Date();
      newtime.setTime(newtime.getTime()-1);
      document.cookie=attr+"=a;expires="+newtime.toGMTString();
      
}