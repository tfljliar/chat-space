# DB設計

## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|mail|string|null: false|

###Association
- has_many :groups, through: :members
- has many :members
- has_many :messages

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :members
- has many :members
- has_many :messages

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Associationテーブル
- belongs_to :group
- belongs_to :user