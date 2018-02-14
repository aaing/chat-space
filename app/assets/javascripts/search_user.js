$(function(){
  //検索結果のリスト
  var searchList = $(".user-search-result")
  //チャットメンバーのインデックス
  var chatMemberIds =  $("input[name='group[user_ids][]']").map(function(index, element){
     return Number($(this).val());
  });

  //インクリメンタルサーチされたuserのhtml生成
  function buildHTML(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    //末尾に追加
    searchList.append(html);
  }

  //一致するユーザーが居ない場合メッセージを出すhtmlを生成
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  ${ user }
                </div>`
    //末尾に追加
    searchList.append(html);
  }

  //chat-memberリストにユーザを追加するhtmlを生成
  function addUserToChatMember(userName, userId){
    var html = `<div class="chat-group-user clearfix js-chat-member">
                  <input name="group[user_ids][]", type='hidden', value= "${userId}">
                  <p class="chat-group-user__name">
                    ${userName}
                  </p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">
                    削除
                  </a>`
    $("#chat-member").append(html);
  }

  //検索窓に入力される度発火
  $("#user-search-field").on("keyup",function(){
    input = $(this).val();
    //非同期通信 リクエストにkeyword: inputを含める
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    //通信後処理
    .done(function(users) {
      //前の検索結果の削除
      $(".user-search-result").empty();
      //検索結果が空でないならeachで各userに対して処理
      if (users.length !== 0) {
        users.forEach(function(user){
          //チャットメンバーの中に検索されたuserが居なければ、
          //インクリメンタルサーチされたuserのhtml生成
          if ($.inArray(user.id, chatMemberIds) == -1 ) buildHTML(user) ;
        });
      }
      else {
        //一致するユーザーが居ない場合メッセージを含むhtmlを生成
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })

  //ユーザの追加をクリックすると発火
  $(document).on("click", ".user-search-add", function(){
    //user_name, user_idを取得
    var userName = $(this).data("user-name");
    var userId = $(this).data("user-id");
    //選択したユーザを検索結果から削除
    $(this).parent().remove();
    //チャットメンバーリストに新しいユーザのhtmlを追加
    addUserToChatMember(userName, userId);
    //チャットメンバーインデックスに新しいユーザのをidを追加
    chatMemberIds.push(userId);
  })

  //ユーザの削除をクリックすると発火
  $(document).on("click", ".user-search-remove", function(){
    //選択したユーザのidをチャットメンバーインデックスから削除
    var userId = $(this).data("user-id");
    var idx = $.inArray(userId, chatMemberIds);
    chatMemberIds.splice(idx, 1);
    //選択したユーザのhtmlをチャットメンバーリストから削除
    $(this).parent().remove();
  })
});
