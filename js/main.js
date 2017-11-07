//  Typing Text

var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 100 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }

        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

// Fixed Navbar

window.onscroll = function() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    	document.getElementById("menu").className = "fixed-navbar";
    } else {
    	document.getElementById("menu").className = "";
    }
};

// Smooth Scroll

(function() {

     'use strict';


    if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

        // Função para animar o scroll
        var smoothScroll = function (anchor, duration) {

            // Calcular distância e velocidade do scroll
            var startLocation = window.pageYOffset;
            var endLocation = anchor.offsetTop;
            var distance = endLocation - startLocation;
            var increments = distance/(duration/16);
            var stopAnimation;

            // Scroll por incremento e verifica se é pra parar 
            var animateScroll = function () {
                window.scrollBy(0, increments);
                stopAnimation();
            };

            // Scrolling down
            if ( increments >= 0 ) {
                // Parar animação âncora
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
                        clearInterval(runAnimation);
                    }
                };
            }
            // Scrolling Up
            else {
                // Parar animação âncora
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if ( travelled <= (endLocation || 0) ) {
                        clearInterval(runAnimation);
                    }
                };
            }

            var runAnimation = setInterval(animateScroll, 16);
       
        };

        // Links com scroll
        var scrollToggle = document.querySelectorAll('.scroll');

        // Pra cada link com scroll
        [].forEach.call(scrollToggle, function (toggle) {

            // Quando um link com scroll é clicado
            toggle.addEventListener('click', function(e) {

                e.preventDefault();

                // Pega âncora calcula distância
                var dataID = toggle.getAttribute('href');
                var dataTarget = document.querySelector(dataID);
                var dataSpeed = toggle.getAttribute('data-speed');

                // Se ancora existe
                if (dataTarget) {
                    smoothScroll(dataTarget, dataSpeed || 500);
                }

            }, false);

        });

    }

 })();

 // Slider

 // (function(){
 // 	var btnLeft = document.getElementById("left"),
 // 		btnRight = document.getElementById("right"),
 // 		item1 = document.getElementById("item-1"),
 // 		item2 = document.getElementById("item-2");

 // 	btnRight.addEventListener("click", function(){
 // 		item1.style.right = "100%";
 // 		item2.style.left = "0";
 // 	});

 // 	btnLeft.addEventListener("click", function(){
 // 		item1.style.right = "0";
 // 		item2.style.left = "105%";
 // 	});
 // }());

 function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
} 

window.addEventListener("scroll", function() {
   var scrolledHeight = window.pageYOffset;
  $$(".parallax").forEach(function(el,index,array) { 
    var limit = el.offsetTop + el.offsetHeight;
  if(scrolledHeight > el.offsetTop && scrolledHeight <= limit) {
    el.style.backgroundPositionY =  (scrolledHeight - el.offsetTop) / 1.5+ "px";
 
    } else {
     el.style.backgroundPositionY =  "0";
    }
     });
});

var el = document.getElementById("site");

function fadeIn(el) {
  el.style.opacity = 0;

  
  var tick = function() {
    el.style.opacity = +el.style.opacity + 0.01;
    

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
    }
  };

  tick();
}

fadeIn(el);