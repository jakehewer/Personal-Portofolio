/* ==========================================================================
   main.js

   Four small jobs. That is genuinely all a portfolio needs:

     1. Toggle the mobile menu
     2. Add a border to the header once you scroll
     3. Highlight the nav link for the section you are looking at
     4. Fill in the copyright year

   Written in plain modern JavaScript — no libraries, no build step.
   'use strict' opts into stricter parsing and catches silent mistakes like
   assigning to an undeclared variable.
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   1. MOBILE MENU
   The button already carries aria-expanded="false" in the HTML. We flip that
   attribute and let CSS react to it, rather than tracking state in JS.
   One source of truth, and assistive technology gets told what happened.
   -------------------------------------------------------------------------- */

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#primary-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    // getAttribute returns a string, so compare against the string 'true'.
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });

  // Tapping a link should close the menu — otherwise it covers the section
  // you just jumped to.
  nav.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
  });

  // Escape closes it and returns focus to the button, which is what a keyboard
  // user expects from anything that opens.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      navToggle.focus();
    }
  });
}


/* --------------------------------------------------------------------------
   2. HEADER BORDER ON SCROLL

   A naive scroll listener fires dozens of times per second and is a classic
   source of jank. IntersectionObserver instead asks the browser to tell us
   when a sentinel element crosses the viewport edge — the work happens off
   the main thread and costs essentially nothing.

   Here the sentinel is the hero section: while any of it is visible we are
   near the top of the page.
   -------------------------------------------------------------------------- */

const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');

if (header && hero && 'IntersectionObserver' in window) {
  const headerObserver = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('is-scrolled', !entry.isIntersecting);
    },
    // rootMargin shrinks the observed area by the header's height, so the
    // border appears exactly when content slides under the header.
    { rootMargin: '-64px 0px 0px 0px', threshold: 0 }
  );
  headerObserver.observe(hero);
}


/* --------------------------------------------------------------------------
   3. ACTIVE SECTION IN THE NAV

   Same technique. We watch every section that has an id, and whenever one
   occupies the middle band of the screen we mark its nav link active.
   -------------------------------------------------------------------------- */

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-list a');

if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    // Top and bottom margins pulled in to a 40%-tall band across the middle
    // of the viewport, so only one section qualifies at a time.
    { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}


/* --------------------------------------------------------------------------
   4. COPYRIGHT YEAR
   The HTML has <span data-year></span>. Data attributes are the tidy way to
   mark an element as "JS should do something here" without abusing classes,
   which belong to styling.
   -------------------------------------------------------------------------- */

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
