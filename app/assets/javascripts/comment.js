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

  // フォーカスが外れたときはsetIntervalを回避するためのフラグ
  var autoUpdate = true;
  window.onfocus = function(){
    autoUpdate = true;
  }
  window.onblur = function(){
    autoUpdate = false;
  }
  //5秒ごとに自動更新する関数
  function update(){
    if(autoUpdate){
      //最新のメッセージidを取得
      var lastMessageId = $(".content-message").last().data("message-id");
      //メッセージidをリクエストに含めて非同期通信
      $.ajax({
        url: window.location.href,
        type: "GET",
        dataType: 'json',
        data: { lastMessageId: lastMessageId },
      })
      //成功時
      .done(function(messages) {
        //各メッセージごとにhtmlを生成
        messages.forEach(function(message) {
          var html = buildHTML(message);
          $('.contents-main').append(html)
        });
      })
      //失敗時
      .fail(function(data) {
        alert('自動更新に失敗しました');
      });
    }
  }
  //関数を実行
  setInterval(update, 5000 );

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
