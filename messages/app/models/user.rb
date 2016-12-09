class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include ActiveModel::Serializers::JSON
  has_many :sent_messages, :through => :message_senders, :source => :message
  has_many :received_messages, :through => :message_recipients, :source=> :message
  has_many :message_senders, :foreign_key => 'sender_id'
  has_many :message_recipients, :foreign_key => 'recipient_id'
end
