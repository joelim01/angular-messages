class AutocompleteUserSerializer < ActiveModel::Serializer
  attribute :username, key: :text

end
