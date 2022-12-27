'use strict';

const cache = {
  $body: $('body'),
  $toggleSectionButtonElement: $('.js-toggle-section'),
  $buttonText: $('.button-toggle_section_text'),
  $btnHomeBackground: $('.button-bg'),
};

let isMenuActive = false;
let isSectionButtonOpened = false;
let isMouseEntered = false;
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
      text = `close ${el} <span class="button-toggle_underline"></span>`;
      break;
    } else {
      text = 'open gallery <span class="button-toggle_underline"></span>';
    }
  }

  isMenuActive = cache.$body.hasClass(`menu-active`);
  cache.$buttonText[0].innerHTML = text;
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

  $('.js-toggle-section-button-text').trigger('mouseenter');
});

$('.js-toggle-section-button-text')
  .on('mouseenter', (e) => {
    $('.button-toggle_underline').animate({ left: '38px' }, 400);
    isMouseEntered = true;
  })
  .on('mouseleave', (e) => {
    if (isMouseEntered) {
      $('.button-toggle_underline').animate({ left: '100%' }, 400);
      $('.button-toggle_underline').animate({ left: '-100%' }, 0);
      isMouseEntered = false;
    }
  });

$('.js-button-home-start')
  .on('mouseenter', async function (e) {
    cache.$btnHomeBackground.animate({ left: '100%' }, 400);
  })
  .on('mouseleave', function (e) {
    cache.$btnHomeBackground.animate({ left: '201%' }, 400);
    cache.$btnHomeBackground.animate({ left: '0' }, 0);
  });
