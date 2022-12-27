'use strict';

const cache = {
  $body: $('body'),
  $toggleSectionButtonElement: $('.js-toggle-section'),
  $buttonText: $('.button-toggle_section_text'),
};

let isMenuActive = false;
let isSectionButtonOpened = false;
let $mainSections = ['about', 'gallery', 'contacts', 'menu'];

const toggleSectionButton = (isSectionButtonOpened) => {
  cache.$toggleSectionButtonElement.toggleClass(
    'button-toggle_section--opened',
    isSectionButtonOpened
  );
  let text = '';
  for (let el of $mainSections) {
    if (
      cache.$body.hasClass(`${el}-active`) &&
      el !== 'menu' &&
      !isSectionButtonOpened
    ) {
      text = `open ${el}`;
      break;
    } else if (
      cache.$body.hasClass(`${el}-active`) &&
      el !== 'menu' &&
      isSectionButtonOpened
    ) {
      text = `close ${el}`;
      break;
    } else {
      text = 'open gallery';
    }
  }

  isMenuActive = cache.$body.hasClass(`menu-active`);
  cache.$buttonText[0].innerText = text;
};

const toggleSections = (isElementActive, section) => {
  if (section !== 'menu') {
    $mainSections.forEach((el) => {
      if (el === section) {
        cache.$body.toggleClass(`${el}-active`, isElementActive);
        cache.$body.removeClass(`menu-active`, isElementActive);
      } else {
        cache.$body.removeClass(`${el}-active`);
      }
    });
  } else {
    cache.$body.toggleClass(`${section}-active`, isElementActive);
  }

  for (let el of $mainSections) {
    if (cache.$body.hasClass(`${el}-active`) && el !== 'menu') {
      cache.$body.removeClass(`home-active`);
      isSectionButtonOpened = true;
      toggleSectionButton(isSectionButtonOpened);
      return;
    } else {
      cache.$body.addClass(`home-active`);
    }
  }
};

const closeAllSections = (boolean) => {
  if (!boolean) {
    return;
  }

  $mainSections.forEach((el) => {
    cache.$body.removeClass(`${el}-active`);
  });
  cache.$body.addClass(`home-active`);
};

$('.js-burger-button').on('click', function () {
  isMenuActive = !isMenuActive;
  toggleSections(isMenuActive, 'menu');
});

$('.js-menu-item').on('click', function () {
  const $this = $(this);
  const section = $this.data('section');
  let isElementActive = false;
  isMenuActive = false;

  $mainSections.forEach((el) => {
    if (!cache.$body.hasClass(`${el}-active`)) {
      isElementActive = true;
    }
  });
  toggleSections(isElementActive, section);
});

cache.$toggleSectionButtonElement.on('click', function () {
  isSectionButtonOpened = !isSectionButtonOpened;
  toggleSections(isSectionButtonOpened, 'gallery');
  toggleSectionButton(isSectionButtonOpened);
  closeAllSections(!isSectionButtonOpened);
});

$('.js-button-home-start')
  .on('mouseenter', function () {
    const $this = $(this);
    $this.addClass('button-home_start_hover');
    $('.button-home_start_bg').css('transform', 'translateX(0)');
  })
  .on('mouseleave', function () {
    const $this = $(this);
    $('.button-home_start_bg').css('transform', 'translateX(100%)');
    $this.removeClass('button-home_start_hover');
    // $this.addClass('button-home_start_mouse_leave ');
    // setTimeout(() => {
    //   $('.button-home_start_bg').css('transform', 'translateX(-100%)');
    //   $this.removeClass('button-home_start_mouse_leave ');
    // }, 800);

    // $this.addClass('button-home_mouse_leave');
    // setTimeout(() => {
    //   $this.removeClass('button-home_mouse_leave');
    // }, 1000);
  });
