import anime from 'animejs/lib/anime.es.js';



export default class Firework {
    constructor(el) {
        this.canvasEL = el;
        this.ctx = this.canvasEL.getContext('2d');

        this.numberOfParticules = 30;
        this.pointerX = 0;
        this.pointerY = 0;
        this.tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
        this.colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];


        this.animateParticules(
            anime.random(this.centerX - 50, this.centerX + 50),
            anime.random(this.centerY - 50, this.centerY + 50)
        );

        const render = anime({
            duration: Infinity,
            update: () => {
                this.ctx.clearRect(0, 0, this.canvasEL.width, this.canvasEL.height);
            }
        });
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;

        // this.autoClick();
        // this.setCanvasSize();
        // window.addEventListener('resize', this.setCanvasSize, false);



    }
    setCanvasSize = () => {
        
        this.canvasEL.width = window.innerWidth * 2;
        this.canvasEL.height = window.innerHeight * 2;
        this.canvasEL.style.width = window.innerWidth + 'px';
        this.canvasEL.style.height = window.innerHeight + 'px';
        this.canvasEL.getContext('2d').scale(2, 2);
    }
    updateCoords(e) {
        this.pointerX = e.clientX || e.touches[0].clientX;
        this.pointerY = e.clientY || e.touches[0].clientY;
    }
    setParticuleDirection(p) {
        var angle = anime.random(0, 360) * Math.PI / 180;
        var value = anime.random(50, 180);
        var radius = [-1, 1][anime.random(0, 1)] * value;
        return {
            x: p.x + radius * Math.cos(angle),
            y: p.y + radius * Math.sin(angle)
        }
    }
    createParticule(x, y) {
        var p = {};
        p.x = x;
        p.y = y;
        p.color = this.colors[anime.random(0, this.colors.length - 1)];
        p.radius = anime.random(16, 32);
        p.endPos = this.setParticuleDirection(p);
        p.draw = () => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
        }
        return p;
    }
    createCircle(x, y) {
        var p = {};
        p.x = x;
        p.y = y;
        p.color = '#FFF';
        p.radius = 0.1;
        p.alpha = .5;
        p.lineWidth = 6;
        p.draw =  ()=> {
            this.ctx.globalAlpha = p.alpha;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            this.ctx.lineWidth = p.lineWidth;
            this.ctx.strokeStyle = p.color;
            this.ctx.stroke();
            this.ctx.globalAlpha = 1;
        }
        return p;
    }
    renderParticule(anim) {
        for (var i = 0; i < anim.animatables.length; i++) {
            anim.animatables[i].target.draw();
        }
    }

    animateParticules = (x, y) => {
        var circle = this.createCircle(x, y);
        var particules = [];
        for (var i = 0; i < this.numberOfParticules; i++) {
            particules.push(this.createParticule(x, y));
        }
        anime.timeline().add({
            targets: particules,
            x: function (p) { return p.endPos.x; },
            y: function (p) { return p.endPos.y; },
            radius: 0.1,
            duration: anime.random(1200, 1800),
            easing: 'easeOutExpo',
            update: this.renderParticule
        })
            .add({
                targets: circle,
                radius: anime.random(80, 160),
                lineWidth: 0,
                alpha: {
                    value: 0,
                    easing: 'linear',
                    duration: anime.random(600, 800),
                },
                duration: anime.random(1200, 1800),
                easing: 'easeOutExpo',
                update: this.renderParticule,
                offset: 0
            });
    }


    autoClick = () => {
        if (window.human) return;
        this.animateParticules(
            anime.random(this.centerX - 50, this.centerX + 50),
            anime.random(this.centerY - 50, this.centerY + 50)
        );
        anime({ duration: 200 }).finished.then(this.autoClick);
    }

    // this.autoClick();
    // this.setCanvasSize();
    // window.addEventListener('resize', setCanvasSize, false);
}