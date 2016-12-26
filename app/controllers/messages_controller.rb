class MessagesController < ActionController::Base
  require 'pry'
  include ScheduleSending
  protect_from_forgery with: :exception
  before_filter :authenticate_user!, only: [:create]
  serialization_scope :current_user

  def index
    if !params[:user_id]
      messages = Message.all
      render json: messages
    else
      messages = Message.joins(:message_recipients).joins(:message_sender).where("sender_id = :sender or recipient_id= :recipient", {sender: params[:user_id], recipient: params[:user_id]}).distinct
      render json: messages
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
    if params[:message][:message_recipients]
      mr = params[:message][:message_recipients][0]
      MessageRecipient.find(mr[:id]).update(read: mr[:read])
    end
    if message.update(message_params)
      if params[:message][:to]
        message.recipients = []
        formattedRecipients = params[:message][:to].map(&:values).flatten
      end
      if formattedRecipients.respond_to?(:each)
        formattedRecipients.each { |r| message.recipients << User.where(["username = ?", r]) }
      else
        message.recipients << User.where(["username = ?", formattedRecipients])
      end
      if (params[:date_change])
        message.scheduled_send_date = ScheduleSending.call(params[:message][:dt], params[:message][:dt2])
      end
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
   params.require(:message).permit(
   :id,
   :send_as_group,
   :content,
   :private,
   :subject)
  end

end
