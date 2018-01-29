# DB設計

## テーブルリスト
- usersテーブル
- messagesテーブル
- groupsテーブル
- membersテーブル


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|

### Association
- has_many :groups, through: :members
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :members
- has_many :messages

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|index: true, foreign_key: true|
|group_id|integer|index: true, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
