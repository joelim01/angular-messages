class UserController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  def autocomplete
    query = params[:query] || nil
    users = []
    users = User.where('username LIKE ?', "%#{query}%").limit(10) if query
    render json: users
  end

end
