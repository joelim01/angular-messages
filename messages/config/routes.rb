Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'application#angular'

  scope 'api' do
    resources :messages, only: [:index]
    resources :user, only: [] do
      resources :messages, only: [:index, :create, :update, :destroy]
    end
  end
end
