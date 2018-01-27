import 'scss/index.scss';
import animatedScrollTo from 'animated-scrollto';
import CodeOfConduct from './codeOfConduct';

class MobileNavManager {
  constructor() {
    this.mobileNav = document.querySelector('#mobile-nav');
    this.mobileNavTrigger = document.querySelector('#mobile-nav-trigger');
    this.mobileNavCloseTrigger = document.querySelector('#mobile-nav-close-trigger');
    this.preventScrolling = this.preventScrolling.bind(this);
    this.onMobileNavTrigger = this.onMobileNavTrigger.bind(this);
    this.onTouchMoveEnd = this.onTouchMoveEnd.bind(this);
    this.setupMobileNavigation();
  }

  setupMobileNavigation() {
    this.mobileNavTrigger.addEventListener('click', this.onMobileNavTrigger);
    this.mobileNavCloseTrigger.addEventListener('click', this.onMobileNavTrigger);
    this.mobileNav.addEventListener('click', this.onMobileNavTrigger);
    this.mobileNav.addEventListener('touchmove', this.preventScrolling);
    this.mobileNav.addEventListener('scroll', this.preventScrolling);
    const menuItems = this.mobileNav.querySelectorAll('.nav__anchor');
    Array.prototype.forEach.call(menuItems, (menuItem) => {
      menuItem.style.cursor = 'pointer';
      menuItem.addEventListener('click', this.onMobileNavTrigger);
    });
  }

  preventScrolling(e) {
    e.stopPropagation();
    this.mobileNav.addEventListener('touchend', this.onTouchMoveEnd, true);
  }

  onTouchMoveEnd(e) {
    e.stopPropagation();
    this.mobileNav.removeEventListener('touchend', this.onTouchMoveEnd, true);
  }


  handleFocus() {
    if (this.isOpened) {
      this.mobileNavCloseTrigger.focus();
    } else {
      this.mobileNavTrigger.focus();
    }
  }

  onMobileNavTrigger(e) {
    if (e.currentTarget === this.mobileNav && e.target !== this.mobileNav) {
      return;
    }
    this.mobileNav.classList.toggle('opened');
    this.handleFocus();
  }

  get isOpened() {
    return this.mobileNav.classList.contains('opened');
  }
}

function onAnchorClick(e) {
  e.preventDefault();
  let targetAnchor = e.currentTarget.getAttribute('href');
  //this is needed since the href attr starts with an /
  targetAnchor = targetAnchor.slice(1, targetAnchor.length);
  const elementToScroll = document.querySelector(targetAnchor);
  if (!elementToScroll) {
    return;
  }
  const anchorPosition = elementToScroll.getBoundingClientRect().top;
  const positionToScroll = anchorPosition + window.scrollY;
  const animationDuration = 233;
  animatedScrollTo(document.body, positionToScroll, animationDuration, () => {
    elementToScroll.focus();
  });
}

function setupScrollAnimation() {
  const anchors = document.querySelectorAll('.scroll');
  for (const anchor of anchors) {
    anchor.addEventListener('click', onAnchorClick);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MobileNavManager();
  if (window.location.pathname === '/') {
    setupScrollAnimation();
  }
  if (window.location.pathname.startsWith('/codigo-de-conduta')) {
    new CodeOfConduct();
  }
});
