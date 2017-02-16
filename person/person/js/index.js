$(function(){
	var  imgbox=$(".imgbox")[0];
	var  imgs=$("li",imgbox);
	var  now=0;
	var  next=0;
	var  height=imgs[0].offsetHeight;
	var  flag=true;
	var  lis=$("li",$(".btn")[0]);
	mousewheel(document,function(){
		if(flag){
			flag=false;
			next=now-1;
	         if(next<0){
	         	flag=true;
	         	 return; 
	         	}
	         imgs[next].style.top="-100%";
	         animate(imgs[now],{top:height},600)
	         animate(imgs[next],{top:0},600,function(){
	         	flag=true;
	         })
	         lis[now].className="";
	         lis[next].className="fir";
	         now=next;
	       }
	},function(){
			if(flag){
				flag=false;
				next=now+1;
		        if(next>=imgs.length){
		         	flag=true;
		         	return;
		           }
	         imgs[next].style.top="100%";
	         animate(imgs[now],{top:-height},600)
	         animate(imgs[next],{top:0},600,function(){
	         	flag=true;
	         })
	         lis[now].className="";
	         lis[next].className="fir"; 
	         now=next;
	      }
	      for (var i = 0; i < lis.length; i++) {
	      	(function(a){
                lis[a].onclick=function(){
                	if(flag){
                		flag=false;
                	
	                	if(a>now){
	                		imgs[a].style.top="100%";
	                		animate(imgs[now],{top:-height},600,function(){
	                			flag=true;
                		})
                		animate(imgs[a],{top:0},600)
                		lis[now].className="";
                		lis[a].className="fir";
                		now=a;
                	}
                	if(a<now){
                		imgs[a].style.top="-100%";
                		animate(imgs[now],{top:height},600,function(){
                			flag=true;
                		})
                		animate(imgs[a],{top:0},600)
                		lis[now].className="";
                		lis[a].className="fir";
                		now=a;
                	}
                  }
               }
	      	})(i);
	      };
	  })
    $(document).on('mousedown',false)
    //nav点击下拉效果
    $('.nav-bar button').on('click',function(){
        $('.nav-bar').toggleClass('active')
        $('.nav ul').slideToggle();
    })
    var nav=$('.header_wrapper');
    var h=nav.offset().top;
    $(window).on('scroll',function(){
        var stop=$(window).scrollTop();
        if(stop>=h){
            nav.addClass('active')
        }else{
            nav.removeClass('active')
        }
    })
//    楼层跳转
    var arr=[];
    var floor=$('.floor');
    var link=$('.nav ul li')
    $(window).on('resize',function(){
        $(window).scroll();
        console.log($(window).width())
    })

    $(window).on('scroll',function(){
        arr=[]
        for(var i=0;i<floor.length;i++){
            arr.push(floor.eq(i).offset().top)
        }
        var stop=$(window).scrollTop();
        $(arr).each(function(i,v){
            if(stop>=v-155){
             link.find('a').css({background:""})
             link.eq(i).find('a').css({ background: 'rgb(57, 208, 211)'})
             floor.eq(i).addClass('active')
            }

        });

    })
    link.on('click',function(){
        $('body').animate({scrollTop:arr[$(this).index()]},1000)
    })
    $(window).scroll();

//    个人介绍
    $('.btn-open a').on('click',function(){
     $('.contain-box').toggleClass('active')
    })
    //技能
    function num(i,podeg){
        var canvas1 =$('.canvas').get(i);
        var ctx = canvas1.getContext("2d");
        var W = canvas1.width;
        var H = canvas1.height;
        var deg=0;
        var loop;
        var text,text_w;
        function init(){
            ctx.clearRect(0,0,W,H);
            ctx.beginPath();
            ctx.strokeStyle="transparent";
            ctx.lineWidth=10;
            ctx.arc(W/2,H/2,65,0,Math.PI*2,false);
            ctx.stroke();

            var r = deg*Math.PI/180;
            ctx.beginPath();
            ctx.strokeStyle = " #fff";
            ctx.lineWidth=10;
            ctx.arc(W/2,H/2,65,0-90*Math.PI/180,r-90*Math.PI/180,false);
            ctx.stroke();

            ctx.fillStyle=" #fff";
            ctx.font="25px  'Raleway'";
            text = Math.floor(deg/360*100)+"%";
            text_w = ctx.measureText(text).width;
            ctx.fillText(text,W/2 - text_w/2,H/2+15);
        }
        function draw(new_deg){
            loop = setInterval(function(){
                deg++;
                if(deg==new_deg){
                    clearInterval(loop)
                }
                init();
            },1);
        }
        draw(podeg);
    }
    num(0,342);
    num(1,330);
    num(2,324);
    num(3,324);
    num(4,324);
    num(5,324);
    num(6,288);
    num(7,324);

    // 泡泡
    // $(window).on('resize',function(){
    //     width = window.innerWidth;
    //     height = window.innerHeight;
    // })
    (function() {
        var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;
        // Main
        initHeader();
        addListeners();
        function initHeader() {
            target = {x: 0, y: height};
            canvas = document.getElementById('demo-canvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');
            // create particles
            circles = [];
            for(var x = 0; x < width*0.5; x++) {
                var c = new Circle();
                circles.push(c);
            }
            animate();
        }
        // Event handling
        function addListeners() {
            window.addEventListener('scroll', scrollCheck);
            window.addEventListener('resize', resize);
        }

        function scrollCheck() {
            if(document.body.scrollTop > height) animateHeader = false;
            else animateHeader = true;
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            largeHeader.style.height = height+'px';
            canvas.width = width;
            canvas.height = height;
        }

        function animate() {
            if(animateHeader) {
                ctx.clearRect(0,0,width,height);
                for(var i in circles) {
                    circles[i].draw();
                }
            }
            requestAnimationFrame(animate);
        }

        // Canvas manipulation
        function Circle() {
            var _this = this;

            // constructor
            (function() {
                _this.pos = {};
                init();
            })();

            function init() {
                _this.pos.x = Math.random()*width;
                _this.pos.y = height+Math.random()*100;
                _this.alpha = 0.1+Math.random()*0.3;
                _this.scale = 0.1+Math.random()*0.3;
                _this.velocity = Math.random();
            }

            this.draw = function() {
                if(_this.alpha <= 0) {
                    init();
                }
                _this.pos.y -= _this.velocity;
                _this.alpha -= 0.0005;
                ctx.beginPath();
                ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
                ctx.fill();
            };
        }

    })();
})