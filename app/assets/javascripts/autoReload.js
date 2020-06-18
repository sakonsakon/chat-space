$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message__box" data-message-id=${message.id}>
          <div class="message__info">
            <div class="message__info__name">
              ${message.user_name}
            </div>
            <div class="message__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message__box" data-message-id=${message.id}>
        <div class="message__info">
          <div class="message__info__name">
            ${message.user_name}
          </div>
          <div class="message__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.message__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message__field').append(insertHTML);
        $('.message__field').animate({ scrollTop: $('.message__field')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});