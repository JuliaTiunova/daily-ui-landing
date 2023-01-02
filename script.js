'use strict';

const cache = {
  $body: $('body'),
  $toggleSectionButtonElement: $('.js-toggle-section'),
  $buttonSecondary: $('.button-secondary'),
  $buttonSecondaryText: $('.button-secondary_text'),
  $btnHomeBackground: $('.button-bg'),
  $galleryImg: $('.gallery-bg'),
};

let isMenuActive = false;
let isSectionButtonOpened = false;
let isGalleryActive = false;
let mainSections = ['about', 'gallery', 'contacts', 'menu'];

const toggleSectionButton = (isSectionButtonOpened) => {
  cache.$toggleSectionButtonElement.toggleClass(
    'button-toggle_section--opened',
    isSectionButtonOpened
  );
  let text = '';
  for (let el of mainSections) {
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
  cache.$buttonSecondaryText[0].innerHTML = text;
};

const toggleSections = (isElementActive, section) => {
  if (section !== 'menu') {
    mainSections.forEach((el) => {
      if (el === section) {
        const $sectionEl = $(`.${el}`);
        cache.$body.toggleClass(`${el}-active`, isElementActive);
        cache.$body.removeClass(`menu-active`, isElementActive);
        $('html, body').animate({ scrollTop: $sectionEl.offset() }, 400);
      } else {
        cache.$body.removeClass(`${el}-active`);
      }
    });
  } else {
    cache.$body.toggleClass(`${section}-active`, isElementActive);
  }

  if (section === 'gallery' && isElementActive && !isGalleryActive) {
    initSlider();
    isGalleryActive = true;
  } else if (
    (section === 'gallery' && !isElementActive && isGalleryActive) ||
    (section !== 'gallery' && section !== 'menu')
  ) {
    closeSlider();
    isGalleryActive = false;
  }

  for (let el of mainSections) {
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

  mainSections.forEach((el) => {
    cache.$body.removeClass(`${el}-active`);
  });
  cache.$body.addClass(`home-active`);
};

const initSlider = () => {
  cache.$galleryImg.each((i, el) => {
    if (i === 0) {
      $(el).addClass('leftEdge');
      $(el).trigger('click');
    } else if (i === cache.$galleryImg.length - 1) {
      $(el).addClass('rightEdge right');
    }
  });
};

const closeSlider = () => {
  cache.$galleryImg.each((i, el) => {
    $(el).removeClass();
    $(el).addClass('gallery-bg js-gallery-img');
  });
};

const returnToHome = () => {
  isSectionButtonOpened = !isSectionButtonOpened;
  toggleSections(isSectionButtonOpened, 'gallery');
  toggleSectionButton(isSectionButtonOpened);
  closeAllSections(!isSectionButtonOpened);
  $('.button-toggle_section_text').trigger('mouseenter');
};

$('.js-burger-button').on('click', function () {
  isMenuActive = !isMenuActive;
  toggleSections(isMenuActive, 'menu');

  $('body').on('click', function (e) {
    if ($(e.target).closest('.header').length && isMenuActive) {
      return;
    }

    isMenuActive = false;
    toggleSections(false, 'menu');
  });
});

$('.js-menu-item').on('click', function () {
  const $this = $(this);
  const section = $this.data('section');
  let isElementActive = false;
  isMenuActive = false;

  mainSections.forEach((el) => {
    if (!cache.$body.hasClass(`${el}-active`)) {
      isElementActive = true;
    }
  });

  if (section === 'home') {
    returnToHome();
  } else {
    toggleSections(isElementActive, section);
  }
});

cache.$toggleSectionButtonElement.on('click', function (e) {
  if (!$(this).hasClass('button-toggle_section')) {
    return;
  }

  e.preventDefault();

  returnToHome();
});

cache.$buttonSecondary
  .on('mouseenter', function (e) {
    $(this).find('.button-toggle_underline').animate({ left: '38px' }, 400);
  })
  .on('mouseleave', function (e) {
    $(this).find('.button-toggle_underline').animate({ left: '100%' }, 400);
    $(this).find('.button-toggle_underline').animate({ left: '-100%' }, 0);
  });

$('.js-button-home-main')
  .on('mouseenter', function () {
    const bground = $(this).find(cache.$btnHomeBackground);
    bground.animate({ left: '100%' }, 400);
  })
  .on('mouseleave', function () {
    const bground = $(this).find(cache.$btnHomeBackground);
    bground.animate({ left: '201%' }, 400);
    bground.animate({ left: '0' }, 0);
  });

cache.$galleryImg.on('click', function () {
  const $this = $(this);

  if ($this.hasClass('active')) {
    return;
  }

  $this.addClass('active center');
  $this.prev().addClass('leftIndex');
  $this.next().addClass('rightIndex');

  if (!$this.prev().hasClass('left')) {
    $this.prev().addClass('left');
  }

  if (!$this.next().hasClass('right')) {
    $this.next().addClass('right');
  }

  if ($this.next() && $this.next().hasClass('active')) {
    $this.next().next().removeClass('rightIndex');
    $this.next().removeClass('active center');
    $this.removeClass('left leftIndex');
  }

  if ($this.prev() && $this.prev().hasClass('active')) {
    $this.prev().prev().removeClass('leftIndex');
    $this.prev().removeClass('active center');
    $this.removeClass('right rightIndex');
  }
});
