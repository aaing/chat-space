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
      var html = buildHTML(data);
      $('.contents-main').append(html)
      $('.message-form__text').val('')
      $('#message_image').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
});
