class MessagesController < ActionController::Base
  include ScheduleSending
  protect_from_forgery with: :exception
  before_filter :authenticate_user!, only: [:create]


  def index
    if !params[:user_id]
      messages = Message.all
      render json: messages
    else
      messages = Message.joins(:message_recipients).where(message_recipients: {recipient_id:params[:user_id]}).where(sent_on: 1.year.ago..Time.current)
      render json: messages, include: 'sender'
    end
  end

  def show
    message = Message.find(params[:id])
    render json: message
  end

  def create
    message = Message.new(message_params)
    message.sender = current_user
    message.recipients << current_user if params[:self]
    formattedRecipients = params[:message][:to].map(&:values).flatten
    if formattedRecipients.respond_to?(:each)
      formattedRecipients.each { |r| message.recipients << User.where(["username = ?", r]) }
    else
      message.recipients << User.where(["username = ?", formattedRecipients])
    end
    message.scheduled_send_date = ScheduleSending.call(params[:message][:dt], params[:message][:dt2])
    if message.save
      render json: message
    else
      render json: {errors: message.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    message = Message.find(params[:id])
    if message.update(message_params)
      message.recipients = []
      message.recipients << current_user if params[:self]
      formattedRecipients = params[:message][:to].map(&:values).flatten
      if formattedRecipients.respond_to?(:each)
        formattedRecipients.each { |r| message.recipients << User.where(["username = ?", r]) }
      else
        message.recipients << User.where(["username = ?", formattedRecipients])
      end
      message.scheduled_send_date = ScheduleSending.call(params[:message][:dt], params[:message][:dt2])
      if message.save
        render json: message
      else
        render json: {errors: message.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {errors: message.errors.full_messages}, status: :unprocessable_entity
    end
  end


  private
  def message_params
   params.require(:message).permit(:send_as_group, :content, :private, :subject)
  end

end
