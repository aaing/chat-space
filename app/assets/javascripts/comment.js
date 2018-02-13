$(function(){

  //新規メッセージのhtml作成
  function buildHTML(message){
    var html = `<div class="content-message">
                  <span class="content-message__text">
                    ${message.body}
                  </span>
                  <span class="content-message__time-stamp">
                    ${message.time_stamp}
                  </span>
                  ${ message.image == null ? "" : '<img src="' + message.image + '">' }
                  <span class="content-message__user-name">
                    ${message.name}
                  </span>
                </div>`
    return html;
  }

  //フラッシュメッセージのhtml生成
  function insertFlash(){
    var html =`<div class="flash-message-success">メッセージが送信されました</div>`
    return html;
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
      //フラッシュメッセージの表示
      var flash_html = insertFlash();
      $('.chat').before(flash_html);
      //メッセージの最下部までスクロール
      var scroll_height = $('.contents-main').get(0).scrollHeight;
      $('.contents-main').animate({scrollTop: scroll_height }, 500, 'swing');
      //フラッシュメッセージの削除
      $('.flash-message-success').fadeOut("slow");

    })

    .fail(function(){
      alert('エラーが発生しました');
    })

  })
});
