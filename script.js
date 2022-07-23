'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('section');
const allButtons = document.getElementsByTagName('button');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// App Building
const scrollBtn = document.querySelector('.btn--scroll-to');
// console.log(scroll1.textContent);
const scrollPlace = document.querySelector('#section--1');
// console.log(scrollPlace.textContent);

scrollBtn.addEventListener('click', function () {
  scrollPlace.scrollIntoView({ behavior: 'smooth' }); //Easier way of doing the scroll.
});

// Working on Nav Option for smooth scrolling
// 1.Method 1 which is not efficient
// const scrollSection = document.querySelectorAll('.nav__link');
// scrollSection.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Method2:Using Event Delegation

// 1.Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);

  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Components

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Bad Practice. Use Event Delegation
// tabs.forEach(function (el) {
//   el.addEventListener('click', function () {
//     console.log('Log');
//   });
// });

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  if (!clicked) {
    return;
  }
  // remove the active class
  tabs.forEach(function (t) {
    t.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(function (c) {
    c.classList.remove('operations__content--active');
  });
  // Add the active Class
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');

  // console.log(e.currentTarget);
});

// Nav Animations
const nav = document.querySelector('.nav');

// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     // console.log(e.currentTarget);
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(function (el) {
//       if (el !== link) {
//         el.style.opacity = 0.5;
//       }
//     });
//     logo.style.opacity = 0.5;
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     // console.log(e.currentTarget);
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(function (el) {
//       if (el !== link) {
//         el.style.opacity = 1;
//       }
//     });
//     logo.style.opacity = 1;
//   }
// });

// The above code is repetitive. Lets make it a DRY

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(e.currentTarget);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// Sticky Nav Bar
// Method 1: Inefficient
// const section1Coords = scrollPlace.getBoundingClientRect();
// // console.log(section1Coords);
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);

//   if (window.scrollY > section1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Method2 : Intersection of server API
const navHeight = nav.getBoundingClientRect().height;
const headerOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerFunction = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

// const header = document.querySelector('.header');
const headerObserver = new IntersectionObserver(headerFunction, headerOption);
headerObserver.observe(header);

// Sections and visibility

// const allSections = document.querySelectorAll('.section');

const sectionOption = {
  root: null,
  threshold: 0.15,
};

const sectionFunction = function (entries, observe) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(
  sectionFunction,
  sectionOption
);

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy Loading
// const allImages = document.querySelector('img[data-src'); ==> Another way of selecting the required element
const allImages = document.querySelector('.section');
const images = allImages.querySelectorAll('img');

const imageOption = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};
const imageFunction = function (entries, observe) {
  const entry = entries[0];
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observe.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(imageFunction, imageOption);

// console.log(images);
images.forEach(function (image) {
  imageObserver.observe(image);
});

// Slider Option

const allSlide = document.querySelectorAll('.slide');
// console.log(allSlide);
// const slider = document.querySelector('.slider');
// slider.style.overflow = 'visible';
// slider.style.transform = 'scale(0.5)';

const slideLength = function (i) {
  allSlide.forEach(function (slide, idx) {
    slide.style.transform = `translateX(${100 * (idx - i)}%)`;
  });
};
slideLength(0);
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const activateSlide = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(function (dot) {
    dot.classList.remove('dots__dot--active');
  });

  document
    .querySelector(`.dots__dot[data-slide = "${slide}"]`)
    .classList.add('dots__dot--active');
};
let count = 0;
const prev = function () {
  if (count === 0) {
    count = allSlide.length - 1;
  } else {
    count = count - 1;
  }

  slideLength(count);
  activateSlide(count);
};

const next = function () {
  if (count < allSlide.length - 1) {
    count++;
  } else {
    count = 0;
  }

  slideLength(count);
  activateSlide(count);
};
btnRight.addEventListener('click', next);

btnLeft.addEventListener('click', prev);

// Arrow events

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
});

// Dots creation and functionality
const dotsContainer = document.querySelector('.dots');
const createDots = function () {
  allSlide.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `
    <button class = 'dots__dot' data-slide = '${i}'></button>
    `
    );
  });
};
createDots();

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    slideLength(slide);
    activateSlide(slide);
  }
});
// /////////////////////////////////////////
// ////////////////////////////////////////
// Practice nd other stuffs
// Dom Traversing

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children);
// console.log(h1.childNodes);
// // GOing Upwards
// console.log(h1.parentElement);
// console.log(h1.closest('.header__title'));
// console.log(h1.closest('.header'));
// console.log(h1.closest('h1'));

// // Moving Sideways
// const items = document.querySelectorAll('.nav__item')[1];
// console.log(items);

// console.log(items.nextElementSibling);
// console.log(items.previousElementSibling);

// Selecting Elements
// The first two are usually used and preferred
// console.log(document.querySelector('.nav'));
// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('section');
// // console.log(allSections);

// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// Creating And Inserting Elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We used cookie for improved functionality and analytics. <button class = "btn btn--close-cookie"> Got it!!</button>';

// header.prepend(message);  Inserts at the start of the element
// header.prepend(message); //Insert at the end of the element
// header.append(message.cloneNode(true)); Used for cloning the element

// Delete the element

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// Attributes,Classes,styles

// 1. styles
// message.style.backgroundColor = 'grey';
// message.style.width = '120%';

// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
// console.log(message.style.height);

// CSS custom properties or variables
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
// const logo = document.querySelector('.nav__logo');

// console.log(logo.src); //Gives absolute path
// console.log(logo.alt);
// console.log(logo.className);
// // This won't work as the below mentioned attributes are not inbuilt
// console.log(logo.designer); //does Not works
// console.log(logo.getAttribute('designer')); //Works

// Just like we can get attributes, we can also set attributes
// logo.alt = 'A beutiful pic';
// console.log(logo.alt);
// logo.setAttribute('company', 'RahGul');

// console.log(logo.getAttribute('src')); //Gives relative path

// 3.Classes
// logo.classList.add(''); //Adds class
// logo.classList.remove(''); //Remove Class
// logo.classList.toggle('');
// logo.classList.contains('');

// Actual work for website starts here.
// 1.Making the lazy scroll

// const scrollBtn = document.querySelector('.btn--scroll-to');
// // console.log(scroll1.textContent);
// const scrollPlace = document.querySelector('#section--1');
// // console.log(scrollPlace.textContent);

// scrollBtn.addEventListener('click', function () {
//   scrollPlace.scrollIntoView({ behavior: 'smooth' }); //Easier way of doing the scroll.
// });

// Handling Events in different ways

// const H1 = document.querySelector('h1');
// const event1 = function () {
//   alert('I am working');
//   H1.removeEventListener('mouseenter', event1);
// };

// H1.addEventListener('mouseenter', event1);

// old way of doing it
// H1.onmouseenter = function () {
//   alert('I am working again');
// };

// Event capturing and bubbling and propagation
// RGB(255,255,255)
// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min)) + min;
// };

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// // console.log(randomInt(0, 255));

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target); //Will give only the nav__link as it is the target where the event happened  first

//   // We can stop the propagation as well but this is not a good practice.
//   e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target); //Will give the first nav_links only.
//   console.log(e.currentTarget); //WIll give the result on element on which this is triggered that is the current element
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target);
//   console.log(e.currentTarget);
// });
