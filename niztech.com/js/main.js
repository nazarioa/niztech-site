$(document).ready(function(){

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


  $('#work .subselect li').on('click', function(){
    var id_to_display = '#' + $(this).attr('class') + '_examples';
    console.log(id_to_display);
    $('#work .showcase .examples').addClass('hidden');
    $(id_to_display).removeClass('hidden');
  });

  $('#sendmessage button.send').on('click', function(e){

    if( $('#sendername').val() !== '' && $('#sendername').val() !== $('#sendername').attr('value') && $('#senderemail').val() !== $('#senderemail').attr('value') ){

      var oldvalue = $('#sendmessage button.send').html();
      $('#contact .result').html('Sending...');
      $('#contact .overlay').removeClass('hidden');

      var messageData = $('#sendmessage').serialize();
      $('#sendmessage button.send').html('Sending');
      $('#sendmessage input, #sendmessage textarea').attr('disabled','disabled');


      var request = $.ajax("content/send.php", { //// context: document.body
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
      $('#sendmessage input').addClass('error');
    }

    e.preventDefault();
  });

  $('#contact .close, #contact .overlay').on('click', function(){
    $('#contact .result').html('');
    $('#contact .overlay').addClass('hidden');
    $('#sendmessage input, #sendmessage textarea').attr('disabled', false);
  });

});
