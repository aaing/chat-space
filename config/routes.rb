Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :edit, :show]
  root to: "messages#index"
end
