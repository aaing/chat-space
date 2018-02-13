$(function(){
  //検索結果のリスト
  var search_list = $(".user-search-result")

  //インクリメンタルサーチされたuserのhtml生成
  function buildHTML(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    //末尾に追加
    search_list.append(html);
  }

  //一致するユーザーが居ない場合メッセージを出すhtmlを生成
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  ${ user }
                </div>`
    //末尾に追加
    search_list.append(html);
  }

  $("#user-search-field").on("keyup",function(){
    input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $(".user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          buildHTML(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })

  $(document).on("click", "a", function(){
    console.log("www");
  })
});
