window.onload = function () {
  let
    screenOrientation,
    navigation = ['home', 'about', 'experience', 'skills', 'portfolio', 'contacts'],
    prevPage,
    page;



  // Портретная или ландшафтная
  function checkParallax () {
    if (window.innerWidth <= 992) {
      $('body').removeClass('landscape')
      $('body').addClass('portrait')
      screenOrientation = 'portrait'
    } else {
      console.log($('.home__wrapper').offset().left)
      if ($('.home__photo').offset().top > 0 || $('.home__wrapper').offset().left < 170) {
        $('body').removeClass('landscape')
        $('body').addClass('portrait')
        screenOrientation = 'portrait'
        if (!($('.home__photo').offset().top > 0)) {
          $('body').removeClass('column')
          $('body').addClass('row')
        } else {
          $('body').removeClass('row')
          $('body').addClass('column')
        }
      } else {
        $('body').removeClass('portrait')
        $('body').addClass('landscape')
        screenOrientation = 'landscape'
      }
    }
  }
  // Проверка при загрузке
  checkParallax()

  // Какая сейчас страница
  function defineThePage () {
    let hashes = location.hash.split('/');
    let hash = hashes[0];
    if (hash === '/' || hash === '' || hash === '#home') {
      page = 'home'
      setState(page)
    } else if (hash === '#menu') {
      page = 'home'
      setState(page)
    } else if (hash === '#about') {
      page = 'about'
      setState(page)
    } else if (hash === '#experience') {
      page = 'experience'
      setState(page)
    } else if (hash === '#skills') {
      page = 'skills'
      setState(page)
    } else if (hash === '#portfolio') {
      page = 'portfolio'
      setState(page)
    } else if (hash === '#contacts') {
      page = 'contacts';
      setState(page)
    } else {
      console.log('error');
    }
  }
  // проверка при загрузке
  defineThePage();

  function menuActiveItem(that) {
    $('.menu .menu__link').removeClass('active')
    $(that).addClass('active')
  }

  // console.log($(`.menu__link[href='#${page}']`))
  // $(`.menu__link[href='#${page}']`).addClass('active');
  // $(`.menu__link[href='#${page}']`).addClass('active');
  // $(`.menu__link[href='#${prevPage}']`).addClass('active');

  // document.querySelector('.menu__link.active').click()

  $('.menu__link').on('click', function (e) {
    // menuActiveItem(this)
    debugger
    prevPage = page;
    page = $(this).parent().data('url')
    setState()
  });

  function setState () {
    let obj = {
      page: page,
      data: {}
    };

    history.pushState(obj, obj.page, `/#${obj.page}`);
    showPage()
  }

  function showPage () {
    let b = '.' + page;
    if (prevPage) {
      let a = '.' + prevPage;
      TweenLite.to($(a), 1, {left: '100%'});
      setTimeout(function () {
        // $('.' + prevPage).removeClass('current');
        $('.content > div').removeClass('current');
      }, 500)
    }
    setTimeout(function () {
      $('.' + page).addClass('current');
      TweenLite.to($(b), 1, {left: '0%'});
    }, 500)

    $(`.menu__link[href='#${prevPage}']`).removeClass('active');
    $(`.menu__link[href='#${page}']`).addClass('active');
    // $('.' + page).addClass('current');
    // TweenLite.from($(b), 1, {left: '100%'});
  }

  window.addEventListener('popstate', function (e) {
    let state = history.state;
    prevPage = page;
    page = state.page;
    showPage()
  });

  window.addEventListener('resize', function () {
    checkParallax()
  });

  // Parallax on photo on home page

  $(window).on('mousemove', function (e) {
    // Навешиваем событие перемещени мыши на window, первым аргументом в функцию-обработчик события отправляется ссылка на объект события
    let y = (e.clientY); // Узнаем положение мышки по Y
    let height100percent = window.innerHeight; // Сколько пикселей в 100% высоты
    let heightHover = y / (height100percent / 100); // Ховер на % от верхней части
    // 1 полоса
    let height1before = heightHover / 3 + '%';
    let height1after = 100 - (30 + heightHover / 3) + '%';
    TweenLite.to('.parallax__before--1', 1, {height: height1before});
    TweenLite.to('.parallax__after--1', 1, {height: height1after});
    // 2 полоса
    let height2before = heightHover / 7 + '%';
    let height2after = 100 - (75 + heightHover / 7) + '%';
    TweenLite.to('.parallax__before--2', 1, {height: height2before});
    TweenLite.to('.parallax__after--2', 1, {height: height2after});
    // 3 полоса
    let height3before = 10 + heightHover / 10 + '%';
    let height3after = 100 - (85 + heightHover / 10) + '%';
    TweenLite.to('.parallax__before--3', 1, {height: height3before});
    TweenLite.to('.parallax__after--3', 1, {height: height3after});
    // 4 полоса
    let height4before = 10 + heightHover / 15 + '%';
    let height4after = 100 - (95 + heightHover / 15) + '%';
    TweenLite.to('.parallax__before--4', 1, {height: height4before});
    TweenLite.to('.parallax__after--4', 1, {height: height4after});
    // 5 полоса
    let height5before = 20 + heightHover / 8 + '%';
    let height5after = 100 - (85 + heightHover / 8) + '%';
    TweenLite.to('.parallax__before--5', 1, {height: height5before});
    TweenLite.to('.parallax__after--5', 1, {height: height5after});
  });

  //  Contacts Animation
  $('.form__email').on('focus', function () {
    TweenLite.to('.form__email-placeholder', 1, {
      top: '20px',
      color: '#CD0D2E',
      fontSize: '0.8rem'
    });
    TweenLite.to('.form__email-border', 1, {
      width: '80%',
      backgroundColor: '#CD0D2E',
      opacity: 1
    });
  })
  $('.form__email').on('focusout', function () {
    if (!($('.form__email').val())) {
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
  })

  $('.form__name').on('focus', function () {
    TweenLite.to('.form__name-placeholder', 1, {
      top: '20px',
      color: '#CD0D2E',
      fontSize: '0.8rem'
    });
    TweenLite.to('.form__name-border', 1, {
      width: '80%',
      backgroundColor: '#CD0D2E',
      opacity: 1
    });
  })
  $('.form__name').on('focusout', function () {
    if (!($('.form__name').val())) {
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
  })

  $('.form__message').on('focus', function () {
    TweenLite.to('.form__message-placeholder', 1, {
      top: '20px',
      color: '#CD0D2E',
      fontSize: '0.8rem'
    });
    TweenLite.to('.form__message-border', 1, {
      width: '80%',
      backgroundColor: '#CD0D2E',
      opacity: 1
    });
  })
  $('.form__message').on('focusout', function () {
    if (!($('.form__message').val())) {
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
  })




  if (screenOrientation === "landscape") {
    // Прокрутка
    var html = document.querySelector('html');
    var delta = 0;
    let percent = 0;

    if (html.addEventListener) {
      if ('onwheel' in document) {
        // IE9+, FF17+
        html.addEventListener("wheel", onWheel);
      } else if ('onmousewheel' in document) {
        // устаревший вариант события
        html.addEventListener("mousewheel", onWheel);
      } else {
        // Firefox < 17
        html.addEventListener("MozMousePixelScroll", onWheel);
      }
    } else { // IE8-
      html.attachEvent("onmousewheel", onWheel);
    }

    // Это решение предусматривает поддержку IE8-
    function onWheel(e) {
      e = e || window.event;

      // deltaY, detail содержат пиксели
      // wheelDelta не дает возможность узнать количество пикселей
      // onwheel || MozMousePixelScroll || onmousewheel

      delta += e.deltaY || e.detail || e.wheelDelta;
      if (delta < 0) {
        delta = 50;
      }
      progressBar()
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }

    function progressBar () {
      var number = navigation.indexOf(page);



      percent = (100*delta)/6000;
      TweenLite.to('.landscape .progress-bar', 1, {
        width: percent + '%'
      });
      if (delta >= 6000) {
        delta = 0;
        percent = 0;
        TweenLite.to('.landscape .progress-bar', 1, {
          width: percent + '%'
        });

        prevPage = navigation[number]; // this page // "home"
        if (number == navigation.length - 1) {
          number = -1;
        }
        let numberNewPage = number + 1;
        page = navigation[numberNewPage];
        setState()
      }
    }
  }
};
