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
});
