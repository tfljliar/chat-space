json.id @message.id
json.user_name @message.user.name
json.date @message.created_at.strftime("%Y年%m月%d日 %H:%M" )
json.body @message.body
json.image @message.image.url