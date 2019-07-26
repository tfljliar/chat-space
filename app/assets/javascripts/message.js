$(function(){
  function buildHTML(message){
    image = ( message.image )? `<img class= "lower-message__image" src=${message.image}>` :"";
          var html =`<div class="message" data-message-id="${message.id}">
                      <div class="upper-message">
                        <div class="upper-message__user">
                          ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                          ${message.date}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__body">
                          ${message.body}
                        </p>
                      </div>
                      ${image}
                    </div>`
    return html;
  }
  function ScrollToNewMessage(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      ScrollToNewMessage();
	  	$('.form__submit').prop('disabled', false);
      $('#new_message')[0].reset();
	  })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  });
});