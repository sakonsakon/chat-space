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

  $('.new__message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message__field').append(html);
      $('form')[0].reset();
      $('.message__field').animate({ scrollTop: $('.message__field')[0].scrollHeight});
      $('.submit__btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit__btn').prop("disabled", false);
    });
  });
});