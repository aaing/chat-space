$(function(){

  function buildHTML(message){
    var html = `<div class="content-message">
                  <span class="content-message__user-name">
                    ${message.body}
                  </span>
                  ${ message.image == null ? "" : '<img src="' + message.image + '">' }
                  <span class="content-message__time-stamp">
                    ${message.time_stamp}
                  </span>
                  <span class="content-message__text">
                    ${message.name}
                  </span>
                </div>`
    return html;
  }

  function insertFlash(){
    var html =`<div class="flash-message-success">メッセージが送信されました</div>`
    return html;
  }

  function lastMessagePosition(){
    var messages = $('.content-message');
    var last_message_position = messages.length * 114 ;
    return last_message_position;
  }

  $(".new_message").on("submit", function(e){
    e.preventDefault();
    event.stopPropagation();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      //新規メッセージのhtml作成
      var html = buildHTML(data);
      $('.contents-main').append(html)
      //フォームの内容初期化
      $('.message-form__text').val('')
      $('#message_image').val('')
      //メッセージの最下部までスクロール
      $('.contents-main').animate({scrollTop: lastMessagePosition() }, 500, 'swing');
      //フラッシュメッセージの表示
      var flash_html = insertFlash();
      $('.chat').before(flash_html);
      //フラッシュメッセージの削除
      setTimeout(function(){
        $('.flash-message-success').remove();
      },2500);

    })

    .fail(function(){
      alert('エラーが発生しました');
    })

  })
});
