class MessagesController < ApplicationController
  include ScheduleSending
  protect_from_forgery with: :exception
  before_action :authenticate_user!, except: [:public]
  serialization_scope :current_user

  def index
    # page, per_page, location
    if params[:location] == "inbox"
      messages = current_user.received_messages.where.not(sent_on: nil).order(sent_on: :desc).paginate(page: params[:page], per_page: (params[:per_page] || 15) )
      render json: messages, root: 'data', meta: pagination_dict(messages), adapter: 'json'
    elsif params[:location] == "outbox"
      messages = current_user.sent_messages.where(sent_on: nil).order(scheduled_send_date: :desc).paginate(page: params[:page], per_page: (params[:per_page] || 15) )
      render json: messages, root: 'data', meta: pagination_dict(messages), adapter: 'json'
    elsif params[:location] == "sent"
      messages = current_user.sent_messages.where.not(sent_on: nil).paginate(page: params[:page], per_page: (params[:per_page] || 15) )
      render json: messages, root: 'data', meta: pagination_dict(messages), adapter: 'json'
    end
  end

  def show
    message = Message.find(params[:id])
    render json: message
  end

  def public
    messages = Message.all.where(private: false).order(sent_on: :desc).distinct.limit(50)
    render json: messages
  end


  def create
    message = Message.create(message_params)
    message.sender = current_user
    message.recipients << current_user if params[:self]
    params[:message][:data][:recipients].each { |r| message.recipients << User.find(r[:id]) }
    message.scheduled_send_date = ScheduleSending.call(params[:message][:dt], params[:message][:dt2])
    if message.valid?
      render json: message
    else
      render json: {errors: message.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    message = Message.find(params[:message][:data][:id])
    message.update(message_params)
    if message.save
      render json: message
    else
      render json: {errors: message.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    Message.find(params[:id]).delete
  end

  private

  def message_params
   params.require(:message).require(:data).permit(
   :id,
   :send_as_group,
   :content,
   :private,
   :subject,
   recipients_attributes: [:username, :id, :email],
   message_recipients_attributes: [:id, :read])
  end

  def pagination_dict(object)
    {
      current_page: object.current_page,
      next_page: object.next_page,
      prev_page: object.previous_page, # use object.previous_page when using will_paginate
      total_pages: object.total_pages,
      total_entries: object.total_entries
    }
  end

end
