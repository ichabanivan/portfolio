'use strict';

$(function () {
  var page = void 0,
      $hamburgerMenu = $('.hamburger-menu'),
      $bar = $('.bar'),
      $nav = $('.nav'),
      menuIsOpen = void 0;

  function defineThePage() {
    var hashes = location.hash.split('/');
    var hash = hashes[0];
    if (hash === '/' || hash === '' || hash === '#home') {
      var newPage = 'home';
      setState(newPage);
    } else if (hash === '#menu') {
      var _newPage = 'home';
      setState(_newPage);
    } else if (hash === '#about') {
      var _newPage2 = 'about';
      setState(_newPage2);
    } else if (hash === '#experience') {
      var _newPage3 = 'experience';
      setState(_newPage3);
    } else if (hash === '#skills') {
      var _newPage4 = 'skills';
      setState(_newPage4);
    } else if (hash === '#portfolio') {
      var _newPage5 = 'portfolio';
      setState(_newPage5);
    } else if (hash === '#contacts') {
      var _newPage6 = 'contacts';
      setState(_newPage6);
    } else {
      console.log('error');
    }
  }

  function showPage(newPage) {
    $('.' + page).removeClass('current');
    $('.' + newPage).addClass('current');
    page = newPage;
  }

  function showOrHideMenu(show) {
    if (show) {
      $nav.show();
    } else {
      $nav.hide();
    }
  }

  defineThePage();

  $('.nav__link').on('click', function (e) {
    showOrHideMenu(false);
    setState($(this).parent().data('url'));
    $bar.toggleClass('animate');
  });

  $hamburgerMenu.on('click', function () {
    menuIsOpen = $bar.hasClass('animate');
    $bar.toggleClass('animate');

    // setState(page)
    showOrHideMenu(!menuIsOpen);
  });

  function setState(newPage) {
    var obj = {
      page: newPage,
      data: {}
    };

    history.pushState(obj, obj.page, '/#' + obj.page);

    if (obj.page === 'menu') {
      showOrHideMenu(true);
    } else {
      showPage(obj.page);
    }
  }

  window.addEventListener('popstate', function (e) {
    var state = history.state;
    console.log(state);
    if (state.page === 'menu') {
      showOrHideMenu(true);
    } else {
      showPage(state.page);
    }
  });

  // more infos - particleslider.com

  var init = function init() {
    var isMobile = navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
    var isSmall = window.innerWidth < 1000;

    var ps = new ParticleSlider({
      ptlGap: isMobile || isSmall ? 3 : 0,
      ptlSize: isMobile || isSmall ? 3 : 1,
      width: 1e9,
      height: 1e9
    });

    var gui = new dat.GUI();
    gui.add(ps, 'ptlGap').min(0).max(5).step(1).onChange(function () {
      ps.init(true);
    });
    gui.add(ps, 'ptlSize').min(1).max(5).step(1).onChange(function () {
      ps.init(true);
    });
    gui.add(ps, 'restless');
    gui.addColor(ps, 'color').onChange(function (value) {
      ps.monochrome = true;
      ps.setColor(value);
      ps.init(true);
    });

    window.addEventListener ? window.addEventListener('click', function () {
      ps.init(true);
    }, false) : window.onclick = function () {
      ps.init(true);
    };
  };

  var initParticleSlider = function () {
    var psScript = document.createElement('script');
    psScript.addEventListener ? psScript.addEventListener('load', init, false) : psScript.onload = init;
    psScript.src = 'http://particleslider.com/js/particleslider/current/particleslider.js';
    psScript.setAttribute('type', 'text/javascript');
    document.body.appendChild(psScript);
  }(window.addEventListener ? window.addEventListener('load', initParticleSlider, false) : window.onload = initParticleSlider);

  // HOme page

  $(window).on('mousemove', function (e) {
    // Навешиваем событие перемещени мыши на window, первым аргументом в функцию-обработчик события отправляется ссылка на объект события
    var y = e.pageY; // Узнаем положение мышки по Y
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
});