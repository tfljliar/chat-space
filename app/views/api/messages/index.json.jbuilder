json.array! @messages do |message|
  json.body message.body
  json.image message.image.url
  json.date message.created_at.strftime("%Y年%m月%d日 %H:%M" )
  json.user_name message.user.name
  json.id message.id
end