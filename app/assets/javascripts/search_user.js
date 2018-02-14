$(function(){
  //検索結果のリスト
  var search_list = $(".user-search-result")
  //チャットメンバーのインデックス
  var chat_member_ids =  $("input[name='group[user_ids][]']").map(function(index, element){
     return Number($(this).val());
  });

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

  //chat-memberリストにユーザを追加するhtmlを生成
  function addUser(user_name, user_id){
    var html = `<div class="chat-group-user clearfix js-chat-member">
                  <input name="group[user_ids][]", type='hidden', value= "${user_id}">
                  <p class="chat-group-user__name">
                    ${user_name}
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
          if ($.inArray(user.id, chat_member_ids) == -1 ) buildHTML(user) ;
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
    var user_name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    //選択したユーザを検索結果から削除
    $(this).parent().remove();
    //チャットメンバーリストに新しいユーザのhtmlを追加
    addUser(user_name, user_id);
    //チャットメンバーインデックスに新しいユーザのをidを追加
    chat_member_ids.push(user_id);
  })

  //ユーザの削除をクリックすると発火
  $(document).on("click", ".user-search-remove", function(){
    //選択したユーザのidをチャットメンバーインデックスから削除
    var user_id = $(this).data("user-id");
    var idx = $.inArray(user_id, chat_member_ids);
    chat_member_ids.splice(idx, 1);
    //選択したユーザのhtmlをチャットメンバーリストから削除
    $(this).parent().remove();
  })
});
