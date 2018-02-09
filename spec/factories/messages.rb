FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/noimage.png")
    user
    group
  end
end
