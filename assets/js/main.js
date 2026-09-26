// AjuNet — menu mobile + animação de sinal do hero
(function () {
  'use strict';

  // Menu mobile (hambúrguer)
  var btn = document.getElementById('menuToggle');
  var panel = document.getElementById('mobilePanel');
  if (btn && panel) {
    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.classList.toggle('open', open);
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    };
    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Animação de sinal (ondas + pulso) no hero — puramente decorativa
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canvas = document.getElementById('signal');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  function resize() {
    var r = canvas.getBoundingClientRect();
    canvas.width = r.width * devicePixelRatio;
    canvas.height = r.height * devicePixelRatio;
  }
  resize();
  window.addEventListener('resize', resize);

  var t = 0;
  function draw() {
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    var grad = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.42, w * 0.75);
    grad.addColorStop(0, 'rgba(2,176,227,0.22)');
    grad.addColorStop(1, 'rgba(1,52,81,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    var rings = 5;
    for (var i = 0; i < rings; i++) {
      ctx.beginPath();
      var amp = h * 0.03;
      var freq = 0.012 + i * 0.001;
      var baseY = h * (0.3 + i * 0.09);
      for (var x = 0; x <= w; x += 6) {
        var y = baseY + Math.sin(x * freq + t + i * 0.6) * amp * (1 + i * 0.15);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.14 + i * 0.05) + ')';
      ctx.lineWidth = 2 * devicePixelRatio;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.42, (h * 0.06) + Math.sin(t * 1.4) * h * 0.008, 0, Math.PI * 2);
    ctx.strokeStyle = '#00CCFF';
    ctx.lineWidth = 2.5 * devicePixelRatio;
    ctx.stroke();

    if (!reduceMotion) { t += 0.018; requestAnimationFrame(draw); }
  }
  draw();
})();
