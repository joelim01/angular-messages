class MessageSerializer < ActiveModel::Serializer
  attributes(:id, :subject, :content, :sent_on)
  has_one :sender, serializer: SenderSerializer
  has_many :recipients, serializer: RecipientSerializer
end
