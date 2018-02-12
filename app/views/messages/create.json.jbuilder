  json.body  @message.body
  json.name  @message.user.name
  json.image @message.image.url
  json.time_stamp @message.created_at.strftime('%Y年%m月%d日 %H:%M:%S')
