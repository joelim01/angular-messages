class AddReadToMessageRecipient < ActiveRecord::Migration[5.0]
  def change
    add_column :message_recipients, :read, :boolean
  end
end
