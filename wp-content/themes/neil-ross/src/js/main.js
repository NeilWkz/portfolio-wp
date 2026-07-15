// Vanilla JS DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  function doOnce() {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches === true;
    if (!document.body.classList.contains("brdr-black") && !isReduced) {
      intro();
    }
    if (isReduced) {
      document.body.classList.remove("brdr-black");
    }
    if (document.body.classList.contains("contact-go")) {
      goContact();
    }
  }
  doOnce();

  document.getElementById("who")?.addEventListener("click", function (e) {
    e.preventDefault();
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
      about.classList.add("play");
    }
  });
  // scrolls to the contact form
  function goContact() {
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
      contact.classList.add("play");
    }
  }

  document.getElementById("contact-link")?.addEventListener("click", function (e) {
    e.preventDefault();
    goContact();
  });

  document.getElementById("yes-cookie")?.addEventListener("click", function (e) {
    e.preventDefault();
    document.cookie = "noNeilsIntro=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    document.getElementById("cookies")?.classList.remove("show");
  });
  document.getElementById("no-cookie")?.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("cookies")?.classList.remove("show");
  });

  function intro() {

    // Using Pure JS to determine viewport height for full screen first section
    // because of it's blinding Speed
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName("body")[0];
    const y = w.innerHeight || e.clientHeight || g.clientHeight;
    const u = w.innerWidth || e.clientWidth || g.clientWidth;
    const x = (y - 78) / 2;
    const z = y - 78;
    const b = w.innerWidth || e.clientWidth || g.clientWidth;

    //keeps height of home div same as visitor's monitor height
    document.querySelectorAll('.vp-height').forEach(el => {
      el.style.height = y + 'px';
    });
    document.querySelectorAll('.site-height').forEach(el => {
      el.style.height = z + 'px';
    });

    window.addEventListener('resize', function () {
      const y = window.innerHeight || e.clientHeight || g.clientHeight;
      const z = y - 78;
      document.querySelectorAll('.vp-height').forEach(el => {
        el.style.height = y + 'px';
      });
      document.querySelectorAll('.site-height').forEach(el => {
        el.style.height = z + 'px';
      });
      window.scrollTo(0, 0);
    });

    // Check marquee height
    const hero = document.getElementById('hero');
    const m = hero ? hero.offsetHeight : 0;
    let tw = hero ? hero.offsetWidth : 0;
    // subtract marquee height from viewport to find height of triangle
    const t = y - m;
    // triangle border width should be half height
    tw = tw / 2;

    // set light beam height

    const shapeContainer = document.getElementById('shape-container');
    if (shapeContainer) {
      shapeContainer.style.height = t + 'px';
    }

    // Calculate the triangle points relative to viewbox dimensions
    const quarterW = u / 4;
    const halfW = u / 2;
    const halfH = t / 2;

    const pt1 = quarterW + ",0";
    const pt2 = halfW + quarterW + ",0";
    const pt3 = halfW + "," + t;
    const allPts = pt1 + " " + pt2 + " " + pt3;

    const bmb = document.getElementById('bmb');
    const line = document.getElementById('line');
    const bg = document.getElementById('bg');
    const triangle = document.getElementById('triangle');
    window.scrollTo(0, 0);

    const tl = new TimelineMax();
    tl.set(triangle, { css: { opacity: 0 } });
    tl.to(triangle, 2, { opacity: 1 })
      .fromTo(bmb, 1.75, { y: -150 }, { y: 600, ease: Linear.easeOut }, 0)
      .to(hero, 0, { css: { className: '+=bg' } })
      .to(document.getElementById('container'), 2, { css: { className: '+=dark' } })
      .to(document.body, 0, { css: { className: '+=brdr-black' } })
      .to(document.getElementById('container'), 0, { css: { className: '+=out' } })
      .to(document.getElementById('cookies'), 0, { delay: 3, css: { className: '+=show' } });
  } // intro

  //Fancy label scripts
  document.querySelectorAll('input.floatlabel, textarea.floatlabel').forEach(function (el) {
    el.addEventListener('focus', function () {
      const label = el.parentElement.querySelector('.contact_label');
      if (label) label.classList.add('active');
    });
    el.addEventListener('blur', function () {
      const inputContent = el.value;
      const label = el.parentElement.querySelector('.contact_label');
      if (label) {
        if (inputContent !== '') {
          label.classList.add('has-content');
        } else {
          label.classList.remove('has-content');
        }
        label.classList.remove('active');
      }
    });
  });

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // You need to replace jQuery validate with a vanilla JS validation or use a library
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Simple validation example (customize as needed)
      let valid = true;
      // Add your validation logic here
      if (valid) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', contactForm.action, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            window.location = '/thankyou.html';
          } else {
            alert('Sorry, there was an error while submitting your details. Please try again later');
          }
        };
        xhr.onerror = function () {
          alert('Sorry, there was an error while submitting your details. Please try again later');
        };
        // Serialize form data
        const formData = new FormData(contactForm);
        const params = new URLSearchParams(formData).toString();
        xhr.send(params);
      }
    });
  }

  // Waypoint migration: You need to use the vanilla Waypoints API or IntersectionObserver
  const navMain = document.getElementById('nav-main');
  const navWrap = document.getElementById('nav-wrap');
  if (navMain && navWrap) {
    // Example using IntersectionObserver
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          navWrap.classList.add('nav-up');
        } else {
          navWrap.classList.remove('nav-up');
        }
      });
    }, { threshold: 0 });
    observer.observe(navMain);
  }
});
