class User < ApplicationRecord
  include ActiveModel::Serializers::JSON
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :sent_messages, :through => :message_senders, :source => :message
  has_many :received_messages, :through => :message_recipients, :source=> :message
  has_many :message_senders, :foreign_key => 'sender_id'
  has_many :message_recipients, :foreign_key => 'recipient_id'
  searchkick word_start: [:username, :email]
  after_create :reindex_users

  private

  def reindex_users
    User.reindex
  end


end
