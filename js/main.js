


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
        document.getElementById("responsive-nav").style.background = "#FFF";
    } else {
    	document.getElementById("menu").className = "";
        document.getElementById("responsive-nav").style.background = "transparent";
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

// Scrolling Effects (Parallax, Animations, FadeIn)

 function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
} 

window.addEventListener("scroll", function() {

    // Variables

   var scrolledHeight = window.pageYOffset,
       el = document.getElementById("sabemos"),
       port = document.getElementById("portifolio"),
       spans = document.getElementsByClassName("progress"),
       imgs = document.getElementsByClassName("job-imgs"),
       sections = document.getElementsByClassName("section"),
       pos = el.getBoundingClientRect();
       posport = port.getBoundingClientRect();

    // Progress Bar Animate e Fade In
    if (pos.top <= 500) {
        for(var i = 0; i < spans.length; i++) {
            spans[0].classList.add("html5");
            spans[1].classList.add("css3");
            spans[2].classList.add("js");
            spans[3].classList.add("php");
            spans[i].classList.add("animate");
        };
    }

    if (posport.top <= 500) {
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].style.animationDelay = "0."+i+"s";
            imgs[i].classList.add("animate-img");
        };
    }

    // Parallax Animate

    $$(".parallax").forEach(function(el, index, array) { 
        var limit = el.offsetTop + el.offsetHeight;
        el.style.backgroundPositionY =  (scrolledHeight - el.offsetTop) /1.5 + "px";
    });
}); //Scroll Function

// (function() {
// var movementStrength = 25,
//     height = movementStrength / window.innerHeight,
//     width = movementStrength / window.innerWidth,
//     home = document.getElementById("home");

//     home.onmousemove = function(e) {
//         var pageX = e.pageX - window.innerWidth / 2;
//         var pageY = e.pageY - window.innerHeight / 2;
//         var newvalueX = width * pageX * -1 - 25;
//         var newvalueY = height * pageY * -1 - 50;
//         home.style.backgroundPositionY = newvalueY+"px";
//         home.style.backgroundPositionX = newvalueX+"px";
//     };
// })();