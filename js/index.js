$(function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    const ctxWidth = document.body.clientWidth;
    const ctxHeight = document.body.clientHeight;

    canvas.width = ctxWidth;
    canvas.height = ctxHeight;

    //Ripple animation start
    var canvasRipple = document.getElementById('canvasRipple');
    var ctxR = canvasRipple.getContext('2d');
    canvasRipple.width = ctxWidth;
    canvasRipple.height = ctxHeight;

    var Ra = 250,
        Rb = 358,
        Rc = 435,
        Rd = 513,
        Re = 686,
        Rf = 902,
        opacity = 0.4;

    (function drawFrame(){
        window.requestAnimationFrame(drawFrame,canvas);
        ctxR.clearRect(0,0,ctxWidth,ctxHeight);
        var ripple = new Path2D();
        Ra = Ra>340? 250 : Ra+0.4;
        Rb = Rb>513? 358 : Rb+0.6;
        Rc = Rc>686? 435 : Rc+0.7;
        Rd = Rd>ctxWidth? 513 : Rd+2;
        Re = Re>ctxWidth? 686 : Re+1.5;
        Rf = Rf>ctxWidth? 902 : Rf+1;
        opacity = 0.2;
        ripple.arc(ctxWidth/2,ctxHeight/2,Ra,0,2*Math.PI);
        ripple.moveTo(ctxWidth/2+Rb,ctxHeight/2);
        ripple.arc(ctxWidth/2,ctxHeight/2,Rb,0,2*Math.PI);
        ripple.moveTo(ctxWidth/2+Rc,ctxHeight/2);
        ripple.arc(ctxWidth/2,ctxHeight/2,Rc,0,2*Math.PI);
        ripple.moveTo(ctxWidth/2+Rd,ctxHeight/2);
        ripple.arc(ctxWidth/2,ctxHeight/2,Rd,0,2*Math.PI);
        ripple.moveTo(ctxWidth/2+Re,ctxHeight/2);
        ripple.arc(ctxWidth/2,ctxHeight/2,Re,0,2*Math.PI);
        ripple.moveTo(ctxWidth/2+Rf,ctxHeight/2);
        ripple.arc(ctxWidth/2,ctxHeight/2,Rf,0,2*Math.PI);
        ctxR.strokeStyle = 'rgba(255,255,255,'+ opacity +')';
        ctxR.stroke(ripple);
    })();
    //Ripple animation end

    //draw dot start
    var theta = -90;
    const r = 317;

    ctx.beginPath();
    for(var i=0; i<8; i++){
        ctx.moveTo(ctxWidth/2+r*Math.cos((theta+i*45)/360*2*Math.PI)+7,ctxHeight/2+r*Math.sin((theta+i*45)/360*2*Math.PI));
        ctx.arc(ctxWidth/2+r*Math.cos((theta+i*45)/360*2*Math.PI),ctxHeight/2+r*Math.sin((theta+i*45)/360*2*Math.PI),7,0,2*Math.PI);
    }

    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.closePath();
    ctx.save();

    ctx.beginPath();
    for(var i=0; i<8; i++){
        ctx.moveTo(ctxWidth/2+r*Math.cos((theta+i*45)/360*2*Math.PI)+10,ctxHeight/2+r*Math.sin((theta+i*45)/360*2*Math.PI));
        ctx.arc(ctxWidth/2+r*Math.cos((theta+i*45)/360*2*Math.PI),ctxHeight/2+r*Math.sin((theta+i*45)/360*2*Math.PI),10,0,2*Math.PI);
    }

    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fill();
    ctx.closePath();
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(ctxWidth/2-47,ctxHeight/2+108);
    ctx.lineTo(ctxWidth/2+47,ctxHeight/2+108);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.save();
    //draw dot end

    $('.img-box').addClass('active');//background img animation

    //skip animation function
    var skipAnimate = function(timeOut) {
        $('.guide-section').animate({opacity:"0"},timeOut,function () {
            $(this).remove()
        })
    };

    //year animation start
    var yearArr = ['1941','1948','1956','1960','1980','1990','2005','2018'];
    var setYear = function(counter) {
        var target = $('#year').children();
        for(var i=0; i<4; i++){
            if (yearArr[counter]){
                if(yearArr[counter-1][i] != yearArr[counter][i]){
                    $(target[i]).animate({marginTop:"+=-152px"},1992)
                }
            }
        }
    };
    var counter = 1;
    var yearAnimation = setInterval(function () {
        if (counter == 8){
            clearInterval(yearAnimation);
            skipAnimate(2500)
        } else {
            setYear(counter);
            counter++;
        }
    },2500);
    //year animation end

    //skip guide page
    $('.guide-skip').on('click',function (e) {
        if(e.target.className.indexOf('clickable') > -1){
            skipAnimate(1992)
        }
    })
});
