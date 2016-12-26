class MessageSender < ApplicationRecord
  belongs_to :sender, :class_name=> "User"
  belongs_to :message
end
