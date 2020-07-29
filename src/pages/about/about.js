import './about.css';
import 'swiper/swiper-bundle.css';
import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

const mySwiper = new Swiper('.swiper', {
  wrapperClass: 'swiper__wrapper',
  slideClass: 'swiper__slide',
  slidesPerView: 'auto',
  roundLengths: true,
  spaceBetween: 8,
  loop: false,
  centeredSlides: false,

  pagination: {
    el: '.swiper__pagination',
    bulletClass: 'swiper__pagination-bullet',
    bulletActiveClass: 'swiper__pagination-bullet_active',
  },

  navigation: {
    nextEl: '.swiper__button_type_next',
    prevEl: '.swiper__button_type_prev',
    disabledClass: 'swiper__button_disabled',
  },

  breakpoints: {
    768: {
      spaceBetween: 12,
    },
    1024: {
      spaceBetween: 16,
      loop: true,
      centeredSlides: true,
    },
  },
});