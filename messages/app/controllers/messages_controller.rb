class MessagesController < ActionController::Base
  before_filter :authenticate_user!, only: [:create]


  def index
    if !params[:user_id]
      @messages = Message.all
      respond_to do |format|
        format.html
        format.json { render json: @messages }
      end
    else
      @messages = Message.joins(:message_recipients).where(message_recipients:{recipient_id:params[:user_id]})
      respond_to do |format|
        format.html
        format.json { render json: @messages}
      end
    end
  end

  def show
    @message = Message.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @message }
    end
  end

  def create
    puts params[:message_params]
    @message = Message.create(message_params)
    # respond_to do |format|
    #   format.html
    #   format.json { render json: @params }
    # end
  end


  private
  def message_params
     params.require(:message).permit(:send_as_group, :content, :private, :subject)
   end

end
