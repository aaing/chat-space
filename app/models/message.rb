class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  mount_uploader :image, ImageUploader

  validate :validates_presence_of_message

  def validates_presence_of_message
    if body.blank? && image.blank?
      errors.add(:body, "を入力してください")
    end
  end
 end
