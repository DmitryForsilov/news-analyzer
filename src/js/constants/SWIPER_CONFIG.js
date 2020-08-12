export default {
  init: false,
  slidesPerView: 'auto',
  roundLengths: true,
  spaceBetween: 8,
  loop: false,
  centeredSlides: false,

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
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
};
