class Message < ApplicationRecord
  before_filter :authenticate_user!, only: [:create]
  include ActiveModel::Serializers::JSON
  has_many :senders, :class_name => "User", through: :message_senders
  has_many :recipients, :class_name => "User", through: :message_recipients
end
