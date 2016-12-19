class MessageSerializer < ActiveModel::Serializer
  attributes(:subject, :content)
  has_one :sender, serializer: SenderSerializer

end
