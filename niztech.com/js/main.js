$(document).ready(function(){

  $('form input').on('click', function (){
    if($(this).attr('name') === 'name' && $(this).val() === 'Peter Parker'){
      $(this).val('');
    }else if ($(this).attr('name') === 'email' && $(this).val() === 'webslinger@gmail.com') {
      $(this).val('');
    }
  });

  $('form input').on('blur', function (){
    if($(this).attr('name') === 'name' && $(this).val().trim() === ''){
      $(this).val('Peter Parker');
    }else if ($(this).attr('name') === 'email' && $(this).val().trim() === '') {
      $(this).val('webslinger@gmail.com');
    }
  });


  $('#work .subselect li').on('click', function(){
    var id_to_display = '#' + $(this).attr('class') + '_examples';
    console.log(id_to_display);
    $('#work .showcase .examples').addClass('hidden');
    $(id_to_display).removeClass('hidden');
  });

  $('#sendmessage button.send').on('click', function(e){
    var messageData = $('#sendmessage').serialize();

    $.ajax("content/send.php", { //// context: document.body
        async: false,
        dataType: "json",
        data: messageData,
        method: "POST"
      }
    ).done(function(data) {
      // $( this ).addClass( "done" );
      console.log(data);
    });

    e.preventDefault();
  });

});
