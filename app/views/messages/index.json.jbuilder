json.array! @messages do |message|
  json.name     message.user.name
  json.time_stamp     message.created_at.to_s(:time_stamp)
  json.body     message.body
  json.image    message.image.url
  json.id       message.id
end
