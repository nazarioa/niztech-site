$(document).ready(function(){
  /* Work examples */
  $('#work .subselect li').on('click', function(){
    var id_to_display = '#' + $(this).attr('class') + '_examples';
    console.log(id_to_display);

    if( $(this).hasClass('active') === true ){
      $('#work .subselect li').removeClass('active');
      $('#work .showcase .examples').addClass('hidden');
      console.log('a');
    }else{
      $('#work .subselect li').removeClass('active');
      $(this).addClass('active');
      $('#work .showcase .examples').addClass('hidden');
      $(id_to_display).removeClass('hidden');
      console.log('b');
      $.smoothScroll({scrollTarget: id_to_display});
    }
  });

  /* Contact Form */
  $('#sendmessage input').on('click', function (){
    if($(this).attr('name') === 'sendername' && $(this).val() === 'Peter Parker'){
      $(this).val('');
      $(this).removeClass('error');
    }else if ($(this).attr('name') === 'senderemail' && $(this).val() === 'webslinger@gmail.com') {
      $(this).val('');
      $(this).removeClass('error');
    }
  });

  $('#sendmessage input').on('blur', function (){
    if($(this).attr('name') === 'sendername' && $(this).val().trim() === ''){
      $(this).val('Peter Parker');
      $(this).addClass('error');
    }else if ($(this).attr('name') === 'senderemail' && $(this).val().trim() === '') {
      $(this).val('webslinger@gmail.com');
      $(this).addClass('error');
    }
  });

  $('#sendmessage button.send').on('click', function(e){

    if( $('#sendername').val() !== '' && $('#sendername').val() !== $('#sendername').attr('value') && $('#senderemail').val() !== $('#senderemail').attr('value') ){

      // when the ajax call finishes we want to put our button's text back the way it was.
      var oldvalue = $('#sendmessage button.send').html();
      $('#sendmessage button.send').html('Sending');
      $('#sendmessage input, #sendmessage textarea').attr('disabled','disabled');

      // prep our overlay message and display it
      $('#contact .result').html('Sending...');
      $('#contact .overlay').removeClass('hidden');

      // Lets prep data for our php code.
      var messageData = $('#sendmessage').serialize();

      // Let the ajax begin.
      var request = $.ajax("content/sensitive_send.php", {
        async: true,
        dataType: "json",
        data: messageData,
        method: "POST"
      }).always(function( data ) {
        $('#contact .overlay').removeClass('hidden');
        $('#sendmessage button.send').html(oldvalue);

      }).fail(function( data ) {
        $('#contact .result').html('Sadly, your message could not be sent.');

      }).success(function( data ){
        $('#contact .result').html('Your message was sent!');
      });
    }else{
      // oh no! it failed
      $('#sendmessage input').addClass('error');
    }

    // lets prevent the page from relaoding
    e.preventDefault();
  });

  /* contact Form Completion Box */
  $('#contact .close, #contact .overlay').on('click', function(){
    $('#contact .result').html('');
    $('#contact .overlay').addClass('hidden');
    $('#sendmessage input, #sendmessage textarea').attr('disabled', false);
  });

});
