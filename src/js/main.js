const jquery = require('jquery');
const smoothScroll = require('jquery-smooth-scroll');

jquery(document).ready(() => {
  /* Work examples */
  jquery('#work .sub-select li').on('click', function () {
    const id_to_display = '#' + jquery(this).attr('class') + '_examples';

    if (jquery(this).hasClass('active') === true) {
      jquery('#work .sub-select li').removeClass('active');
      jquery('#work .showcase .examples').addClass('hidden');
    } else {
      jquery('#work .sub-select li').removeClass('active');
      jquery(this).addClass('active');
      jquery('#work .showcase .examples').addClass('hidden');
      jquery(id_to_display).removeClass('hidden');
      jquery.smoothScroll({scrollTarget: id_to_display});

      console.log(id_to_display);
      ga('work', id_to_display, null, 1);
    }

  });
});

if (document.documentURI.search('dev=true') === -1) {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-11261933-1', 'auto');
  ga('send', 'pageview');
  console.log('Tracking');
} else {
  console.log('Not Tracking');
}
