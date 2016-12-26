class MessageSerializer < ActiveModel::Serializer
  attributes(:id, :subject, :content, :sent_on)
  has_one :sender, serializer: SenderSerializer
  has_many :recipients, serializer: RecipientSerializer
  has_many :message_recipients, serializer: MessageRecipientSerializer do
    object.message_recipients.where(recipient_id: scope.id)
  end


end
