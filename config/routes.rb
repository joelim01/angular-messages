Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'application#angular'

  scope 'api' do
    get 'user/autocomplete', to: 'user#autocomplete'
    delete 'message_recipients/:id', to: 'message_recipients#destroy'
    resources :messages, only: [:index, :show]
    resources :user, only: [] do
      resources :messages, only: [:index, :create, :update, :destroy]
    end
  end
end
