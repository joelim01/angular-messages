Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'application#angular'

  scope 'api' do
    get 'user/autocomplete', to: 'user#autocomplete'
    get 'messages/public', to: 'messages#public'
    delete 'message_recipients/:id', to: 'message_recipients#destroy'
    resources :messages, only: [:index, :show, :create, :update, :destroy]
  end

  get '*path', to: 'application#angular'

end
