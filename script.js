$(function () {
  const $hamburger = $('#js-hamburger');
  const $gnav = $('#global-nav');
  const $body = $('body');

  function openNav() {
    $gnav.addClass('open');
    $hamburger.attr('aria-expanded', 'true');
    $body.css('overflow', 'hidden'); // スクロール固定
  }

  function closeNav() {
    $gnav.removeClass('open');
    $hamburger.attr('aria-expanded', 'false');
    $body.css('overflow', ''); // 解除
  }

  $hamburger.on('click', function () {
    if ($gnav.hasClass('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  // ESCキーで閉じる
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $gnav.hasClass('open')) {
      closeNav();
    }
  });

  // メニューリンク押下で閉じる
  $('#global-nav a').on('click', closeNav);
});
