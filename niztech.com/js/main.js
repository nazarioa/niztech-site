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

  $('#sendmessage button.send').on('click', function(e){

    if( $('#sendername').val() !== '' && $('#sendername').val() !== $('#sendername').attr('value') && $('#senderemail').val() !== $('#senderemail').attr('value') ){

      var oldvalue = $('#sendmessage button.send').html();
      $('#contact .result').html('Sending...');
      $('#contact .overlay').removeClass('hidden');

      var messageData = $('#sendmessage').serialize();
      $('#sendmessage button.send').html('Sending');
      $('#sendmessage input, #sendmessage textarea').attr('disabled','disabled');


      var request = $.ajax("content/send.php", {
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



  $('#work .subselect li').on('click', function(){
    var exampleSectionToDisplay = '#' + $(this).attr('id') + '_examples';
    console.log(exampleSectionToDisplay);

    if( $(this).hasClass('clicked') === true ){
      console.log('AA');
      //hide this and everything else
      $(this).removeClass('clicked');
      $('#workNavWrap .subselect').removeClass('clicked');
      $('#work .examples').removeClass('hidden');
    }else{
      console.log('bb');
      $(this).addClass('clicked');
      $('#workNavWrap .subselect').addClass('clicked');
      $('#work .examples').addClass('hidden');
      $(exampleSectionToDisplay).removeClass('hidden');
    }

    // $('#work .showcase .examples').addClass('hidden');
    // $(id_to_display).removeClass('hidden');
  });

  $(document).scroll(function () {
    //stick nav to top of page
    var current_y = $(this).scrollTop();
    var showcase_top_y = $('#work .showcase').offset().top;
    var showcase_bottom_y = showcase_top_y +  $('#work .showcase').height();
    console.log('height: ');
  console.log($('#work .showcase').height());

    console.log('top_y: ' + showcase_top_y + ' showcase_bottom_y: ' + showcase_bottom_y);

    if( $('#workNavWrap .subselect').hasClass('clicked') === true ){
      if (current_y < showcase_top_y && current_y < showcase_bottom_y ) {
        $('#workNavWrap nav').removeClass('sticky');
        $('#workNavWrap .desc').removeClass('hidden');

          console.log('a');

      }else if (current_y < showcase_bottom_y ) {
          $('#workNavWrap nav').addClass('sticky');
          $('#workNavWrap .desc').addClass('hidden');

          console.log('b');
      }else{
        $('#workNavWrap nav').removeClass('sticky');
        $('#workNavWrap .desc').removeClass('hidden');

        console.log('c');
      }
    }
  });


});
