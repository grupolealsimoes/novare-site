/* =========================================================
   NOVARE CONTABILIDADE — scripts da landing page
   1. Utilidades   2. Navbar   3. Menu mobile   4. Partículas
   5. Contadores   6. Abas     7. FAQ           8. Formulário
   9. Animações (GSAP + AOS)
   ========================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- 2. NAVBAR: encolhe ao rolar ---------- */
  var navbar = $("#navbar");
  var navLogo = $("#navLogo");
  function onScroll() {
    var small = window.scrollY > 40;
    if (!navbar) return;
    navbar.classList.toggle("!py-1.5", small);
    navbar.classList.toggle("shadow-lift", small);
    if (navLogo) navLogo.classList.toggle("!h-8", small);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 3. MENU MOBILE ---------- */
  var menuBtn = $("#menuBtn"), mobileMenu = $("#mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("hidden") === false;
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    $$("a", mobileMenu).forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 4. PARTÍCULAS DO HERO ---------- */
  var pc = $("#particles");
  if (pc && !reduce) {
    for (var i = 0; i < 18; i++) {
      var d = document.createElement("span");
      var size = 3 + Math.random() * 7;
      d.className = "particle";
      d.style.width = d.style.height = size + "px";
      d.style.left = Math.random() * 100 + "%";
      d.style.top = 20 + Math.random() * 75 + "%";
      d.style.animationDuration = (7 + Math.random() * 9).toFixed(1) + "s";
      d.style.animationDelay = (Math.random() * 8).toFixed(1) + "s";
      pc.appendChild(d);
    }
  }

  /* ---------- 5. CONTADORES ---------- */
  function formatValue(el, val) {
    if (el.dataset.decimal) return (val / 10).toFixed(1).replace(".", ",");
    if (el.dataset.format === "thousand") return Math.round(val).toLocaleString("pt-BR");
    return Math.round(val).toString();
  }
  function runCounter(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    var to = parseFloat(el.dataset.to || "0");
    if (reduce) { el.textContent = formatValue(el, to); return; }
    var dur = 1500, t0 = performance.now();
    (function tick(now) {
      var p = Math.min((now - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = formatValue(el, to * eased);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  var counters = $$(".counter");
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { runCounter(e.target); co.unobserve(e.target); } });
    }, { threshold: .4 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- 6. ABAS "PARA QUEM ATENDEMOS" ---------- */
  var tabs = $$('[role="tab"]');
  var panels = $$(".tab-panel");
  function selectTab(idx) {
    tabs.forEach(function (t, i) { t.setAttribute("aria-selected", String(i === idx)); });
    panels.forEach(function (p, i) {
      var active = i === idx;
      p.classList.toggle("hidden", !active);
      p.classList.toggle("grid", active);
      if (active && !reduce && window.gsap) {
        window.gsap.fromTo(p, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, ease: "power2.out" });
      }
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectTab(i); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var next = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
        tabs[next].focus(); selectTab(next);
      }
    });
  });

  /* ---------- 7. FAQ (acordeão acessível) ---------- */
  $$(".faq-item").forEach(function (item) {
    var btn = $(".faq-btn", item);
    if (!btn) return;
    btn.addEventListener("click", function () {
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- 8. FORMULÁRIO → WHATSAPP ---------- */
  var form = $("#leadForm"), formError = $("#formError");
  var WHATS = "5585996778884";
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var tel = form.telefone.value.trim();
      if (!nome || !tel) {
        if (formError) {
          formError.textContent = "Preencha pelo menos nome e telefone para continuar.";
          formError.classList.remove("hidden");
        }
        (!nome ? form.nome : form.telefone).focus();
        return;
      }
      if (formError) formError.classList.add("hidden");

      var linhas = [
        "Olá! Vim pelo site da Novare.",
        "",
        "Nome: " + nome,
        "Telefone: " + tel
      ];
      if (form.email.value.trim())   linhas.push("E-mail: " + form.email.value.trim());
      if (form.empresa.value.trim()) linhas.push("Empresa: " + form.empresa.value.trim());
      if (form.mensagem.value.trim()) { linhas.push("", form.mensagem.value.trim()); }

      window.open("https://wa.me/" + WHATS + "?text=" + encodeURIComponent(linhas.join("\n")), "_blank", "noopener");
    });
  }

  /* Ano do rodapé */
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  /* ---------- 9. ANIMAÇÕES ---------- */
  window.addEventListener("load", function () {
    // AOS: revelações ao rolar
    if (window.AOS) {
      window.AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 60, disable: reduce });
    }

    if (!window.gsap || reduce) return;
    var gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    // Entrada orquestrada do hero
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from('[data-hero="1"]', { y: 18, opacity: 0, duration: .6 })
      .from('[data-hero="2"]', { y: 26, opacity: 0, duration: .8 }, "-=.35")
      .from('[data-hero="3"]', { y: 20, opacity: 0, duration: .7 }, "-=.55")
      .from('[data-hero="4"]', { y: 18, opacity: 0, duration: .6 }, "-=.5")
      .from('[data-hero="5"]', { y: 14, opacity: 0, duration: .6 }, "-=.45");

    // Parallax discreto nas brumas do hero
    if (window.ScrollTrigger) {
      gsap.to("#hero .aura", {
        y: -46, ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: .8 }
      });
    }
  });
})();
