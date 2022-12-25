'use strict';

$('.js-burger-button').on('click', function () {
  const $this = $(this);
  $('body').toggleClass('menu-active');
  $this.parents('.js-header').toggleClass('header--active');
});
