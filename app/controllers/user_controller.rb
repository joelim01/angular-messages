class UserController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  def autocomplete
    users = User.search(params[:query], {
      fields: ["username"],
      match: :word_start,
      limit: 10,
      load: false,
      misspellings: {below: 5},
      order: {:username => "asc"}
    }).collect { |obj| {id: obj.id, username: obj.username} }
    render json: users
  end


end
