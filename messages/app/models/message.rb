class Message < ApplicationRecord
  include ActiveModel::Serializers::JSON
  has_one :message_sender
  has_one :sender, :class_name => "User", through: :message_sender
  has_many :message_recipients
  has_many :recipients, :class_name => "User", through: :message_recipients
end
