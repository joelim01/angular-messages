class SenderSerializer < ActiveModel::Serializer
  attributes(:username, :email)
end
