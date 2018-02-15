  json.body  @message.body
  json.name  @message.user.name
  json.image @message.image.url
  json.time_stamp @message.created_at.to_s(:time_stamp)
  json.id    @message.id
