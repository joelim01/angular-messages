class SenderSerializer < ActiveModel::Serializer
  attributes(:id, :username, :email)
end
