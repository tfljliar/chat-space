$(function(){
  function buildHTML(message){
    var image = ( message.image )? `<img class= "lower-message__image" src=${message.image}>` :"";
    var html =`<div class="message" data-id="${message.id}">
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
      type: 'post',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      ScrollToNewMessage();
      $('#new_message')[0].reset();
	  })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  });
// 今いるグループでのみ自動更新が機能するように
  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message').last().data('id');
      $.ajax({
        url: "api/messages",
        type: "GET",
        data: {id: last_message_id},
        dataType: "json"
      })
      .done(function(messages) {
        messages.forEach(function(message) {
          var insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
        });
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } 
    else {
      clearInterval(interval);
    }
  } , 5000 );
});