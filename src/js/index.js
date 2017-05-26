$(function () {
  let
    page,
    $hamburgerMenu = $('.hamburger-menu'),
    $bar = $('.bar'),
    $nav = $('.nav'),
    menuIsOpen;

  function defineThePage () {
    let hashes = location.hash.split('/');
    let hash = hashes[0];
    if (hash === '/' || hash === '' || hash === '#home') {
      let newPage = 'home'
      setState(newPage)
    } else if (hash === '#menu') {
      let newPage = 'home'
      setState(newPage)
    } else if (hash === '#about') {
      let newPage = 'about'
      setState(newPage)
    } else if (hash === '#experience') {
      let newPage = 'experience'
      setState(newPage)
    } else if (hash === '#skills') {
      let newPage = 'skills'
      setState(newPage)
    } else if (hash === '#portfolio') {
      let newPage = 'portfolio'
      setState(newPage)
    } else if (hash === '#contacts') {
      let newPage = 'contacts';
      setState(newPage)
    } else {
      console.log('error');
    }
  }

  function showPage (newPage) {
    $('.' + page).removeClass('current');
    $('.' + newPage).addClass('current');
    page = newPage;
  }

  function showOrHideMenu (show) {
    if (show) {
      $nav.show()
    } else {
      $nav.hide()
    }
  }

  defineThePage();

  $('.nav__link').on('click', function (e) {
    showOrHideMenu(false)
    setState($(this).parent().data('url'))
    $bar.toggleClass('animate')
  });

  $hamburgerMenu.on('click', function () {
    menuIsOpen = $bar.hasClass('animate');
    $bar.toggleClass('animate')

    // setState(page)
    showOrHideMenu(!menuIsOpen)
  });

  function setState (newPage) {
    let obj = {
      page: newPage,
      data: {}
    };

    history.pushState(obj, obj.page, `/#${obj.page}`);

    if (obj.page === 'menu') {
      showOrHideMenu(true)
    } else {
      showPage(obj.page)
    }
  }

  window.addEventListener('popstate', function (e) {
    let state = history.state;
    console.log(state)
    if (state.page === 'menu') {
      showOrHideMenu(true)
    } else {
      showPage(state.page)
    }
  });

  // more infos - particleslider.com

  var init = function () {
    var isMobile = navigator.userAgent &&
      navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
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

    (window.addEventListener
      ? window.addEventListener('click', function () { ps.init(true) }, false)
      : window.onclick = function () { ps.init(true) });
  }

  var initParticleSlider = (function () {
    var psScript = document.createElement('script');
    (psScript.addEventListener
      ? psScript.addEventListener('load', init, false)
      : psScript.onload = init);
    psScript.src = 'http://particleslider.com/js/particleslider/current/particleslider.js';
    psScript.setAttribute('type', 'text/javascript');
    document.body.appendChild(psScript);
  }

  (window.addEventListener
    ? window.addEventListener('load', initParticleSlider, false)
    : window.onload = initParticleSlider));
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // HOme page

  $(window).on('mousemove', function (e) { // Навешиваем событие перемещени мыши на window, первым аргументом в функцию-обработчик события отправляется ссылка на объект события
    // var y = (e.pageY); // Узнаем положение мышки по Y
    var y = (e.clientY); // Узнаем положение мышки по Y
    var height100percent = window.innerHeight; // Сколько пикселей в 100% высоты
    var heightHover = y/(height100percent/100); // Ховер на % от верхней части
    // 1 полоса
    let height1before = heightHover/3 + '%';
    let height1after = 100-(30+heightHover/3) + '%';
    TweenLite.to('.parallax__before--1', 1, {height: height1before});
    TweenLite.to('.parallax__after--1', 1, {height: height1after});
    // 2 полоса
    let height2before = heightHover/7 + '%';
    let height2after = 100-(75+heightHover/7) + '%';
    TweenLite.to('.parallax__before--2', 1, {height: height2before});
    TweenLite.to('.parallax__after--2', 1, {height: height2after});
    // 3 полоса
    let height3before = 10+heightHover/10 + '%';
    let height3after = 100-(85+heightHover/10) + '%';
    TweenLite.to('.parallax__before--3', 1, {height: height3before});
    TweenLite.to('.parallax__after--3', 1, {height: height3after});
    // 4 полоса
    let height4before = 10+heightHover/15 + '%';
    let height4after = 100-(95+heightHover/15) + '%';
    TweenLite.to('.parallax__before--4', 1, {height: height4before});
    TweenLite.to('.parallax__after--4', 1, {height: height4after});
    // 5 полоса
    let height5before = 20+heightHover/8 + '%';
    let height5after = 100-(85+heightHover/8) + '%';
    TweenLite.to('.parallax__before--5', 1, {height: height5before});
    TweenLite.to('.parallax__after--5', 1, {height: height5after});
  });

  // функция проверки полной видимости элемента
  function checkPosition(){
    // координаты дива
    var div_position = $('.parallax').offset();
    // отступ сверху
    var div_top = div_position.top;
    // отступ слева
    var div_left = div_position.left;
    // ширина
    var div_width = $('.parallax').width();
    // высота
    var div_height = $('.parallax').height();

    // проскроллено сверху 
    var top_scroll = $(document).scrollTop();
    // проскроллено слева
    var left_scroll = $(document).scrollLeft();
    // ширина видимой страницы
    var screen_width = $(window).width();
    // высота видимой страницы
    var screen_height = $(window).height();

    // координаты углов видимой области
    var see_x1 = left_scroll;
    var see_x2 = screen_width + left_scroll;
    var see_y1 = top_scroll;
    var see_y2 = screen_height + top_scroll;

    // координаты углов искомого элемента
    var div_x1 = div_left;
    var div_x2 = div_left + div_height;
    var div_y1 = div_top;
    var div_y2 = div_top + div_width;

    // проверка - виден див полностью или нет
    if( div_x1 >= see_x1 && div_x2 <= see_x2 && div_y1 >= see_y1 && div_y2 <= see_y2 ){
      // если виден
      // $('.parallax').css({'top': '0%', 'left': '40%'});
      console.log(1)
    }else{
      // если не виден
      // $('.parallax').css({'top': '50%', 'left': '0%'});
      // console.log(2)
    }
  }



    $(document).scroll(function(){
      // при скролле страницы делаем проверку
      checkPosition();
    });

    // после загрузки страницы сразу проверяем
    checkPosition();
    checkParallax ()

    // проверка при масштабировании и изменении размера страницы
    $(window).resize(function(){
      checkPosition();

      // Если елемент снизу то социалки вниз
      checkParallax()
    });

    function checkParallax () {
      if (document.querySelector('.home__photo').getBoundingClientRect().top > 0) {
        $('.content').css({
          'flex-direction': 'column'
        })
        $('.social').css({
          'order': 1
        })
        $('.social__item').css({
          'transform': 'rotate(0deg)'
        })
        $('.social__list').css({
          'flex-direction': 'row'
        })
      } else {
        $('.content').css({
          'flex-direction': 'row'
        })
        $('.social').css({
          'order': -1
        })
        $('.social__item').css({
          'transform': 'rotate(90deg)'
        })
        $('.social__list').css({
          'flex-direction': 'column'
        })
      }
    }


});
