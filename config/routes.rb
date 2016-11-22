Rails.application.routes.draw do
  root 'posts#index'
  resources :posts, only: [:index, :create]
  get '/all_posts' => "posts#all_posts"
end
