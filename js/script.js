$(function () {
  const $hamburger = $('#js-hamburger');
  const $gnav = $('#global-nav');

  const getHeaderOffset = () => (window.innerWidth <= 767 ? 57 : 73);

  function openNav() {
    $gnav.addClass('open');
    $hamburger.attr('aria-expanded', 'true');
  }
  function closeNav() {
    $gnav.removeClass('open');
    $hamburger.attr('aria-expanded', 'false');
  }

  // ハンバーガー開閉
  $hamburger.on('click', function () {
    $gnav.hasClass('open') ? closeNav() : openNav();
  });

  // アンカーリンクはヘッダー分だけオフセットしてスクロール
  $('a[href^="#"]').on('click', function (e) {
    const id = $(this).attr('href');
    if (id === '#' || id === '' || !$(id).length) return;

    e.preventDefault();
    const top = $(id).offset().top - getHeaderOffset();
    $('html, body').animate({ scrollTop: top }, 400, 'swing');

    // メニュー内のクリックなら閉じる
    if ($gnav.hasClass('open')) closeNav();
  });

  // ハッシュ付きでページ読み込み時も補正
  $(window).on('load', function () {
    if (location.hash && $(location.hash).length) {
      const top = $(location.hash).offset().top - getHeaderOffset();
      $(window).scrollTop(top);
    }
  });

  // ESCでメニューを閉じる
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
});
