class User < ApplicationRecord
  include ActiveModel::Serializers::JSON
  has_many :messages, through: :message_senders, :foreign_key => 'sender_id'
  has_many :messages, through: :message_recipients, :foreign_key => 'recipient_id'
end
