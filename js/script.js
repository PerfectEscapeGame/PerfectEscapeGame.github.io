$(function () {
  const $hamburger = $('#js-hamburger');
  const $gnav = $('#global-nav');
  const $htmlBody = $('html, body');

  // ヘッダーの実高さをCSS変数とJSの両方で使う
  const setHeaderOffsetVar = () => {
    const h = Math.ceil($('.header').outerHeight() || 0);
    document.documentElement.style.setProperty('--header-offset', h + 'px');
    return h;
  };
  const getHeaderOffset = () => {
    // CSS変数を読めない環境もあるので再計測
    return Math.ceil($('.header').outerHeight() || 0);
  };

  // 初期設定＆リサイズ時に更新
  setHeaderOffsetVar();
  $(window).on('resize orientationchange', setHeaderOffsetVar);

  function openNav() {
    $gnav.addClass('open');
    $hamburger.attr('aria-expanded', 'true');
  }
  function closeNav() {
    $gnav.removeClass('open');
    $hamburger.attr('aria-expanded', 'false');
  }

  // ハンバーガー開閉
  $hamburger.on('click', function (e) {
    e.preventDefault();
    $gnav.hasClass('open') ? closeNav() : openNav();
  });

  // メニュー内リンク押下で閉じる
  $('#global-nav a').on('click', closeNav);

  // ESCキーで閉じる
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // アンカークリック時：ヘッダー実高さ分だけオフセットしてスクロール
  $('a[href^="#"]').on('click', function (e) {
    const id = $(this).attr('href');
    if (!id || id === '#' || !$(id).length) return;

    e.preventDefault();
    const offset = getHeaderOffset();
    const top = $(id).offset().top - offset;   // ← 実測値でピタッと合わせる
    $htmlBody.stop(true, false).animate({ scrollTop: top }, 300, 'swing');
  });

  // ハッシュ付きで読み込まれたときも補正（画像レイアウト確定後に実行）
  $(window).on('load', function () {
    if (location.hash && $(location.hash).length) {
      requestAnimationFrame(() => {
        const offset = getHeaderOffset();
        const top = $(location.hash).offset().top - offset;
        $(window).scrollTop(top);
      });
    }
  });

  // ページ下部の「↑」：上へ戻る
  $('#js-page-top').on('click', function (e) {
    e.preventDefault();
    $htmlBody.stop(true, false).animate({ scrollTop: 0 }, 250, 'swing');
  });
});
