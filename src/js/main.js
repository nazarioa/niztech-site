$(document).ready(function () {
  /* Work examples */
  $('#work .sub-select li').on('click', function () {
    var id_to_display = '#' + $(this).attr('class') + '_examples';

    if ($(this).hasClass('active') === true) {
      $('#work .sub-select li').removeClass('active');
      $('#work .showcase .examples').addClass('hidden');
    } else {
      $('#work .sub-select li').removeClass('active');
      $(this).addClass('active');
      $('#work .showcase .examples').addClass('hidden');
      $(id_to_display).removeClass('hidden');
      $.smoothScroll({scrollTarget: id_to_display});

      console.log(id_to_display);
      ga('work', id_to_display, null, 1);

    }

  });

  /* Contact Form */
  // on click / touch in clear out the default values.
  $('#message_form input').on('click', function () {
    if ($(this).attr('name') === 'sendername' && $(this).val() === 'Peter Parker') {
      $(this).val('');
      $(this).removeClass('error');
    } else if ($(this).attr('name') === 'senderemail' && $(this).val() === 'spidy@gmail.com') {
      $(this).val('');
      $(this).removeClass('error');
    }
  });

  // on click / touch in if the text is empty, add back in the defualt values
  $('#message_form input').on('blur', function () {
    if ($(this).attr('name') === 'sendername' && $(this).val().trim() === '') {
      $(this).val('Peter Parker');
      $(this).addClass('error');
    } else if ($(this).attr('name') === 'senderemail' && $(this).val().trim() === '') {
      $(this).val('spidy@gmail.com');
      $(this).addClass('error');
    }
  });

  $('#sendmessage button.send').on('click', function (e) {

    if ($('#sendername').val() !== '' && $('#sendername').val() !== $('#sendername').attr('value') && $('#senderemail').val() !== $('#senderemail').attr('value')) {

      // when the ajax call finishes we want to put our button's text back the way it was.
      var oldvalue = $('#message_form button.send').html();
      $('#message_form button.send').html('Sending');
      $('#message_form input, #message_form textarea').attr('disabled', 'disabled');

      // prep our overlay message and display it
      $('#contact .result').html('Sending...');
      $('#contact .overlay').removeClass('hidden');

      // Let the ajax begin.
      var request = $.post(
        'content/send.php',
        {
          sendername: $('#sendername').val(),
          senderemail: $('#senderemail').val(),
          sendermessage: $('#sendermessage').val()
        },
        'JSON');

      request.always(function (data) {
        $('#contact .overlay').removeClass('hidden');
        $('#message_form button.send').html(oldvalue);
      });

      request.done(function (data) {
        if (data.result == 'success') {
          $('#contact .result').html('Your message was sent!');

          // after message is sent reset to defualt values.
          $('#sendername').val($('#sendername').attr('value'));
          $('#senderemail').val($('#senderemail').attr('value'));
          $('#sendermessage').val($('#sendermessage').attr(oldvalue));
        } else {
          $('#contact .result').html('Sadly, your message was almost sent.<br />Try again later.');
          console.log(data);
        }
      });

      request.fail(function (data) {
        console.log('.fail');
        $('#contact .result').html('Sadly, your message could not be sent.');
      });

    } else {
      $('#message_form input').addClass('error');
    }

    // lets prevent the page from relaoding
    e.preventDefault();
  });

  /* contact Form Completion Box */
  $('#contact .close, #contact .overlay').on('click', function () {
    $('#contact .result').html('');
    $('#contact .overlay').addClass('hidden');
    $('#message_form input, #message_form textarea').attr('disabled', false);
  });

  /*
   * Percent Scrolled
   */
  ga('send', 'pageview');

  /**
   * Manual callback handler
   * false == no scroll to track from previous page
   */
  var callbackData = bamPercentPageViewed.callback();
  if (callbackData != false) {
    console.group('Callback');
    console.log(callbackData);
    console.groupEnd();
    ga('send', 'event', 'Percent of Page Viewed', callbackData.documentLocation, callbackData.scrollPercent + '', undefined, true); //or send as a custom dimension before the pageview
  }

});

// console.log(document.documentURI.search('dev=true'));
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

/**
 * Use the bamPercentPageViewed plugin
 */
(function () {
  var o = onload, n = function () {
    bamPercentPageViewed.init({
      trackDelay: '2000',
      percentInterval: '10'
    });
  };
  if (typeof o != 'function') {onload = n;} else {
    onload = function () {
      n();
      o();
    };
  }
})(window);

/**
 * Manual callback handler
 * false == no scroll to track from previous page
 */
var callbackData = bamPercentPageViewed.callback();
if (callbackData != false) {
  console.group('Callback');
  console.log(callbackData);
  console.groupEnd();
  ga('send', 'event', 'Percent of Page Viewed', callbackData.documentLocation, callbackData.scrollPercent + '', undefined, true); //or send as a custom dimension before the pageview
}