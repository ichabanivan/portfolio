'use strict';

function checkParallax() {
  if ($('.home__photo').offset().top > 0) {
    $('body').removeClass('landscape');
    $('body').addClass('portrait');
  } else {
    $('body').removeClass('portrait');
    $('body').addClass('landscape');
  }
}

window.onload = function () {
  var prevPage = void 0,
      page = void 0;
  // $hamburgerMenu = $('.hamburger-menu'),
  // $bar = $('.bar'),
  // $nav = $('.nav'),
  // menuIsOpen;

  function defineThePage() {
    var hashes = location.hash.split('/');
    var hash = hashes[0];
    if (hash === '/' || hash === '' || hash === '#home') {
      page = 'home';
      setState(page);
    } else if (hash === '#menu') {
      page = 'home';
      setState(page);
    } else if (hash === '#about') {
      page = 'about';
      setState(page);
    } else if (hash === '#experience') {
      page = 'experience';
      setState(page);
    } else if (hash === '#skills') {
      page = 'skills';
      setState(page);
    } else if (hash === '#portfolio') {
      page = 'portfolio';
      setState(page);
    } else if (hash === '#contacts') {
      page = 'contacts';
      setState(page);
    } else {
      console.log('error');
    }
  }

  defineThePage();

  $('.menuNew__link').on('click', function (e) {
    prevPage = page;
    page = $(this).parent().data('url');
    setState();
  });

  function setState() {
    var obj = {
      page: page,
      data: {}
    };

    history.pushState(obj, obj.page, '/#' + obj.page);
    showPage();
    checkParallax();
  }

  function showPage() {
    var b = '.' + page;

    if (prevPage) {
      var a = '.' + prevPage;
      TweenLite.to($(a), 1, { left: '100%' });
      setTimeout(function () {
        $('.' + prevPage).removeClass('current');
      }, 500);
    }
    setTimeout(function () {
      $('.' + page).addClass('current');
      TweenLite.to($(b), 1, { left: '0%' });
    }, 500);
    // $('.' + page).addClass('current');
    // TweenLite.from($(b), 1, {left: '100%'});
  }

  // window.addEventListener('popstate', function (e) {
  //   let state = history.state;
  //
  //   prevPage = page;
  //   showPage(state.page, prevPage)
  //
  // });

  checkParallax();

  // $(window).resize(function () {
  //   checkParallax()
  // });

  window.addEventListener('resize', function () {
    checkParallax();
  });
  // more infos - particleslider.com

  // HOme page

  $(window).on('mousemove', function (e) {
    // Навешиваем событие перемещени мыши на window, первым аргументом в функцию-обработчик события отправляется ссылка на объект события
    var y = e.clientY; // Узнаем положение мышки по Y
    var height100percent = window.innerHeight; // Сколько пикселей в 100% высоты
    var heightHover = y / (height100percent / 100); // Ховер на % от верхней части
    // 1 полоса
    var height1before = heightHover / 3 + '%';
    var height1after = 100 - (30 + heightHover / 3) + '%';
    TweenLite.to('.parallax__before--1', 1, { height: height1before });
    TweenLite.to('.parallax__after--1', 1, { height: height1after });
    // 2 полоса
    var height2before = heightHover / 7 + '%';
    var height2after = 100 - (75 + heightHover / 7) + '%';
    TweenLite.to('.parallax__before--2', 1, { height: height2before });
    TweenLite.to('.parallax__after--2', 1, { height: height2after });
    // 3 полоса
    var height3before = 10 + heightHover / 10 + '%';
    var height3after = 100 - (85 + heightHover / 10) + '%';
    TweenLite.to('.parallax__before--3', 1, { height: height3before });
    TweenLite.to('.parallax__after--3', 1, { height: height3after });
    // 4 полоса
    var height4before = 10 + heightHover / 15 + '%';
    var height4after = 100 - (95 + heightHover / 15) + '%';
    TweenLite.to('.parallax__before--4', 1, { height: height4before });
    TweenLite.to('.parallax__after--4', 1, { height: height4after });
    // 5 полоса
    var height5before = 20 + heightHover / 8 + '%';
    var height5after = 100 - (85 + heightHover / 8) + '%';
    TweenLite.to('.parallax__before--5', 1, { height: height5before });
    TweenLite.to('.parallax__after--5', 1, { height: height5after });
  });

  //  Contacts
  $('.form__email').on("focus", function () {
    TweenLite.to('.form__email-placeholder', 1, {
      top: '20px',
      color: '#CD0D2E',
      fontSize: '0.8rem'
    });
    TweenLite.to('.form__email-border', 1, {
      width: '80%',
      backgroundColor: "#CD0D2E",
      opacity: 1
    });
  });
  $('.form__email').on("focusout", function () {
    if (!$('.form__email').val()) {
      TweenLite.to('.form__email-placeholder', 1, {
        top: '40px',
        color: 'rgba(255, 255, 255, 0.84)',
        fontSize: '1rem'
      });
    } else {
      TweenLite.to('.form__email-placeholder', 1, {
        color: 'rgba(255, 255, 255, 0.84)'
      });
    }
    TweenLite.to('.form__email-border', 1, {
      width: '0%',
      backgroundColor: 'rgba(255, 255, 255, 0.84)',
      opacity: 1
    });
  });

  $('.form__name').on("focus", function () {
    TweenLite.to('.form__name-placeholder', 1, {
      top: '20px',
      color: '#CD0D2E',
      fontSize: '0.8rem'
    });
    TweenLite.to('.form__name-border', 1, {
      width: '80%',
      backgroundColor: "#CD0D2E",
      opacity: 1
    });
  });
  $('.form__name').on("focusout", function () {
    if (!$('.form__name').val()) {
      TweenLite.to('.form__name-placeholder', 1, {
        top: '40px',
        color: 'rgba(255, 255, 255, 0.84)',
        fontSize: '1rem'
      });
    } else {
      TweenLite.to('.form__name-placeholder', 1, {
        color: 'rgba(255, 255, 255, 0.84)'
      });
    }
    TweenLite.to('.form__name-border', 1, {
      width: '0%',
      backgroundColor: 'rgba(255, 255, 255, 0.84)',
      opacity: 1
    });
  });

  $('.form__message').on("focus", function () {
    TweenLite.to('.form__message-placeholder', 1, {
      top: '20px',
      color: '#CD0D2E',
      fontSize: '0.8rem'
    });
    TweenLite.to('.form__message-border', 1, {
      width: '80%',
      backgroundColor: "#CD0D2E",
      opacity: 1
    });
  });
  $('.form__message').on("focusout", function () {
    if (!$('.form__message').val()) {
      TweenLite.to('.form__message-placeholder', 1, {
        top: '40px',
        color: 'rgba(255, 255, 255, 0.84)',
        fontSize: '1rem'
      });
    } else {
      TweenLite.to('.form__message-placeholder', 1, {
        color: 'rgba(255, 255, 255, 0.84)'
      });
    }
    TweenLite.to('.form__message-border', 1, {
      width: '0%',
      backgroundColor: 'rgba(255, 255, 255, 0.84)',
      opacity: 1
    });
  });
};