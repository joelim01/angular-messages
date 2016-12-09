class MessagesController < ActionController::Base
  before_filter :authenticate_user!, only: [:create]


  def index
    @messages = Message.all
    respond_to do |format|
      format.html
      format.json { render json: @messages }
    end
  end

end
