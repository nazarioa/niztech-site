$(document).ready(function(){
  /* Work examples */
  $('#work .subselect li').on('click', function(){
    var id_to_display = '#' + $(this).attr('class') + '_examples';

    if( $(this).hasClass('active') === true ){
      $('#work .subselect li').removeClass('active');
      $('#work .showcase .examples').addClass('hidden');
    }else{
      $('#work .subselect li').removeClass('active');
      $(this).addClass('active');
      $('#work .showcase .examples').addClass('hidden');
      $(id_to_display).removeClass('hidden');
      $.smoothScroll({scrollTarget: id_to_display});
    }

  });

  /* Contact Form */
  // on click / touch in clear out the default values.
  $('#message_form input').on('click', function (){
    if($(this).attr('name') === 'sendername' && $(this).val() === 'Peter Parker'){
      $(this).val('');
      $(this).removeClass('error');
    }else if ($(this).attr('name') === 'senderemail' && $(this).val() === 'webslinger@gmail.com') {
      $(this).val('');
      $(this).removeClass('error');
    }
  });

  // on click / touch in if the text is empty, add back in the defualt values
  $('#message_form input').on('blur', function (){
    if($(this).attr('name') === 'sendername' && $(this).val().trim() === ''){
      $(this).val('Peter Parker');
      $(this).addClass('error');
    }else if ($(this).attr('name') === 'senderemail' && $(this).val().trim() === '') {
      $(this).val('webslinger@gmail.com');
      $(this).addClass('error');
    }
  });

  // the send button.
  $('#message_form button.send').on('click', function(e){

    if( $('#sendername').val() !== '' && $('#sendername').val() !== $('#sendername').attr('value') && $('#senderemail').val() !== $('#senderemail').attr('value') ){

      // when the ajax call finishes we want to put our button's text back the way it was.
      var oldvalue = $('#message_form button.send').html();
      $('#message_form button.send').html('Sending');
      $('#message_form input, #message_form textarea').attr('disabled','disabled');

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
        "JSON");

      request.always(function( data ) {
        $('#contact .overlay').removeClass('hidden');
        $('#message_form button.send').html(oldvalue);
      });

      request.done(function( data ){
        if(data.result == 'success'){
          $('#contact .result').html('Your message was sent!');
        }else{
          $('#contact .result').html('Sadly, your message was almost sent.<br />Try again later.');
          console.log(data);
        }
      });

      request.fail(function( data ) {
        console.log('.fail');
        $('#contact .result').html('Sadly, your message could not be sent.');
      });

    }else{
      $('#message_form input').addClass('error');
    }

    // lets prevent the page from relaoding
    e.preventDefault();
  });

  /* contact Form Completion Box */
  $('#contact .close, #contact .overlay').on('click', function(){
    $('#contact .result').html('');
    $('#contact .overlay').addClass('hidden');
    $('#message_form input, #message_form textarea').attr('disabled', false);
  });
});
